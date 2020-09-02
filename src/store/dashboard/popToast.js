import $ from 'jquery';

export default {
  state: {
    isShowing: false,
    isSuccess: true,
    message: '此為預設系統提示',
  },
  actions: {
    showToast(context, payload) {
      context.commit('SHOW_TOAST', { isSuccess: payload.isSuccess, msg: payload.msg });
    },
  },
  mutations: {
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
};
