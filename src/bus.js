import Vue from 'vue';

Vue.prototype.$bus = new Vue();

//    this.$bus.$on('popToast', (success,msg)=>{
//         this.showToast(success,msg);
//     })

//  vm.$bus.$emit('popToast',response.data.success,response.data.message)

//                this.$bus.$emit('reupdateCarts')
