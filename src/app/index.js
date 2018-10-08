import Vue from 'vue'
import router from './router'
import './index.less'
import App from './pages/app'

var template = require('./index.html');

class FreelogAlphaBlog extends HTMLElement {
  constructor() {
    super()
  }

  initApp() {
    var app = new Vue({
      el: '#freelog-alpha-blog-app',
      router,
      template: '<App/>',
      components: {App}
    })
  }

  connectedCallback() {
    this.innerHTML = template
    this.initApp()
  }
}


customElements.define('freelog-alpha-blog', FreelogAlphaBlog);
