<template>
  <div class="blog-archives-view">
    <articles :articles="articles"></articles>
  </div>
</template>

<script>
  import Articles from '../../components/articles/index.vue'
  import {onloadArticles} from '../../data'

  export default {
    name: 'blog-archives',
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
      render(){
        onloadArticles((articles)=>{
          this.articles = articles || []
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>
