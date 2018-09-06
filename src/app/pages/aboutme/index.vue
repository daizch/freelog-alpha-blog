<template>
  <div class="blog-about-me-view">
    <article-viewer :data="article" @reload="render"></article-viewer>
  </div>
</template>

<script>
  import {onloadAboutMe} from '../../data';
  import ArticleViewer from '../../components/article-viewer/index.vue';

  export default {
    name: 'blog-about-me',
    data: function () {
      return {
        article: {
          content: '',
          tags: []
        }
      }
    },
    components: {ArticleViewer},
    mounted() {
      this.render()
    },
    methods: {
      render() {
        onloadAboutMe((article) => {
          this.article = article
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>

<style>
  .blog-about-me-view .about-me-md-content {
    margin-right: 180px;
  }
</style>
