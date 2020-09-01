import Vue from 'vue';
import Vuex from 'vuex';
import 'jquery';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './validation';
import router from './router';
import App from './App.vue';

import CurrencyFilter from './filters/currency';
import TimeStampFilter from './filters/timeStamp';
import CatTranslateFilter from './filters/catTranslate';
import store from './store';

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('loading', Loading);
Vue.filter('currency', CurrencyFilter);
Vue.filter('timeStamp', TimeStampFilter);
Vue.filter('cat', CatTranslateFilter);
Vue.use(Vueaxios, axios);
Vue.use(Vuex);

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount('#app');

router.beforeEach((to, from, next) => {
  const api = `${process.env.VUE_APP_API}/api/user/check`;

  if (to.meta.requireAuth) {
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next('/login');
      }
    });
  } else {
    next();
  }
});
