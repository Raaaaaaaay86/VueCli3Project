import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'jquery';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import './bus';
import 'bootstrap'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import './validation';
import AOS from 'aos';
import 'aos/dist/aos.css';

import CurrencyFilter from './filters/currency';
import TimeStampFilter from './filters/timeStamp';
import CatTranslateFilter from './filters/catTranslate';

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('loading',Loading);
Vue.filter('currency',CurrencyFilter);
Vue.filter('timeStamp',TimeStampFilter);
Vue.filter('cat',CatTranslateFilter);
Vue.use(Vueaxios,axios);

new Vue({
  router,
  render: (h) => h(App),
  created(){
    AOS.init();
  }
}).$mount('#app');
