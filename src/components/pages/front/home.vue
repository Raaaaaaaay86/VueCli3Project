<template>
    <div>
            <!--Carousel-->
            <div class="row mt-3">
                <div id="carouselExampleCaptions" data-ride="carousel" data-interval="5000" class="carousel slide carousel-fade">
                    <div class="carousel-inner" >
                       <div class="carousel-item active" style="max-height:500px">
                            <img style="" 
                                src="../../../assets/imgs/carousel0102.jpg"
                                class="d-block w-100 position-relative" >
                            <!--ROUTER LINK-->
                            <a href="#" class="circleBtn rounded-circle d-none d-md-flex flex-column position-absolute"
                                style="top:40%;left:75%;">
                                <div class=" bg-white rounded-circle d-flex flex-column justify-content-center align-items-center"
                                style="width:150px;height:150px">
                                    <span class="text-center h6">2020<br>A/W LookBook</span>
                                </div>
                            </a>
                        </div>
                        <div class="carousel-item" style="max-height:500px">
                        <img style=""
                            src="../../../assets/imgs/carousel0202.jpg"
                            class="d-block w-100 position-relative">
                        <div class="d-none d-md-block text-white  position-absolute"
                        style="top:20%;left:15%">
                            <p class="mb-0 h2 font-weight-bold"><u>世界上</u> ,</p>
                            <p class="mb-3 h2 font-weight-bold"><u>只有你最了解自己</u></p>
                            <!--ROUTER LINK-->
                            <router-link to="/products/all" class="btn btn-secondary">了解更多</router-link>
                        </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <!--QUOTE-->
            <div class="row my-5">
                <div class="col text-center">
                <p class="quote mb-0">" 時尚易逝，風格永存。"<br><span class="font-italic h4">- Gabrielle Bonheur Claire</span></p>
                </div>
            </div>
            <!--OWL CAROUSEL-->
            <div class="row">
                <div class="col">
                <div class="owl-carousel owl-theme">
                    <div class="item" v-for="product in products" :key="product.id">
                    <img width="270" height="270" :src="product.imageUrl">
                    </div>
                </div>
                </div>
            </div>
            <!--QUOTE-->
            <div class="row my-3 d-flex justify-content-center">
                <div class="col-12 text-center">
                <p class="h3">選擇適合你的產品</p>
                </div>
                <div class="col-md-6 mt-3 d-flex justify-content-around ">
                <router-link tag="button" to="/products/lip" class="btn btn-lg btn-secondary ">唇彩</router-link>
                <router-link tag="button" to="/products/blush" class="btn btn-lg btn-secondary ">腮紅</router-link>
                <router-link tag="button" to="/products/nail" class="btn btn-lg btn-secondary">指彩</router-link>
                </div>
            </div>
            <!--CUBE-->
            <div class="row mt-5 no-gutters">
                <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <p class="h2">CLAIRE's代表的是...</p>
                    <p>一種歷久彌新的獨特風格。</p>
                    <router-link to="/products/all" tag="button" class="btn btn-sm btn-secondary">了解更多</router-link>
                </div>
                <div class="col-md-6 mb-3 mb-md-0">
                    <div class="bg-cover head01" style="height:300px"></div>
                </div>
            </div>
            <div class="row no-gutters d-flex flex-row-reverse">
                <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <p class="h2">CLAIRE's 的精神宗旨</p>
                    <p>追求美麗的權利 人人公平</p>
                    <button class="btn btn-sm btn-secondary">點我閱讀</button>
                </div>
                <div class="col-md-6">
                    <div class="bg-cover head02" style="height:300px"></div>
                </div>
            </div>
    </div>
</template>


<script>
import $ from 'jquery';

export default {
    data(){
        return{
            data:[],
            products:[],
        }
    },
    methods:{
        getProducts(page = 1){
            let vm = this;
            let api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products?page=${page}`;

            vm.$http.get(api)
            .then(response =>{
                    vm.products = response.data.products;
                    vm.products.sort(() => Math.random() - 0.5);
            })
        }
    },
    created(){
        this.getProducts();
    },
    updated(){
        
        $(document).ready(function(){
            $(".owl-carousel").owlCarousel({
                loop:true,
                margin:10,
                nav:false,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                smartSpeed:2000,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:4
                    }
                }
            });
        });
    }
}
</script>


<style lang="scss">
.quote{
    font-size: 32px;
    @media(max-width: 768px){
        font-size: 29px;
    }
}

.head01{
    background-image: url(../../../assets/imgs/head01.jpg);
}

.head02{
    background-image: url(../../../assets/imgs/head02.jpg);
}


</style>