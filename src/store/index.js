import Vue from 'vue';
import Vuex from 'vuex';
import ProductsModule from './front/products';
import CartsModule from './front/carts';
import CheckoutModule from './front/checkout';
import ToastModule from './dashboard/popToast';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    isUpdating: false,
    isClicked: false,
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
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
  },
  modules: {
    ProductsModule, CartsModule, CheckoutModule, ToastModule,
  },
});
