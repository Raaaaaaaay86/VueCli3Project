<template>
  <div>
    <!--Carousel-->
    <div class="row">
      <div class="carousel w-100 slide carousel-fade" id="carouselExampleCaptions" data-ride="carousel" data-interval="100000">
        <div class="carousel-inner">
          <div class="carousel-item">
            <div
              :style="{ backgroundImage: 'url(' + require('@/assets/imgs/carousel0102.jpg') + ')' }"
              class="carousel-img bg-cover"
            >
            <div class="circleBtn">
              <p>2020</p>
              <p>A/W 全新系列</p>
            </div>
            </div>
          </div>
          <div class="carousel-item active">
            <div
              :style="{ backgroundImage: 'url(' + require('@/assets/imgs/carousel0202.jpg') + ')' }"
              class="carousel-img bg-cover"
            >
            <div class="slideQuote">
            <p>世界上,</p>
            <p>只有你最了解自己</p>
            <button class="btn btn-primary">了解更多</button>
            </div>
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
    <!--CAROUSEL & QUOTE-->
    <div class="my-30 my-md-150">
      <!--QUOTE-->
      <div class="row mb-5">
        <div class="col text-center">
          <p class="quote mb-0">
            " 時尚易逝，風格永存。"
            <br />
            <span class="font-italic h4">- Gabrielle Bonheur Claire</span>
          </p>
        </div>
      </div>
      <!--SLICK CAROUSEL-->
      <div class="slider">
        <div class="item d-flex justify-content-center" v-for="product in randomProducts" :key="product.id">
          <div class="d-flex flex-column align-items-center justify-content-center" style="width:270px;">
            <div class="bg-cover" style="width:100%;height:270px" :style="{ backgroundImage: 'url(' + product.imageUrl + ')' }"></div>
          </div>
        </div>
      </div>
    </div>
    <!--CUBE-->
    <div class="mb-30 mb-md-150">
      <div class="row no-gutters">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="bg-cover head01" style="height:280px"></div>
        </div>
        <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <p class="h2">CLAIRE's代表的是...</p>
          <p>一種歷久彌新的獨特風格。</p>
          <router-link to="/products/all" tag="button" class="btn btn-sm btn-outline-primary">了解更多</router-link>
        </div>
      </div>
      <div class="row no-gutters d-flex flex-row-reverse">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="bg-cover head02" style="height:280px"></div>
        </div>
        <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <p class="h2">CLAIRE's 的精神宗旨</p>
          <p>追求美麗的權利 人人公平</p>
          <router-link to="/about-claires" tag="button" class="btn btn-sm btn-outline-primary">點我閱讀</router-link>
        </div>
      </div>
    </div>
    <!--QUOTE-->
    <div class="row mb-30 d-flex justify-content-center">
      <div class="col-10 col-md-6 text-center" style="border-bottom: 3px solid black;">
        <p class="h3">為您量身打造的產品</p>
      </div>
    </div>
    <!--Recommend-->
    <div class="row no-gutters">
      <div class="col-md-9">
        <div class="productIntro-img bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/imgs/make01.jpg') + ')' }"></div>
      </div>
      <div class="col-md-3">
        <div class="productIntro my-3">
          <div class="productIntro-title mb-1 d-flex flex-column">
            <p>唇彩系列</p>
          </div>
          <div class="productIntro-content text-primary d-flex flex-column">
            <p class="mb-0">質地滑順 接觸雙唇完美融合</p>
            <p class="mb-0">讓人愛不釋手</p>
          </div>
          <router-link to="/products/lip" tag="button" class="mt-3 btn btn-outline-primary">發現更多</router-link>
        </div>
      </div>
    </div>
    <div class="row no-gutters d-flex flex-row-reverse mt-15 mt-md-30">
      <div class="col-md-9">
        <div class="productIntroReverse-img bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/imgs/make03.jpg') + ')' }"></div>
      </div>
      <div class="col-md-3">
        <div class="productIntroReverse my-3">
          <div class="productIntroReverse-title mb-1 d-flex flex-column">
            <p>腮紅系列</p>
          </div>
          <div class="productIntroReverse-content text-primary d-flex flex-column">
            <p class="mb-0">一抹瑕疵秒神隱 遠觀近看都無懈可擊</p>
            <p class="mb-0">重回自信光彩</p>
          </div>
          <router-link to="/products/blush" tag="button" class="mt-3 btn btn-outline-primary">發現更多</router-link>
        </div>
      </div>
    </div>
    <div class="row no-gutters mt-15 mt-md-30 mb-30">
      <div class="col-md-9">
        <div class="productIntro-img bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/imgs/make02.jpg') + ')' }"></div>
      </div>
      <div class="col-md-3">
        <div class="productIntro my-3">
          <div class="productIntro-title fornail mb-1 d-flex flex-column">
            <p>指彩系列</p>
          </div>
          <div class="productIntro-content text-primary d-flex flex-column">
            <p class="mb-0">顏色繽紛飽滿 光亮持久</p>
            <p class="mb-0">展現個人魅力</p>
          </div>
          <router-link to="/products/nail" tag="button" class="mt-3 btn btn-outline-primary">發現更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    getRandomProducts() {
      this.$store.dispatch('getRandom');
    },
  },
  computed: {
    randomProducts() {
      return this.$store.state.ProductsModule.randomCarousel;
    },
  },
  created() {
    this.getRandomProducts();
    window.scrollTo(0, 0);
  },
  updated() {
    $(document).ready(() => {
      $('.slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });

    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.quote {
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 29px;
  }
}

.productIntro {
  position: absolute;
  top: 20%;
  left: -15%;
  @media (max-width: 768px) {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    position: relative;
    top: 0px;
    left: 0px;
  }
  &-img {
    height: 400px;
  }
  &-title {
    font-size: 2.5rem;
    background-color: black;
    color: white;
    font-weight: 500;
    line-height: 1.2;
    width: 80%;
    .p {
      margin-bottom: 0.5rem;
    }
    @media (max-width: 995px) {
      font-size: 2rem;
      font-weight: 500;
      line-height: 1.2;
      width: 70%;
      .p {
        margin-bottom: 0.5rem;
      }
    }
    @media (max-width: 768px) {
      background-color: transparent;
      color: black;
      margin-bottom: 0.25rem;
    }
  }
  &-content {
    font-size: 18px;
    @media (max-width: 995px) {
      font-size: 16px;
    }
  }
}

.productIntroReverse {
  position: absolute;
  top: 20%;
  right: -35%;
  @media (max-width: 768px) {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    position: relative;
    top: 0px;
    left: 0px;
  }
  &-img {
    height: 400px;
  }
  &-title {
    font-size: 2.5rem;
    background-color: black;
    color: white;
    font-weight: 500;
    line-height: 1.2;
    width: 65%;
    .p {
      margin-bottom: 0.5rem;
    }
    @media (max-width: 995px) {
      font-size: 2rem;
      font-weight: 500;
      line-height: 1.2;
      width: 60%;
      .p {
        margin-bottom: 0.5rem;
      }
    }
    @media (max-width: 768px) {
      background-color: transparent;
      color: black;
      margin-bottom: 0.25rem;
    }
  }
  &-content {
    font-size: 18px;
    @media (max-width: 995px) {
      font-size: 16px;
    }
  }
}

.fornail {
  width: 100% !important;
  @media (max-width: 995px) {
    width: 85% !important;
  }
}

.head01 {
  background-image: url(../../assets/imgs/head01.jpg);
}

.head02 {
  background-image: url(../../assets/imgs/head02.jpg);
}

.carousel {
  &-img{
    height: 500px;
    @media(max-width: 768px) {
      height: 350px;
    }
  }
}

.circleBtn {
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: #fff;
  border: 1px solid lightgrey;
  transition: 0.3s;
  position: absolute;
  top: 40%;
  left: 75%;
  p {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 0;
  }
  @media (max-width: 960px) {
    left: 66%;
  }
  @media (max-width: 576px) {
    width: 110px;
    height: 110px;
    top: 55%;
    left: 10%;
    p{
      font-size: 14px;
    }
  }
  &:hover {
    transform: scale(1.02) translate(-5px,-5px);
    box-shadow: 0px 0px 10px black;
  }
}

.slideQuote {
  width: 260px;
  height: 130px;
  position: absolute;
  top:20%;
  left:15%;
  transition: all 0.3s;
  p {
    margin-bottom: 0px;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    color: white;
    &:last-of-type{
      margin-bottom: 0.5em;
    }
  }
  @media(max-width: 768px) {
    top: 10%;
    left: 6%;
    p {
      font-size: 24px;
    }
  }
  @media (max-width: 576px) {
    left: 10%;
  }
}
</style>
