<template>
  <div class="row py-5 d-flex justify-content-sm-center">
    <div class="col-md-8">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="el in order.products" :key="el.id">
            <td>{{ el.product.title }}</td>
            <td>{{ el.qty }}{{ el.product.unit }}</td>
            <td class="text-right">{{ el.final_total | currency }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right h5">小計: {{ order.total | currency }}</td>
          </tr>
          <tr>
            <th>電子信箱</th>
            <td colspan="2">{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td colspan="2">{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td colspan="2">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td colspan="2">{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td colspan="2" v-if="order.is_paid" class="text-success">已付款</td>
            <td colspan="2" class="text-danger" v-else>未付款</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-5">
        <router-link to="/" class="w-50 btn btn-lg btn-primary" v-if="order.is_paid"
          >回到主頁面</router-link
        >
        <button class="w-50 btn btn-lg btn-primary" @click.prevent="pay" v-else>確認付款</button>
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
    pay() {
      const id = this.$route.params.orderId;
      this.$store.dispatch('pay', { routeParam: id });
    },
  },
  computed: {
    order() {
      return this.$store.state.CheckoutModule.order;
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
