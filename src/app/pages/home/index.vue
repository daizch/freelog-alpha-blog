<template>
  <div class="blog-archives-view">
    <ul class="post-list">
      <li class="post-item" v-for="article in articles" @click="gotoArticleViewHandler(article)">
        <div class="post-list-item-container">
          <div class="post-label">
            <div class="post-title">
              <span class="post-anchor">#</span>
              {{article.presentableName}}
            </div>
            <div class="post-meta clearfix">
              <div class="post-meta-date">{{formatDate(article.updateDate)}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment'
  import Articles from '../../components/articles/index.vue'
  import {onloadArticles} from '../../data'


  export default {
    name: 'blog-home',
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
      formatDate(date) {
        return moment(date).format('MMM D,YYYY')
      },
      render() {
        onloadArticles((articles) => {
          this.articles = articles || []
        })
      },
      gotoArticleViewHandler(article){
        this.$router.push(`/article/${article.presentableId}`)
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "index.less";
</style>
