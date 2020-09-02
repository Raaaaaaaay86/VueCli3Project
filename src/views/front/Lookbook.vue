<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <div
          class="w-100 bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/head03.jpg') + ')' }"
          style="height:500px;"
        >
          <div class="header-txt position-absolute">
            <p class="h1 font-weight-bolder">2020 A/W</p>
            <p class="h1 font-weight-bolder">全新系列 令人驚艷</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-5 d-flex justify-content-center ">
      <div class="col-md-8 d-flex flex-column align-content-center">
        <p class="h1 text-center">美妝指標雜誌評鑑第一</p>
        <p class="mb10 text-center">
          <em>
            「不易掉色，持久度高，現在才發現 CLAIRE's
            實在是相見恨晚，絕對是今年開架化妝品銷售排行榜冠軍 ..... !」
          </em>
        </p>
        <p class="text-center">— <strong>kirakira Magzinge 主編輯 Sammy</strong></p>
      </div>
    </div>

    <div class="row no-gutters">
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
        <div
          class="bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/human02.jpg') + ')' }"
          style="height:400px;"
        ></div>
      </div>
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
        <div
          class="bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/human0202.jpg') + ')' }"
          style="height:400px;"
        ></div>
      </div>
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
        <div
          class="bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/human0203.jpg') + ')' }"
          style="height:400px;"
        ></div>
      </div>
    </div>

    <div class="row my-5 d-flex justify-content-center ">
      <div class="col-md-8 d-flex flex-column align-content-center">
        <p class="h1 text-center">反對動物實驗</p>
        <p class="mb10 text-center">
          CLAIRE's 堅決反對任何形式動物實驗，不讓美麗染上大自然的傷痕
        </p>
      </div>
    </div>

    <div class="row" data-aos="fade-up">
      <div class="col">
        <div
          class="bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/animal01.jpg') + ')' }"
          style="height:500px;"
        ></div>
      </div>
    </div>

    <div class="row my-5 d-flex justify-content-center ">
      <div class="col-md-8 d-flex flex-column align-content-center">
        <p class="h1 text-center">我們的頂尖夥伴</p>
        <p class="mb10 text-center">
          CLAIRE's 的產品設計團隊，皆在業界擁有超過15年經驗，值得您的信賴
        </p>
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-4 d-flex flex-column align-items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div
          class="mb-3 rounded-circle bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/profile02.jpg') + ')' }"
          style="width:150px;height:150px;"
        ></div>
        <p class="h5 mb-3">Mishy 老師</p>
        <p class="px-5 text-center">
          Mishy 老師經歷豐富，擅長氣質、典雅的風格，細緻的造型技巧，讓每位新娘都美的天生麗質。
          每一個造型都是全力以赴！ Mishy老師的手，創造無數個美麗女人出現在這世界上。
        </p>
      </div>

      <div
        class="col-md-4 d-flex flex-column align-items-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          class="mb-3 rounded-circle bg-cover"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/profile01.jpg') + ')' }"
          style="width:150px;height:150px;"
        ></div>
        <p class="h5 mb-3">Sam 總監</p>
        <p class="px-5 text-center">
          Sam
          總監曾在各大頒獎典禮擔任彩妝師已有多年經歷！變化不同風格是他擅長的，自然且清透的妝容也是他喜愛的風格。如今轉戰化妝品業界，也是十分得心應手，了解每位顧客需求。
        </p>
      </div>

      <div
        class="col-md-4 d-flex flex-column align-items-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div
          class="mb-3 rounded-circle bg-cover test"
          :style="{ backgroundImage: 'url(' + require('@/assets/imgs/lookbook/profile03.jpg') + ')' }"
          style="width:150px;height:150px;"
        ></div>
        <p class="h5 mb-3">Kimmy 老師</p>
        <p class="px-5 text-center">
          Kimmy
          老師畢業於英國Mastered彩妝學院，她與其他化妝師不同的是，她追求的不只是漂亮，更擅長看出一個人的優點及一個人的美，並藉由彩妝描繪出來，創造出來一件件美麗的藝術作品。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  created() {
    window.scrollTo(0, 0);
    AOS.init();
  },
};
</script>

<style lang="scss" scoped>

.bg-nocover {
  background-position: center;
  background-repeat: no-repeat;
}

.bg-contain {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.header {
  &-txt {
    top: 15%;
    left: 100px;
    @media (max-width: 1185px) {
      top: 5%;
      left: 10%;

      p {
        font-size: 24px;
      }
    }
  }
}
</style>
