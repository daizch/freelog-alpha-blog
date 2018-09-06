<template>
  <div class="nav-bar-wrap">
    <div class="overlay" :style="postStyle"></div>
    <div class="intro-wrap">
      <header>
        <router-link to="/" class="profile-img">
          <img :src="blogConfig.avatarUrl" alt="" @load="onloadImage" class="avatar-img" v-if="blogConfig.avatarUrl">
        </router-link>
        <h1 class="author-name">
          <router-link to="/">{{blogConfig.name}}</router-link>
        </h1>
        <p class="header-subtitle">{{blogConfig.blogDesc}}</p>
        <nav class="nav-area">
          <ul>
            <li class="nav-item" v-for="nav in navs" :class="{current: nav.to === curPath}">
              <router-link :to="nav.to">{{nav.title}}</router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
  import {loadBlogConfig} from '../../data'

  export default {
    name: 'blog-nav-bar',
    data() {
      return {
        navs: [
          {
            title: 'Home',
            to: '/'
          },
          {
            title: 'Archives',
            to: '/archives'
          },
          {
            title: 'About Me',
            to: '/about'
          }
        ],
        blogConfig: {}
      }
    },

    mounted() {
      this.initView()
    },

    methods: {
      initView() {
        loadBlogConfig().then(data => {
          if (data && data.token) {
            var blogConfig;
            try {
              blogConfig = JSON.parse(data.content)
              blogConfig.avatarUrl = `/api/v1/auths/presentable/subResource/${blogConfig.avatar}?token=${data.token}`;
              blogConfig.postImageUrl = `/api/v1/auths/presentable/subResource/${blogConfig.postImage}?token=${data.token}`;
              this.setPageTitle(blogConfig.name)
            } catch (e) {
              blogConfig = {}
            }

            this.blogConfig = blogConfig
          }
        })
      },
      onloadImage(ev) {
        ev.target.classList.add('show')
      },
      setPageTitle(title) {
        // document.title = title
      }
    },

    computed: {
      curPath() {
        return this.$route.path
      },
      postStyle() {
        var style = {};
        if (this.blogConfig.postImageUrl) {
          style.backgroundImage = `url(${this.blogConfig.postImageUrl})`
        }
        return style
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
