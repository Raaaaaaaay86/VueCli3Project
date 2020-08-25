<template>
    <div class="mt-5">

    <form class="form-signin" @submit.prevent="login">
    <h1 class="h3 mb-3 font-weight-normal text-center">管理後台</h1>
    <label for="inputEmail" class="sr-only" >電子信箱</label>
    <input v-model="form.username"  type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
    <label for="inputPassword" class="sr-only">密碼</label>
    <input v-model="form.password" type="password" id="inputPassword" class="form-control mb-0" placeholder="Password" required>
    <p class="text-danger h6 my-2">{{message}}</p>
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> 記住我
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2020 Aug</p>
     </form>

    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:'',
                password:'',
            },
            message:'',
        }
    },
    methods:{
        login(){
            const vm = this;
            const api =`${process.env.VUE_APP_API}/admin/signin`;

            vm.$http.post(api,vm.form)
            .then( response =>{
                if(response.data.success){
                    vm.$router.push('/admin');
                }else{
                    vm.message = response.data.message + ' 請重新登入';
                }
            })
        }
    },

}
</script>


<style lang="scss" scoped>

html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>