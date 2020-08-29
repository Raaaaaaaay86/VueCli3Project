<template>
  <div>
    <div class="container">
      <div class="row mt-5 d-flex justify-content-center">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div class="d-flex flex-column align-items-center">
            <i class="fas fa-check-circle fa-5x text-success"></i>
            <h1 class="mt-3">已成功付款</h1>
            <p>感謝您在CLAIRE's消費，以下是訂單明細 ( 編號 : {{ order.id }} )</p>
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column align-items-center mt-3">
          <table class="table table-sm">
            <thead>
              <th>產品名稱</th>
              <th>數量</th>
              <th>小計</th>
            </thead>
            <tbody>
              <tr v-for="product in order.products" :key="product.product_id">
                <td>{{ product.product.title }}</td>
                <td>{{ product.qty }} {{ product.product.unit }}</td>
                <td class="text-right">{{ product.final_total | currency }}</td>
              </tr>
              <tr>
                <th colspan="2" class="text-right">總額 :</th>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
              <tr>
                <th>收件人 :</th>
                <td colspan="2">{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>聯絡電話 :</th>
                <td colspan="2">{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>Email :</th>
                <td colspan="2">{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>收件地址 :</th>
                <td colspan="2">{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>備註 :</th>
                <td colspan="2">{{ order.message }}</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/products/all" tag="button" class="btn btn-primary">回到購物頁面</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getOrder() {
      const id = this.$route.params.orderId;
      this.$store.dispatch('getOrder', { routeParam: id });
    },
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
  },
  created() {
    this.getOrder();
    window.scrollTo(0, 0);
  },
};
</script>
