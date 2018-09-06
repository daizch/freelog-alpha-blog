import VueRouter from 'vue-router'
import Vue from 'vue'
import Layout from './pages/layout/index.vue';
import Archives from './pages/archives/index.vue';
import Article from './pages/article/index.vue';
import AboutMe from './pages/aboutme/index.vue';
import TagsArticles from './pages/tags-articles/index.vue';
import Home from './pages/home/index.vue'

Vue.use(VueRouter)


const routes = [{
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: Home
    },
    {
      path: 'archives',
      component: Archives
    },
    {
      path: 'tags/:tag',
      component: TagsArticles
    },
    {
      path: 'article/:articleId',
      component: Article
    },
    {
      path: 'about',
      component: AboutMe
    }
  ]
}]

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes
});


export default router

