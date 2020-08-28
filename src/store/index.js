import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
/* eslint-disable */
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    isUpdating: false,
    product: {},
    products: [],
    randomProducts: [],
    randomCarousel: [],
    carts: [],
    pagination: {},
    isEmpty: true,
    isClicked: false,
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    getSingle(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${payload}`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        context.commit('GET_SINGLE', response.data.product);
        context.commit('LOADING', false);
      });
    },
    getCarts(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
      context.commit('UPDATING', true);

      axios.get(api).then((response) => {
        context.commit('GET_CARTS', response.data.data.carts);
        context.commit('UPDATING', false);
      });
    },
    removeCart(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${payload}`;

      axios.delete(api).then(() => {
        context.dispatch('getCarts');
      });
    },
    addToCart(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
      const data = { product_id: payload.id, qty: payload.qty };
      context.commit('CLICKED', true);

      if ( this.state.carts.some((el) => el.product_id === payload.id )){
        const index = this.state.carts.findIndex((el) => el.product_id === payload.id);
        const orderId = this.state.carts[index].id;
        const originalQty = this.state.carts[index].qty;
        const data = { product_id: payload.id, qty: payload.qty + originalQty };
        const removeApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${orderId}`;
        const addApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;

        axios.delete(removeApi);
        axios.post(addApi, { data }).then((response) => {
          context.dispatch('getCarts');
          setTimeout(() => {
            context.commit('CLICKED', false);
          }, 500);
        });
      } else {

        axios.post(api, { data }).then(() => {
          context.dispatch('getCarts');
          setTimeout(() => {
            context.commit('CLICKED', false);
          }, 500);
        });
      }

    },
    getProducts(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products?page=${payload.page}`;

      // payload: { page, cat: this.$route.params.cat }
      axios.get(api).then((response) => {
        if (payload.cat === 'all') {
          context.commit('GET_PRODUCTS',
            {
              products: response.data.products,
              pagiantion: response.data.pagination,
            });

          if (payload.for === 'carousel') {
            context.commit('RANDOM_CAROUSEL', response.data.products);
          } else if (payload.for === 'similar') {
            context.commit('RANDOM_PRODUCTS', response.data.products);
          }
        } else {
          context.commit('GET_PRODUCTS',
            {
              products: response.data.products.filter((el) => el.category === payload.cat),
              pagiantion: response.data.pagination,
            });
        }
      });
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    UPDATING(state, payload) {
      state.isUpdating = payload;
    },
    CLICKED(state, payload) {
      state.isClicked = payload;
    },
    GET_SINGLE(state, payload) {
      state.product = payload;
    },
    GET_CARTS(state, payload) {
      state.carts = payload;

      if (state.carts.length === 0) {
        state.isEmpty = true;
      } else {
        state.isEmpty = false;
      }
    },
    GET_PRODUCTS(state, payload) {
      state.products = payload.products;
      state.pagination = payload.pagiantion;
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
  getters: {

  },
  modules: {
  },
});
