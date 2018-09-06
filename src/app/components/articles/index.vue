<template>
  <div class="article-list-wrap">
    <ul class="archives">
      <li class="archive-article" v-for="article in articles">
        <div class="archive-article-inner">
          <header class="archive-article-header">
            <h1>
              <div class="article-meta">
                <a href="" class="archive-article-date">
                  <i class="date-icon icon"></i>
                  <time :datetime="article.updateDate">{{formatDate(article.updateDate)}}</time>
                </a>
              </div>
              <router-link :to="'/article/'+article.presentableId" class="archive-article-title">
                <i class="article-icon icon"></i>{{article.presentableName}}</router-link>
            </h1>

            <div class="article-info clearfix" v-if="article.resourceInfo&&article.resourceInfo.meta">
              <tags class="archive-tags" :tags="article.resourceInfo.meta.tags || []"></tags>
            </div>
          </header>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment'
  import Tags from '../tags/index'
  export default {
    name: 'article-list',
    data() {
      return {}
    },
    props: {
      articles: Array
    },
    components: {
      Tags
    },
    mounted() {

    },
    methods: {
      formatDate(date){
        return moment(date).format('MMM D')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
