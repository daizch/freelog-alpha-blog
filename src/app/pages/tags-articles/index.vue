<template>
  <div class="blog-archives-view">
    <articles :articles="articles"></articles>
  </div>
</template>

<script>
  import Articles from '../../components/articles/index.vue'
  import {loadPresentablesByTags} from '../../data'

  export default {
    name: 'blog-tags-articles',
    data: function () {
      return {
        articles: []
      }
    },
    components: {
      Articles
    },
    mounted() {
      this.render()
    },
    methods: {
      render() {
        loadPresentablesByTags(this.$route.params.tag)
          .then((articles) => {
            this.articles = articles
          })
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>
