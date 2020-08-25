<template>
  <div class="row my-5">
    <transition name="fade">
      <div class="col-md-6" v-if="product.title">
        <img :src="product.imageUrl" class="h-100 w-100" />
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
          <span class="h6"
            ><del>原價: {{ product.origin_price | currency }}</del></span
          >
          <span class="h4">售價: {{ product.price | currency }}</span>
        </div>

        <div class="row mt-3 d-flex justify-content-between">
          <div class="col-md-6 d-flex align-items-end">
            <div class="form-group w-100 mb-0">
              <label for="productNum">選購商品數量</label>
              <select class="form-control" id="productNum" v-model="product.num">
                <option v-for="num in 5" :key="num" :value="num"
                  >{{ num }} {{ product.unit }}</option
                >
              </select>
            </div>
          </div>
          <div
            class="col-md-3 mt-3 mt-md-0 d-flex align-items-end
            justify-content-sm-start justify-content-md-end"
          >
            <button class="btn btn-primary" @click.prevent="addToCart(product.id, product.num)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getSingle() {
      const vm = this;
      // productId = vm.$route.params.id;
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

      vm.$http.post(api, { data }).then(() => {
        this.$bus.$emit('reupdateCarts');
      });
    },
  },
  created() {
    this.getSingle();
  },
};
</script>
