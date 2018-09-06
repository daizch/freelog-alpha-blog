<template>
  <div class="blog-article-view">
    <article-viewer :data="article" @reload="render"></article-viewer>
  </div>
</template>


<script>
  import {onloadArticleContent} from '../../data'
  import ArticleViewer from '../../components/article-viewer/index.vue'

  export default {
    name: 'blog-article',
    data: function () {
      return {
        article: {
          tags: [],
          content: ''
        }
      }
    },
    components: {ArticleViewer},
    mounted() {
      this.render()
    },
    methods: {
      render() {
        if (!this.$route.params.articleId) {
          return
        }
        onloadArticleContent(this.$route.params.articleId).then(article => {
          this.article = article
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
