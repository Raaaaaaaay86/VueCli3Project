<template>
  <div>
    <div class="container">
      <!--LOGO-->
      <router-link to="/" class="row mt-3 d-none d-md-flex justify-content-center">
        <img height="39" class="text-dark" src="../../../assets/imgs/cocologo.svg" alt="" />
      </router-link>
      <!--NavBar-->
      <div :class="{ 'sticky-top': isSticky }">
        <Navbar />
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
    <!--FOOTER-->
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  data() {
    return {
      isSticky: true,
    };
  },
  components: { Navbar, Footer },
  created() {
    const path = this.$route.path.split('/');

    if (path[1] === 'admin') {
      this.isSticky = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.view{
  min-height: calc(100vh - 207px);
}
</style>
