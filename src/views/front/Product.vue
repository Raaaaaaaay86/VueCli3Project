<template>
  <div>
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-12 bg-cover product-header">
        <div class="header-info">
          <p class="h3 text-primary font-weight-bolder">2020秋冬 全新感受</p>
          <small class="d-block mb-3 text-primary">CLAIRE'S團隊打造的新色彩美學</small>
          <router-link to="/checkout" tag="button" class="btn btn-sm btn-primary">查看購物車</router-link>
        </div>
      </div>
    </div>

    <transition-group tag="div" name="list" class="row mt-3 d-flex justify-content-center no-gutters">
      <router-link tag="a" :to="{ name: 'detail', params: { id: product.id } }" class="col-6 col-md-3 mb-3 d-flex justify-content-center" v-for="product in products" :key="product.id">
        <div class="card">
          <div class="card-img-top bg-contain" style="min-height:150px" :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
          <div class="card-body">
            <div class="text-center">
              <router-link :to="{ name: 'detail', params: { id: product.id } }" tag="a" class="card-title mb-0 font-weight-bolder">{{ product.title }}</router-link>
              <p class="card-text mb-1">{{ product.description }}</p>
              <small>
                <del>原價: {{ product.origin_price | currency }}</del>
              </small>
              <p class="mb-3">特惠價: {{ product.price | currency }}</p>
              <a href="#" class="d-block link-add mt-2 btn btn-lg btn-primary" @click.prevent="addToCart(product.id)">
                <i class="fas fa-shopping-cart"></i>
                加入購物車
              </a>
            </div>
          </div>
        </div>
      </router-link>
    </transition-group>
    <!--Pagination-->
    <Pagination :pages="pagination" v-on:change-page="getProducts" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('getProducts', { page, cat: this.$route.params.cat });
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('addToCart', { id, qty });
    },
  },
  computed: {
    products() {
      return this.$store.state.ProductsModule.products;
    },
    pagination() {
      return this.$store.state.ProductsModule.pagination;
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    $route() {
      this.getProducts();
    },
  },
};
</script>

<style lang="scss" scoped>

.product-header {
  background-image: url(../../assets/imgs/productHeader.jpg);
  height: 500px;
  @media(max-width: 768px){
    height: 350px;
  }
}

.header-info {
  position: absolute;
  top: 15%;
  left: 15%;
}

a {
  text-decoration: none;
}

.card {
  transition: 0.1s;
  width: 75%;
  @media (max-width: 768px) {
    width: 90%;
  }
  &-text {
    font-size: 12px;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 3px 5px rgba(189, 195, 199, 0.7);
  }
  &-body {
    padding: 20px 5px;
  }
}

.link {
  &-add {
    font-size: 14px;
  }
}
</style>
