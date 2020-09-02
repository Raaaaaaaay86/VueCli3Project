import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';
import router from '../router';
import ProductsModule from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    isUpdating: false,
    carts: { carts: [] },
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
    isShowing: false,
    isSuccess: true,
    message: '此為預設系統提示',
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
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

        axios.delete(removeApi).then(() => {
          axios.post(api, { data: addData }).then(() => {
            context.dispatch('getCarts');
            setTimeout(() => {
              context.commit('CLICKED', false);
            }, 500);
          });
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
    showToast(context, payload) {
      context.commit('SHOW_TOAST', { isSuccess: payload.isSuccess, msg: payload.msg });
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
    SHOW_TOAST(state, payload) {
      state.isShowing = true;

      if (payload.isSuccess) {
        state.isSuccess = true;
      } else {
        state.isSuccess = false;
      }

      state.message = payload.msg;
      $('#myToast').toast('show');
    },
  },
  modules: {
    ProductsModule,
  },
});
