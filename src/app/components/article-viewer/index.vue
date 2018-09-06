<template>
  <div class="article-viewer" :class="{'has-toc-view': hasToc}">
    <header>
      <div class="article-tile">{{data.presentableName}}</div>
      <article-tags :tags="data.tags" class="article-tags"></article-tags>
    </header>
    <div class="article-content js-article-content">
      <div v-if="data.error && data.errorInfo" class="resource-error">
        <label>{{data.errorInfo.desc}}</label>
        <span class="resource-error-btn" @click="errorHandler(data)">{{data.errorInfo.tip}}</span>
      </div>
      <div class="loading" v-if="loading"></div>
    </div>
  </div>
</template>


<script>
  import MarkdownParser from '../../lib/markdown-parser'
  import ArticleTags from '../tags/index.vue'

  export default {
    name: 'blog-article-viewer',
    data() {
      return {
        loading: true,
        hasToc: false
      }
    },

    components: {ArticleTags},
    props: {
      data: {
        type: Object,
        default() {
          return {
            tags: [],
            content: null
          }
        }
      }
    },
    watch: {
      'data.content'() {
        this.render()
      }
    },
    mounted() {
      this.parser = new MarkdownParser({
        container: this.$el.querySelector('.js-article-content'),
        afterRender: (config) => {
          this.hasToc = !!config.tocs.length;
        }
      });

      this.render()
    },
    methods: {
      render() {
        if (!this.data || (!this.data.error && !this.data.content)) {
          return;
        }

        if (this.data.error) {
          this.data.errorInfo = window.FreeLogApp.getErrorInfo(this.data.error);
        } else {
          this.parser.render(this.data.content);
        }
        this.loading = false
      },
      errorHandler(data) {
        var contract = data.error.data.data.contract;
        var contractState = contract && contract.status
        window.FreeLogApp.handleErrorResponse(data.error, (presentable) => {
          if (presentable._contractStatus !== contractState) {
            this.$emit('reload', presentable)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style>
  .article-viewer .alpha-markdown-toc {
    top: 30px;
    right: 15px;
  }
</style>
