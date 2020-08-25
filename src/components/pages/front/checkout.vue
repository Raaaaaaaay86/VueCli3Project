<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <div class="row d-flex justify-content-sm-center">

        <div class="col-md-6 py-5">
            <table class="table table-borderless border border-primary">
                <thead>
                    <tr>
                        <th width="20px"></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in carts.carts" :key="cart.id">
                        <td>
                            <button class="btn btn-outline-primary"
                                    @click.prevent="removeCart(cart.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                        <td>{{cart.product.title}}</td>
                        <td>{{cart.qty}}{{cart.product.unit}}</td>
                        <td class="text-right">{{cart.product.price * cart.qty | currency}}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-right">原價: {{carts.total | currency}}</td>
                    </tr>
                    <tr v-if="carts.final_total !== carts.total">
                        <td colspan="4" class="text-right text-success font-weight-bolder">折扣價: {{carts.final_total | currency}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="input-group input-group-sm mb-3">
                <input v-model="couponCode" id="couponCode" type="text" class="form-control" placeholder="請輸入優惠碼">
                <div class="input-group-append  ">
                    <button class="input-group-text coupon-btn" @click.prevent="useCoupon()">套用優惠碼</button>
                </div>
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
                        <label for="email">電子信箱</label>
                    <validation-provider name="電子信箱" :rules="{required:true,email:true}" v-slot="{ errors }">
                        <input v-model="form.user.email"
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="example@mail.com"
                                :class="{'is-invalid' : errors[0]}">
                        <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                    </div>
                    <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                    <label for="name">收件人姓名</label>
                                    <validation-provider name="姓名" rules="required" v-slot="{ errors }">                                    
                                        <input v-model="form.user.name"
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                placeholder="請輸入姓名"
                                                :class="{'is-invalid' : errors[0]}">
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </validation-provider>
                                </div>
                            </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="tel">收件人電話</label>
                                <validation-provider name="電話" rules="required" v-slot="{ errors }">                                    
                                    <input v-model="form.user.tel"
                                            type="tel"
                                            class="form-control"
                                            id="tel"
                                            placeholder="請輸入電話"
                                            :class="{'is-invalid' : errors[0]}">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </validation-provider>                            
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address">收件地址</label>
                        <validation-provider name="地址" rules="required" v-slot="{ errors }">                                    
                            <input v-model="form.user.address"
                                    type="text"
                                    class="form-control"
                                    id="address" 
                                    placeholder="請輸入地址"
                                    :class="{'is-invalid' : errors[0]}">
                            <span class="text-danger">{{ errors[0] }}</span>                        
                        </validation-provider>                            
                    </div>
                    <div class="form-group ">
                        <label for="msg">備註</label>
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
    data(){
        return{
            carts:[],
            isUpdating: false,
            couponCode: '',
            form:{
                user: {
                    name: "",
                    email: "",
                    tel: "",
                    address: ""
                },
                message: ""
            },
            isLoading: false,
        }
    },
    methods:{
        getCarts(){
            const vm = this;
            vm.isUpdating = true;
            vm.isLoading = true;
            const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;

            vm.$http.get(api)
            .then( response =>{
                console.log(response);

                vm.carts = response.data.data;
                vm.isUpdating = false;
                vm.isLoading = false;
            })
        },
        removeCart(id){
            const vm = this;
            const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`;

            vm.$http.delete(api)
            .then(response =>{
                this.$bus.$emit('reupdateCarts');
                vm.getCarts();
            })
        },
        useCoupon(){
            const vm = this;
            const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`;

            vm.$http.post(api,{data:{code:vm.couponCode}})
            .then(response=>{
                console.log(response);
                vm.getCarts();
            })
        },
        submitOrder(){
            const vm = this;
            const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order`;

            vm.$http.post(api,{data:vm.form})
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                vm.$router.push(`/order-confirm/${response.data.orderId}`)
                }
            })
        }
    },
    created(){
        this.getCarts();
    }
}
</script>

<style lang="scss" scoped>


</style>