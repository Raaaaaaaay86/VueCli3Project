import axios from 'axios';

export default {
  state: {
    carts: { carts: [] },
    isEmpty: true,
  },
  actions: {
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

      if (this.state.CartsModule.carts.carts.some((el) => el.product_id === payload.id)) {
        const index = this.state.CartsModule.carts.carts.findIndex((el) => el.product_id === payload.id);
        const orderId = this.state.CartsModule.carts.carts[index].id;
        const originalQty = this.state.CartsModule.carts.carts[index].qty;
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
  },
  mutations: {
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
  },
};
