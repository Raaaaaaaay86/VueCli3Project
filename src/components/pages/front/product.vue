<template>
  <div>
    <div class="row mt-3 d-flex align-items-center justify-content-center">
      <div
        class="col-md-10 pl-5 pt-5 bg-cover product-header"
        style="height:350px"
      >
        <p class="h3 text-primary font-weight-bolder">2020秋冬 全新感受</p>
        <small class="d-block mb-3 text-primary">CLAIRE'S團隊打造的新色彩美學</small>
        <router-link
          to="/checkout"
          tag="button"
          class="btn btn-sm btn-primary"
        >查看購物車</router-link>
      </div>
    </div>

    <transition-group tag="div" name="list" class="row mt-3 no-gutters">
      <div
        class="col-6 col-md-4 mb-3 d-flex justify-content-center"
        v-for="product in products"
        :key="product.id"
      >
        <div class="card" style="width:100%">
          <div
            class="card-img-top bg-contain"
            style="min-height:300px"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <div class="card-body">
            <div class="text-center">
              <router-link
                :to="{ name: 'detail', params: { id: product.id } }"
                tag="a"
                class="card-title mb-0 font-weight-bolder"
              >
                {{ product.title }}
                <!--    <span class="badge badge-danger">{{product.category}}</span> -->
              </router-link>
              <p class="card-text mb-1">{{ product.description }}</p>
              <small class="mb-3">{{ product.price | currency }}</small>
              <!--<p class="card-text">{{product.content}}</p> -->
              <small class="d-block">
                <router-link
                  :to="{ name: 'detail', params: { id: product.id } }"
                >查看詳情</router-link>
              </small>
              <small class="d-block">
                <a href="#" @click.prevent="addToCart(product.id)">
                  <i class="fas fa-shopping-cart"></i>
                  加入購物車
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <!--Pagination-->
    <Pagination :pages="pagination" v-on:change-page="getProducts" />
  </div>
</template>

<script>
import Pagination from '../../pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products?page=${page}`;
      vm.$http.get(api).then((response) => {
        if (vm.$route.params.cat === 'all') {
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        } else {
          vm.products = response.data.products.filter((el) => el.category === vm.$route.params.cat);
          vm.pagination = response.data.pagination;
        }
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;

      const data = { product_id: id, qty };

      vm.$http.post(api, { data }).then(() => {
        this.$bus.$emit('reupdateCarts');
      });
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

<style lang="scss">
.product-header {
  background-image: url(../../../assets/imgs/productHeader.jpg);
}
.card-text {
  font-size: 12px;
}
</style>
