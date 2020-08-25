import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import Index from '@/components/pages/front/index.vue';
import Home from '@/components/pages/front/home.vue';
import Products from '@/components/pages/front/product.vue';
import Detail from '@/components/pages/front/detail.vue';
import Checkout from '@/components/pages/front/checkout.vue';
import OrderConfrim from '@/components/pages/front/orderConfirm.vue';
import LookBook from '@/components/pages/front/lookbook.vue';
import Dashboard from '@/components/pages/dashboard/dashboard.vue';
import Login from '@/components/pages/dashboard/login.vue';
import ProductList from '@/components/pages/dashboard/productList.vue';
import CouponList from '@/components/pages/dashboard/couponList.vue';
import OrderList from '@/components/pages/dashboard/orderList.vue';

Vue.use(VueRouter);
Vue.use(Vueaxios,axios);

const routes =  [
  {
    path:'*',
    redirect:'/'
  },
  {
    path: '/',
    name: 'front',
    component: Index,
    children:[
      {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: (to,from,next) =>{
          //test
          // if(from.name === null){
          //   next()
          // }else if(from.matched[0].path === '/admin'){                             
          //     next(`/admin/virtual${to.fullPath}`)
          // }else{
          //   next()
          // }
          next();
        },
      },
      {
        path: '/products/:cat',
        name: 'products',
        component: Products,
        beforeEnter: (to,from,next) =>{

          if(from.name === null){
            next()
          }else if(from.matched[0].path === '/admin'){                                      
              next(`/admin/virtual${to.fullPath}`)
          }else{
            next()
          }

        },
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
        beforeEnter: (to,from,next) =>{

          if(from.name === null){
            next()
          }else if(from.matched[0].path === '/admin'){                             
            next(`/admin/virtual${to.fullPath}`)
          }else{
            next()
          }
        },
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        beforeEnter: (to,from,next) =>{

          if(from.name === null){
            next()
          }else if(from.matched[0].path === '/admin'){                             
            next(`/admin/virtual${to.fullPath}`)
          }else{
            next()
          }

        },
      },
      {
        path:'/order-confirm/:orderId',
        name:'oreder-confirm',
        component:OrderConfrim,
        beforeEnter: (to,from,next) =>{

          if(from.name === null){
            next()
          }else if(from.matched[0].path === '/admin'){                             
              next(`/admin/virtual${to.fullPath}`)
          }else{
            next()
          }

        },
      },
      {
        path:"about-claires",
        name:"About-claires",
        component: LookBook,
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component: Login,
  },

  {
    path:'/admin',
    name:'admin',
    component: Dashboard,
    meta:{requireAuth:true},
    children:[
      {
        path:'product-list',
        name:'product-list',
        component: ProductList,
        meta:{requiresAuth: true}

      },
      {
        path:'coupon-list',
        name:'coupon-list',
        component: CouponList,
        meta:{requiresAuth: true}

      },
      {
        path:'order-list',
        name:'order-list',
        component: OrderList,
        meta:{requiresAuth: true}
      },
      {
        path: 'virtual',
        name: 'Adminfront',
        component: Index,
        children:[
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
            path:'order-confirm/:orderId',
            name:'Adminoreder-confirm',
            component:OrderConfrim,
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
