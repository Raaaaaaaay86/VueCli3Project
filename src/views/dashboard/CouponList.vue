<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!--ADD BTN-->
    <div class="d-flex justify-content-sm-end">
      <button
        class="btn bnt-lg btn-secondary my-3"
        @click.prevent="openModal(null, true, 'couponModal')"
      >
        建立優惠券
      </button>
    </div>
    <!--TABLE-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>活動名稱</th>
          <th>代碼</th>
          <th>到期日</th>
          <th>折扣百分比</th>
          <th>編號</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <th>{{ coupon.title }}</th>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.due_date | timeStamp }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>
            <small>{{ coupon.id }}</small>
          </td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled === '1'">已啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td class="d-flex">
            <button
              class="btn btn-sm btn-secondary mr-1"
              @click.prevent="openModal(coupon, false, 'couponModal')"
            >
              編輯
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click.prevent="openModal(coupon, false, 'deleteModal')"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="isNew" class="modal-title" id="couponModalLabel">
              建立優惠券
            </h5>
            <h5 v-else class="modal-title" id="couponModalLabel">
              修改優惠券
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <validation-observer v-slot="{ handleSubmit }">
            <div class="modal-body">
              <div class="form-group">
                <label for="couponTitle">活動名稱</label>
                <input
                  v-model="tempCoupon.title"
                  type="text"
                  class="form-control"
                  id="couponTitle"
                />
              </div>
              <div class="form-group">
                <label for="couponCode">優惠代碼</label>
                <input v-model="tempCoupon.code" type="text" class="form-control" id="couponCode" />
              </div>
              <div class="form-group">
                <label for="couponDueDate"
                  >到期日
                  <span class="text-danger" v-if="tempCoupon.due_date">{{
                    tempCoupon.due_date | timeStamp
                  }}</span></label
                >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input
                    v-model="tempCoupon.due_date"
                    name="日期"
                    type="date"
                    class="form-control"
                    id="couponDueDate"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="couponDiscount">折扣百分比</label>
                <input
                  v-model="tempCoupon.percent"
                  type="number"
                  class="form-control"
                  id="couponDiscount"
                />
              </div>
              <div class="custom-control custom-checkbox">
                <input
                  v-model="tempCoupon.is_enabled"
                  true-value="1"
                  false-value="0"
                  type="checkbox"
                  class="custom-control-input"
                  id="enable"
                />
                <label class="custom-control-label" for="enable">是否啟用</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="handleSubmit(updateCoupon)"
              >
                Save changes
              </button>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>

    <!--Pagiantion-->
    <Pagination :pages="pagination" v-on:change-page="getCoupons" />
    <!--DELETE MODAL-->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white font-weight-bold">
            <h5 class="modal-title" id="deleteModalLabel">
              刪除優惠券
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              確定要刪除 優惠券:
              <span class="text-danger font-weight-bolder">{{ tempCoupon.title }}</span> 嗎?
            </p>
            <p class="text-danger">(刪除後無法復原)</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="deleteCoupon(tempCoupon.id)"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: true,
      isLoading: false,
    };
  },
  components: { Pagination },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`;

      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(coupon, isNew, modalId) {
      const vm = this;
      if (isNew) {
        vm.isNew = true;
        vm.tempCoupon = {};
        $(`#${modalId}`).modal('show');
      } else {
        vm.isNew = false;
        vm.tempCoupon = { ...coupon };
        $(`#${modalId}`).modal('show');
      }
    },
    updateCoupon() {
      const vm = this;
      let method;
      let api;
      const date = vm.tempCoupon.due_date;
      vm.tempCoupon.due_date = new Date(date).getTime() * 0.001;

      $('#couponModal').modal('hide');

      if (vm.isNew) {
        method = 'post';
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/`;
      } else {
        method = 'put';
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${vm.tempCoupon.id}`;
      }

      vm.$http[method](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('popToast', response.data.success, response.data.message);
        }

        this.getCoupons();
      });
    },
    deleteCoupon(couponId) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${couponId}`;
      $('#deleteModal').modal('hide');
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('popToast', false, response.data.message);
        } else {
          vm.$bus.$emit('popToast', false, response.data.message);
        }

        vm.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
  updated() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementsByName('日期')[0].setAttribute('min', today);
  },
};
</script>

<style lang="scss"></style>
