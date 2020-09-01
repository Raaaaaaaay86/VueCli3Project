import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Vueaxios from 'vue-axios';

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
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: '/products/:cat',
        name: 'products',
        component: () => import('@/views/front/Product.vue'),
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
        component: () => import('@/views/front/Detail.vue'),
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
        component: () => import('@/views/front/Checkout.vue'),
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
        component: () => import('@/views/front/OrderConfirm.vue'),
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
        path: '/checkout-success/:orderId',
        name: 'checkout-success',
        component: () => import('@/views/front/Checkout-success.vue'),
      },
      {
        path: 'about-claires',
        name: 'About-claires',
        component: () => import('@/views/front/Lookbook.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/dashboard/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { requireAuth: true },
    children: [
      {
        path: 'product-list',
        name: 'product-list',
        component: () => import('@/views/dashboard/ProductList.vue'),
        meta: { requiresAuth: true },

      },
      {
        path: 'coupon-list',
        name: 'coupon-list',
        component: () => import('@/views/dashboard/CouponList.vue'),
        meta: { requiresAuth: true },

      },
      {
        path: 'order-list',
        name: 'order-list',
        component: () => import('@/views/dashboard/OrderList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'virtual',
        name: 'Adminfront',
        component: () => import('@/views/front/Index.vue'),
        children: [
          {
            path: '/',
            name: 'Adminhome',
            component: () => import('@/views/front/Home.vue'),
          },
          {
            path: 'products/:cat',
            name: 'Adminproducts',
            component: () => import('@/views/front/Product.vue'),
          },
          {
            path: 'detail/:id',
            name: 'Admindetail',
            component: () => import('@/views/front/Detail.vue'),
          },
          {
            path: 'checkout',
            name: 'Admincheckout',
            component: () => import('@/views/front/Checkout.vue'),
          },
          {
            path: 'order-confirm/:orderId',
            name: 'Adminoreder-confirm',
            component: () => import('@/views/front/OrderConfirm.vue'),
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
