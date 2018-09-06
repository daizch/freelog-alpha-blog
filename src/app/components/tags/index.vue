<template>
  <div class="article-tags" v-if="tagList.length">
    <i class="tags-icon icon"></i>
    <ul class="article-tag-list clearfix">
      <li class="article-tag-item" v-for="tag in tagList">
        <router-link :to="tag.link" :class="[tag.colorCls]">{{tag.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'article-tags',
    data() {
      return {}
    },
    props: {
      tags: Array
    },
    computed: {
      tagList() {
        if (!this.tags || !this.tags.length) {
          return []
        }
        return this.tags.map((tag, i) => {
          return {
            name: tag,
            colorCls: `color${i%4+1}`,
            link: '/tags/' + encodeURIComponent(tag)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
