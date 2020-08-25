<template>
    <div>
        <!--NAVBAR-->
        <div class="sticky-top">
        <navbar v-on:logout="logout"/>
        </div>

        <div class="container-fluid">
            <div class="row">
            <!--SIDEBAR-->
            <side-menu/>
            </div>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
            </main>
        </div>

        <div style="position: absolute; top: 70px; right: 35px;z-index:1010;">
            <!-- Then put toasts within -->
            <div class="toast hide" style="min-width:300px;" data-delay="5000" id="myToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header " :class="{lightGreen :　isSuccess, lightRed : !isSuccess}">
                    <strong class="mr-auto">系統提示</strong>
                    <i class="fas fa-comment-dots mr-3"></i>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body" :class="{lightGreen09 :　isSuccess, lightRed09 : !isSuccess}">
                    {{message}}
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
// 產品列表 訂單列表 優惠券 
import Navbar from './components/dashNavbar.vue';
import SideMenu from './components/dashSideMenu.vue';
import $ from 'jquery';
export default {
    data(){
        return {
            isSticky: false,
            isShowing: false,
            isSuccess: true,
            message:'此為預設系統提示'
        }
    },
    components:{Navbar,SideMenu},
    methods:{
        logout(){
            const vm = this;
            const api = `${process.env.VUE_APP_API}/logout`;

            vm.$http.post(api)
            .then(response =>{
                if(response.data.success){
                    vm.$router.push('/');
                }
            });
        },
        showToast(success,msg){
            const vm = this;
            vm.isShowing = true;
            success ? vm.isSuccess = true : vm.isSuccess = false;
            vm.message = msg;

            $('#myToast').toast('show');
        }
    },
    created(){
        this.$bus.$on('popToast', (success,msg)=>{
            this.showToast(success,msg);
        })
    }
}
</script>

<style lang="scss" scoped>

.lightRed{
    background-color: #ed969e;
    &09{
        background-color: rgba(#ed969e,.9);
    }
}

.lightGreen{
    background-color: #9ed6ac;
    &09{
        background-color: rgba(#9ed6ac,.9);
    }
}

</style>