<template>
  <div>
    <div class="row mt-3 mt-md-0">
      <div class="col px-0">
        <nav class="navbar navbar-expand-lg border-bottom border-primary navbar-light bg-white justify-content-between">
          <button class="navbar-toggler" id="toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/">
            <img height="30" class="text-dark d-block d-md-none" src="../../../assets/imgs/cocologo.svg" alt />
          </router-link>
          <div class="d-bolck d-md-none">
            <i v-if="isUpdating" class="fas fa-spinner fa-1x fa-spin"></i>
            <router-link to="/checkout">
              <i class="fas fa-shopping-cart fa-2x mr-3"></i>
            </router-link>
          </div>
          <div class="collapse navbar-collapse" id="navbarNav">
            <div id="navbar-list" class="navbar-nav w-100 justify-content-md-around">
              <router-link to="/" class="nav-link">回首頁</router-link>
              <router-link to="/products/all" class="nav-link">所有商品</router-link>
              <router-link to="/products/lip" class="nav-link">唇彩</router-link>
              <router-link to="/products/blush" class="nav-link">腮紅</router-link>
              <router-link to="/products/nail" class="nav-link">指彩</router-link>
              <router-link to="/about-claires" class="nav-link">關於 Claire's</router-link>
              <div class="dropdown">
                <span class="nav-link d-none d-md-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i v-if="isUpdating" class="fas fa-spinner fa-spin"></i>
                  <i class="fas fa-shopping-cart"></i>
                </span>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <table class="table table-borderless table-hover mb-0">
                    <thead>
                      <tr>
                        <th width="20px"></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cart in carts.carts" :key="cart.id">
                        <td>
                          <button class="btn btn-outline-primary" @click.prevent="removeCart(cart.id)">
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                        <td>{{ cart.product.title }}</td>
                        <td>{{ cart.qty }}{{ cart.product.unit }}</td>
                        <td class="text-right">{{ (cart.product.price * cart.qty) | currency }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="px-5 mt-3 d-flex justify-content-sm-center align-items-sm-center">
                    <router-link v-if="isEmpty" to="/products/all" tag="button" class="btn btn-sm btn-primary w-100">前往購物頁面</router-link>
                    <router-link v-else to="/checkout" tag="button" class="btn btn-sm btn-primary w-100">結帳去</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  methods: {
    getCarts() {
      this.$store.dispatch('getCarts');
    },
    removeCart(OrderId) {
      this.$store.dispatch('removeCart', OrderId);
    },
    listenToToggler() {
      const navbarList = document.getElementById('navbar-list');

      navbarList.addEventListener('click', (e) => {
        const navLink = Array.prototype.some.call(e.target.classList, (el) => el === 'nav-link');
        if (navLink) {
          $('#navbarNav').collapse('hide');
          window.scrollTo(0, 0);
        }
      });
    },
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    isEmpty() {
      return this.$store.state.isEmpty;
    },
    isUpdating() {
      return this.$store.state.isUpdating;
    },
  },
  created() {
    this.getCarts();
  },
  updated() {
    this.listenToToggler();
  },
  watch: {
    $route(to) {
      if (to.fullPath === '/checkout' && this.carts.carts.length === 0) {
        this.$router.push('/products/all');
      }
    },
  },
};
</script>
