// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils'
import store from './store'      // vuex
import iView from 'iview'         //iview
import 'iview/dist/styles/iview.css';    // 使用 CSS


Vue.use(iView)

Vue.prototype.API = process.env.API_URL;
Vue.prototype.URL_WEBSITE = process.env.URL_WEBSITE;  //资源站点Url

console.log(process.env.API_URL)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
