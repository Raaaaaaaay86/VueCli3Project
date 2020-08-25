<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!--TABLE-->
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th width="160">購買時間</th>
          <th>聯絡資訊</th>
          <th>購買款項</th>
          <th width="100">應付金額</th>
          <th width="100">是否付款</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <p class="mb-0">{{ order.create_at | timeStamp }}</p>
            <small class="mb-0">訂單編號:<br />{{ order.id }}</small>
          </td>
          <td>
            <p class="mb-0">姓名: {{ order.user.name }}</p>
            <p class="mb-0">電話: {{ order.user.tel }}</p>
            <p class="mb-0">E-mail: {{ order.user.email }}</p>
            <p class="mb-0">收件地址: {{ order.user.address }}</p>
          </td>
          <td>
            <p class="mb-0" v-for="(product, i) in order.products" :key="i">
              - {{ product.product.title }}
              <span class="text-success font-weight-bolder">
                {{ product.qty }}{{ product.product.unit }}
              </span>
            </p>
          </td>
          <td class="text-right">{{ order.total | currency }}</td>
          <td>
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td>
            <button class="btn btn-sm btn-secondary" @click.prevent="openModal(order)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row d-flex justify-content-center">
                <div class="col">
                  <p class="mb-0">訂單編號: {{ tempOrder.id }}</p>
                </div>
                <div class="col d-flex align-items-sm-center">
                  <input
                    v-model="tempOrder.is_paid"
                    class="d-inline mr-1"
                    type="checkbox"
                    id="customCheck1"
                  />
                  <p class="mb-0">
                    付款狀態:
                    <span class="text-success" v-if="tempOrder.is_paid">已付款</span>
                    <span class="text-danger" v-else>未付款</span>
                  </p>
                </div>
              </div>
              <div class="form-row mt-3">
                <div class="col-6">
                  <div class="form-group">
                    <label for="userName">收件人姓名</label>
                    <input
                      v-model="tempOrder.user.name"
                      type="text"
                      class="form-control"
                      id="userName"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="userTel">連絡電話</label>
                    <input
                      v-model="tempOrder.user.tel"
                      type="tel"
                      class="form-control"
                      id="userTel"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label for="userEmail">電子信箱</label>
                    <input
                      v-model="tempOrder.user.email"
                      type="email"
                      class="form-control"
                      id="userEmail"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label for="userAddress">收件地址</label>
                    <input
                      v-model="tempOrder.user.address"
                      type="address"
                      class="form-control"
                      id="userAddress"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateOrder">
              修改訂單
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Pagination-->
    <Pagination :pages="pagination" v-on:change-page="getOrders" />
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
    };
  },
  components: { Pagination },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`;
      vm.isLoading = true;

      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(order) {
      const vm = this;
      vm.tempOrder = { ...order };
      $('#orderModal').modal('show');
    },
    updateOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/order/${vm.tempOrder.id}`;
      $('#orderModal').modal('hide');

      vm.$http.put(api, { data: vm.tempOrder }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('popToast', response.data.success, response.data.message);
        }

        vm.getOrders();
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
