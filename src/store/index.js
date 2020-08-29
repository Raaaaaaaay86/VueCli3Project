import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    isUpdating: false,
    product: {},
    products: [],
    randomProducts: [],
    randomCarousel: [],
    carts: { carts: [] },
    pagination: {},
    isEmpty: true,
    isClicked: false,
    couponValid: '',
    order: {
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
      },
    },
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
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('GET_CARTS', response.data.data);
        context.commit('UPDATING', false);
        context.commit('LOADING', false);
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
      context.commit('LOADING', true);

      if (this.state.carts.carts.some((el) => el.product_id === payload.id)) {
        const index = this.state.carts.carts.findIndex((el) => el.product_id === payload.id);
        const orderId = this.state.carts.carts[index].id;
        const originalQty = this.state.carts.carts[index].qty;
        const addData = { product_id: payload.id, qty: payload.qty + originalQty };
        const removeApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${orderId}`;

        axios.delete(removeApi);
        axios.post(api, { data: addData }).then(() => {
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
    useCoupon(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`;
      axios.post(api, { data: { code: payload.couponCode } }).then((response) => {
        context.dispatch('getCarts');
        context.commit('COUPON_VALID', response.data.success);
      });
    },
    submitOrder(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order`;

      axios.post(api, { data: payload.form }).then((response) => {
        if (response.data.success) {
          router.push(`/order-confirm/${response.data.orderId}`);
        }
      });
    },
    getOrder(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order/${payload.routeParam}`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        context.commit('GET_ORDERINFO', response.data.order);
        context.commit('LOADING', false);
      });
    },
    pay(context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/pay/${payload.routeParam}`;

      axios.post(api).then(() => {
        router.push(`/checkout-success/${payload.routeParam}`);
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

      if (state.carts.carts.length === 0) {
        state.isEmpty = true;
      } else {
        state.isEmpty = false;
      }
    },
    CLEAN_CART(state) {
      state.carts = [];
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
    COUPON_VALID(state, payload) {
      if (!payload) {
        state.couponValid = false;
      } else {
        state.couponValid = true;
      }
    },
    GET_ORDERINFO(state, payload) {
      state.order = payload;
    },
  },
  modules: {
  },
});
