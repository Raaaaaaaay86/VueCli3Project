<template>
    <div>
        <div class="container">
            
            <!--LOGO-->
            <router-link to="/" class="row mt-3 d-none d-md-flex justify-content-center">
               <img height="39" class="text-dark" src="../../../assets/imgs/cocologo.svg" alt="">            
            </router-link>
            <!--NavBar-->
            <div :class="{'sticky-top' : isSticky}">
            <Navbar/>
            </div>

            <router-view></router-view>

        </div>
        <!--FOOTER-->
        <Footer/>
    </div>
</template>

<script>
import $ from 'jquery';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer';

export default {
    data(){
        return{
            isSticky:true,
        }
    },
    components:{Navbar,Footer},
    created(){
        let path = this.$route.path.split('/')

        if(path[1] === 'admin'){
            this.isSticky = false;
        }
    
    }
}

</script>

<style lang="scss">



.circleBtn{
    border: 1px solid lightgrey;
    transition: .3s; 
    &:hover{
    box-shadow:0px 0px 10px black;
    }
}

</style>