<template>
<div>
    <div class="row d-flex justify-content-sm-center">
        <div class="col-md-6 py-5">
            <table class="table table-borderless border border-primary">
                <thead>
                    <tr>
                        <th class="trash"></th>
                        <th>品名</th>
                        <th class="mount">數量</th>
                        <th class="net">小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in carts.carts" :key="cart.id">
                        <td>
                            <button class="btn btn-outline-primary" @click.prevent="removeCart(cart.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="table-title">{{ cart.product.title }}</td>
                        <td>
                          <div class="qty">
                              <div class="qty-minus" @click.prevent="changeQty(cart.product_id,-1)">-</div>
                              {{ cart.qty }} {{ cart.product.unit }}
                              <div class="qty-plus" @click.prevent="changeQty(cart.product_id)">+</div>
                          </div>
                        </td>
                        <td class="text-right">{{ (cart.product.price * cart.qty) | currency }}</td>
                    </tr>
                    <tr v-if="carts.carts.length !== 0">
                        <td colspan="4" class="text-right">總金額: {{ carts.total | currency }}</td>
                    </tr>
                    <tr v-if="carts.final_total !== carts.total">
                        <td colspan="4" class="text-right text-success font-weight-bolder">
                            折扣價: {{ carts.final_total | currency }}
                        </td>
                    </tr>
                    <tr v-if="carts.carts.length === 0">
                        <td colspan="4" class="text-center pb-0">
                            <p class="mb-0">購物車是空的!</p>
                        </td>
                    </tr>
                    <tr v-if="carts.carts.length === 0">
                        <td colspan="4" class="text-center">
                            <router-link to="/products/all" tag="button" class="btn btn-primary">回購物頁面</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="input-group input-group-sm mb-0">
                    <input v-model="couponCode" id="couponCode" type="text" class="form-control" placeholder="慶開幕！輸入 CLAIRE 即享九折！" />
                    <div class="input-group-append  ">
                        <button class="input-group-text coupon-btn" @click.prevent="useCoupon()">
                            套用優惠碼
                        </button>
                    </div>
                </div>
                <small v-if="couponValid === true" class="text-success">成功使用優惠券</small>
                <small v-if="couponValid === false" class="text-danger">優惠券代碼錯誤</small>
            </div>

        </div>

        <div class="col-md-6 py-5 ">
            <div class="border border-primary text-primary px-5 py-3">
                <div class="d-flex justify-content-sm-center font-weight-bolder h3">
                    訂單資料
                </div>
                <validation-observer v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(submitOrder)">
                        <div class="form-group">
                            <label for="email">電子信箱 (必填)</label>
                            <validation-provider name="電子信箱" :rules="{ required: true, email: true }" v-slot="{ errors }">
                                <input v-model="form.user.email" type="email" class="form-control" id="email" placeholder="example@mail.com" :class="{ 'is-invalid': errors[0] }" />
                                <span class="text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="name">收件人姓名 (必填)</label>
                                    <validation-provider name="姓名" rules="required" v-slot="{ errors }">
                                        <input v-model="form.user.name" type="text" class="form-control" id="name" placeholder="請輸入姓名" :class="{ 'is-invalid': errors[0] }" />
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </validation-provider>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="tel">收件人電話 (必填)</label>
                                    <validation-provider name="電話" rules="required" v-slot="{ errors }">
                                        <input v-model="form.user.tel" type="tel" class="form-control" id="tel" placeholder="請輸入電話" :class="{ 'is-invalid': errors[0] }" />
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </validation-provider>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="address">收件地址 (必填)</label>
                            <validation-provider name="地址" rules="required" v-slot="{ errors }">
                                <input v-model="form.user.address" type="text" class="form-control" id="address" placeholder="請輸入地址" :class="{ 'is-invalid': errors[0] }" />
                                <span class="text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group ">
                            <label for="msg">備註 (選填)</label>
                            <textarea v-model="form.message" class="form-control" id="msg" rows="4"></textarea>
                        </div>
                        <button class="w-100 btn btn-primary">送出訂單</button>
                    </form>
                </validation-observer>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    removeCart(OrderId) {
      this.$store.dispatch('removeCart', OrderId);
    },
    changeQty(id, qty = 1) {
      this.$store.dispatch('addToCart', { id, qty });
    },
    useCoupon() {
      const vm = this;
      this.$store.dispatch('useCoupon', { couponCode: vm.couponCode });
    },
    submitOrder() {
      const vm = this;
      this.$store.dispatch('submitOrder', { form: vm.form });
    },
  },
  computed: {
    carts() {
      return this.$store.state.CartsModule.carts;
    },
    couponValid() {
      return this.$store.state.CheckoutModule.couponValid;
    },
  },
};
</script>

<style lang="scss" scoped>
.qty {
  display: flex;
  align-items: center;
  &-minus {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 3px;
    height: 16px;
    width: 16px;
    margin-right: 5px;
    border: 1px solid black;
    user-select: none;

    &:hover {
      transform: scale(1.15);
    }

    &:active {
      transform: scale(1);
    }
  }

  &-plus {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 3px;
    height: 16px;
    width: 16px;
    margin-left: 5px;
    border: 1px solid black;
    user-select: none;

    &:hover {
      transform: scale(1.15);
    }

    &:active {
      transform: scale(1);
    }
  }
}

tbody tr td{
  padding-right: 6px;
  padding-left: 6px;
}

.trash {
  @media(max-width: 576px) {
    width: 10px;
  }
}

.mount {
  @media(max-width: 576px) {
    width: 80px;
  }
}

.net {
  @media(max-width: 576px) {
    width: 60px;
  }
}
</style>
