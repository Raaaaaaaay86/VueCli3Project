<template>
  <div>
    <div class="row my-5">
      <loading :active.sync="isLoading"></loading>

      <transition name="fade">
        <div
          class="col-md-6 d-flex justify-content-center"
          v-if="product.title"
        >
          <img :src="product.imageUrl" width="300" />
        </div>
      </transition>

      <transition name="fade">
        <div class="col-md-6" v-if="product.title">
          <div class="pb-2" style="border-bottom:4px solid">
            <h1 class="d-inline">{{ product.title }}</h1>
            <span class="badge badge-primary">{{ product.category | cat }}</span>
          </div>

          <div class="mt-2">
            <p>{{ product.description }}</p>
          </div>

          <div>
            <p class="mb-2 font-weight-bolder">產品介紹:</p>
            <p>{{ product.content }}</p>
          </div>

          <div class="d-flex justify-content-between align-items-end">
            <span class="h6">
              <del>原價: {{ product.origin_price | currency }}</del>
            </span>
            <span class="h4">售價: {{ product.price | currency }}</span>
          </div>

          <div class="row mt-3 d-flex justify-content-between">
            <div class="col-md-6 d-flex align-items-end">
              <div class="form-group w-100 mb-0">
                <label for="productNum">選購商品數量</label>
                <select class="form-control" id="productNum" v-model="qty">
                  <option
                    v-for="num in 5"
                    :key="num"
                    :value="num"
                  >{{ num }} {{ product.unit }}</option>
                </select>
              </div>
            </div>
            <div
              class="col-md-3 mt-3 mt-md-0 d-flex align-items-end justify-content-sm-start justify-content-md-end"
            >
              <button
                v-if="!clicked"
                class="btn btn-primary"
                @click.prevent="addToCart(product.id, qty)"
              >加入購物車</button>
              <button v-else class="btn btn-primary">
                加入中
                <i class="fas fa-spinner fa-spin ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-12 mb-5 h5 text-center d-flex justify-content-center">
        <div class="w-100 border-bottom border-primary">
          <p class="text-center">產品評論</p>
        </div>
      </div>
      <div class="col-md-5 d-flex justify-content-center">
        <div
          class="evaluation d-flex flex-column justify-content-center align-items-center text-primary"
          style="width:100px;height:100px"
        >
          <p class="evaluation-value mb-0">4.5</p>
          <p class="evaluation-title mb-0">商品評價</p>
        </div>
        <div class="ml-3 d-flex flex-column justify-content-center">
          <p class="mb-1 h6">2 個商品評論</p>
          <p class="text-warning">
            <i v-for="value in 4" :key="value" class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </p>
          <button class="btn btn-sm btn-primary">撰寫評論</button>
        </div>
      </div>
      <div class="col-md-5 d-none d-md-flex justify-content-center">
        <div>
          <div class="d-flex align-items-center">
            <span class="mr-3">
              5
              <i class="fas fa-star text-warning"></i>
            </span>
            <div style="width:150px;height:10px" class="bg-secondary">
              <div style="width:50%;height:10px" class="bg-warning"></div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-3">
              4
              <i class="fas fa-star text-warning"></i>
            </span>
            <div style="width:150px;height:10px" class="bg-secondary">
              <div style="width:50%;height:10px" class="bg-warning"></div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-3">
              3
              <i class="fas fa-star text-warning"></i>
            </span>
            <div style="width:150px;height:10px" class="bg-secondary"></div>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-3">
              2
              <i class="fas fa-star text-warning"></i>
            </span>
            <div style="width:150px;height:10px" class="bg-secondary"></div>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-3">
              1
              <i class="fas fa-star text-warning"></i>
            </span>
            <div style="width:150px;height:10px" class="bg-secondary"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3 d-flex justify-content-center">
      <div
        class="col-10 mb-3 d-flex justify-content-between border-bottom border-primary"
      >
        <div>
          <p class="mb-0">陳**</p>
          <span class="text-warning">
            <i v-for="comment in 5" :key="comment" class="fas fa-star"></i>
          </span>
          <p>好評！ 性價比高 品質很好 很滿意，發貨時間快</p>
        </div>
        <div>
          <p>2020-08-15</p>
        </div>
      </div>
      <div
        class="col-10 mb-3 d-flex justify-content-between border-bottom border-primary"
      >
        <div>
          <p class="mb-0">楊**</p>
          <span class="text-warning">
            <i v-for="comment in 4" :key="comment" class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </span>
          <p>讚! 十分有質感 ! 使用之後經常有人和我詢問是哪個品牌 !</p>
        </div>
        <div>
          <p>2020-07-31</p>
        </div>
      </div>
    </div>

    <div class="row mt-4 no-gutters">
      <div class="col-12 mb-3 h5 d-flex justify-content-center">
        <div class="w-100">
          <p class="text-center">您可能會喜歡這些...</p>
        </div>
      </div>

      <router-link
        tag="a"
        :to="{ name: 'detail', params: { id: product.id } }"
        class="col-6 col-md-3 mb-3 d-flex justify-content-center"
        v-for="product in products"
        :key="product.id"
      >
        <div class="card" style="width:75%">
          <div
            class="card-img-top bg-contain"
            style="min-height:150px"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <div class="card-body px-1">
            <div class="text-center">
              <router-link
                :to="{ name: 'detail', params: { id: product.id } }"
                tag="a"
                class="card-title mb-0 font-weight-bolder"
              >
                {{ product.title }}
              </router-link>
              <p class="card-text mb-1">{{ product.description }}</p>
              <small class="mb-3">{{ product.price | currency }}</small>
              <small class="d-block mt-1">
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
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      product: {},
      clicked: false,
      isUpdating: false,
      qty: 1,
      products: [],
    };
  },
  methods: {
    getSingle() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${vm.$route.params.id}`;
      vm.isLoading = true;

      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
      const data = { product_id: id, qty };
      vm.clicked = true;

      vm.$http.post(api, { data }).then(() => {
        this.$bus.$emit('reupdateCarts');
        setTimeout(() => {
          vm.clicked = false;
        }, 500);
      });
    },
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products?page=${page}`;

      vm.$http.get(api).then((response) => {
        const fetched = response.data.products;
        fetched.sort(() => Math.random() - 0.5);
        const sliced = fetched.slice(0, 4);
        vm.products = sliced;
      });
    },
  },
  created() {
    this.getSingle();
    this.getProducts();
  },
  watch: {
    $route() {
      this.getSingle();
      this.getProducts();
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluation {
  border: 3px solid black;

  &-value {
    font-size: 30px;
    font-weight: 500;
  }
  &-title {
    font-size: 16px;
  }
}
</style>
