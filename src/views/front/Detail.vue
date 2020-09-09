<template>
  <div>
    <div class="row my-5">
      <transition name="fade">
        <div class="col-md-6 d-flex justify-content-center" v-if="product.title">
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
                  <option v-for="num in 5" :key="num" :value="num">{{ num }} {{ product.unit }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3 mt-3 mt-md-0 d-flex align-items-end justify-content-sm-start justify-content-md-end">
              <button v-if="!isClicked" class="btn btn-primary" @click.prevent="addToCart(product.id, qty)">加入購物車</button>
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
        <div class="evaluation d-flex flex-column justify-content-center align-items-center text-primary" style="width:100px;height:100px">
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
      <div class="col-10 mb-3 d-flex justify-content-between border-bottom border-primary">
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
      <div class="col-10 mb-3 d-flex justify-content-between border-bottom border-primary">
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

      <router-link tag="a" :to="{ name: 'detail', params: { id: product.id } }" class="col-6 col-md-3 mb-3 d-flex justify-content-center" v-for="product in randomProducts" :key="product.id">
        <div class="card" style="width:75%">
          <div class="card-img-top bg-contain" style="min-height:150px" :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
          <div class="card-body px-1">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      qty: 1,
    };
  },
  methods: {
    getSingle() {
      this.$store.dispatch('getSingle', this.$route.params.id);
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('addToCart', { id, qty });
    },
    ...mapActions(['getRandom']),
  },
  computed: {
    product() {
      return this.$store.state.ProductsModule.product;
    },
    isClicked() {
      return this.$store.state.isClicked;
    },
    randomProducts() {
      return this.$store.state.ProductsModule.randomProducts;
    },
  },
  created() {
    this.getSingle();
    this.getRandom();
  },
  watch: {
    $route() {
      this.getSingle();
      this.getRandomProducts();
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
