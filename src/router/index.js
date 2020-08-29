/* eslint-disable*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import Index from '@/views/front/Index.vue';
import Home from '@/views/front/Home.vue';
import Products from '@/views/front/Product.vue';
import Detail from '@/views/front/Detail.vue';
import Checkout from '@/views/front/Checkout.vue';
import OrderConfrim from '@/views/front/OrderConfirm.vue';
import LookBook from '@/views/front/Lookbook.vue';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Login from '@/views/dashboard/Login.vue';
import ProductList from '@/views/dashboard/ProductList.vue';
import CouponList from '@/views/dashboard/CouponList.vue';
import OrderList from '@/views/dashboard/OrderList.vue';
import CheckoutSuccess from '@/views/front/Checkout-success.vue';
Vue.use(VueRouter);
Vue.use(Vueaxios, axios);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'front',
    component: Index,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/products/:cat',
        name: 'products',
        component: Products,
        beforeEnter: (to, from, next) => {
          if (from.name === null) {
            next();
          } else if (from.matched[0].path === '/admin') {
            next(`/admin/virtual${to.fullPath}`);
          } else {
            next();
          }
        },
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
        beforeEnter: (to, from, next) => {
          if (from.name === null) {
            next();
          } else if (from.matched[0].path === '/admin') {
            next(`/admin/virtual${to.fullPath}`);
          } else {
            next();
          }
        },
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        beforeEnter: (to, from, next) => {
          if (from.name === null) {
            next();
          } else if (from.matched[0].path === '/admin') {
            next(`/admin/virtual${to.fullPath}`);
          } else {
            next();
          }
        },
      },
      {
        path: '/order-confirm/:orderId',
        name: 'oreder-confirm',
        component: OrderConfrim,
        beforeEnter: (to, from, next) => {
          if (from.name === null) {
            next();
          } else if (from.matched[0].path === '/admin') {
            next(`/admin/virtual${to.fullPath}`);
          } else {
            next();
          }
        },
      },
      {
        path:'/checkout-success/:orderId',
        name:'checkout-success',
        component: CheckoutSuccess,
      },
      {
        path: 'about-claires',
        name: 'About-claires',
        component: LookBook,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/admin',
    name: 'admin',
    component: Dashboard,
    meta: { requireAuth: true },
    children: [
      {
        path: 'product-list',
        name: 'product-list',
        component: ProductList,
        meta: { requiresAuth: true },

      },
      {
        path: 'coupon-list',
        name: 'coupon-list',
        component: CouponList,
        meta: { requiresAuth: true },

      },
      {
        path: 'order-list',
        name: 'order-list',
        component: OrderList,
        meta: { requiresAuth: true },
      },
      {
        path: 'virtual',
        name: 'Adminfront',
        component: Index,
        children: [
          {
            path: '/',
            name: 'Adminhome',
            component: Home,
          },
          {
            path: 'products/:cat',
            name: 'Adminproducts',
            component: Products,
          },
          {
            path: 'detail/:id',
            name: 'Admindetail',
            component: Detail,
          },
          {
            path: 'checkout',
            name: 'Admincheckout',
            component: Checkout,
          },
          {
            path: 'order-confirm/:orderId',
            name: 'Adminoreder-confirm',
            component: OrderConfrim,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
