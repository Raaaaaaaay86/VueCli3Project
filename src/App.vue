<template>
<div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view />
</div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";

.bg-cover {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-contain {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
