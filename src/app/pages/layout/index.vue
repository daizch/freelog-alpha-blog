<template>
  <div class="blog-app-view">
    <aside class="nav-bar-side">
      <nav-bar></nav-bar>
    </aside>
    <main class="main-view">
      <transition name="slide-fade">
        <router-view class="body-view-wrap"></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  import NavBar from '../../components/nav-bar/index.vue'

  export default {
    name: 'blog-layout',
    data: function () {
      return {}
    },
    components: {
      NavBar
    },
    mounted() {
    },

    methods: {}
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>
