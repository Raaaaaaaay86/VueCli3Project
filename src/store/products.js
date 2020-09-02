import axios from 'axios';

export default {
  state: {
    product: {},
    products: [],
    pagination: {},
    randomProducts: [],
    randomCarousel: [],
  },
  actions: {
    getSingle(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${payload}`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        context.commit('GET_SINGLE', response.data.product);
        context.commit('LOADING', false);
      });
    },
    getProducts(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products?page=${payload.page}`;
      const allApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`;
      // payload: { page, cat: this.$route.params.cat };
      if (payload.cat === 'all') {
        axios.get(api).then((response) => {
          console.log(response);
          context.commit('GET_PRODUCTS', {
            products: response.data.products,
            pagination: response.data.pagination,
          });
        });
      } else {
        axios.get(allApi).then((response) => {
          const filtered = response.data.products.filter((el) => el.category === payload.cat);
          context.commit('GET_PRODUCTS', {
            products: filtered,
            pagination: null,
          });
        });
      }
    },
    getRandom(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`;
      axios.get(api).then((response) => {
        const fetched = response.data.products;
        context.commit('RANDOM_CAROUSEL', fetched);
        context.commit('RANDOM_PRODUCTS', fetched);
      });
    },
  },
  mutations: {
    GET_SINGLE(state, payload) {
      state.product = payload;
    },
    GET_PRODUCTS(state, payload) {
      state.products = payload.products;

      if (payload.pagination === null) {
        state.pagination = {
          total_pages: 1,
          current_page: 1,
          has_pre: false,
          has_next: false,
          category: null,
        };
      } else {
        state.pagination = payload.pagination;
      }
    },
    RANDOM_PRODUCTS(state, payload) {
      const fetched = payload;
      fetched.sort(() => Math.random() - 0.5);
      const random = fetched.slice(0, 4);

      state.randomProducts = random;
    },
    RANDOM_CAROUSEL(state, payload) {
      const fetched = payload;
      fetched.sort(() => Math.random() - 0.5);

      state.randomCarousel = fetched;
    },
  },
};
