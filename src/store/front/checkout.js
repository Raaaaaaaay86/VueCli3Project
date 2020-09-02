import axios from 'axios';
import router from '@/router';

export default {
  state: {
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
};
