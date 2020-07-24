import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css'

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'http://imgapi.jibei66.com'

// axios接口调用前的拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

import Cookies from 'js-cookie'
Vue.prototype.$cookie = Cookies

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
