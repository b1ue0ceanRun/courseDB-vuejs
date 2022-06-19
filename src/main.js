// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import qs from 'qs';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.qs = qs
Vue.use(Element, { size: 'small' })


//全局挂载axios
Vue.prototype.$axios= axios

Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  components: { App },
  template: '<App/>'
})
