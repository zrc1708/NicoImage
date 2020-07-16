import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css'

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888'
// axios接口调用前的拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.defaults.withCredentials= true//允许跨域时携带cookie
Vue.prototype.$http = axios

// // vue拦截器
// Vue.http.interceptors.push(function(request,next) {
//   request.credentials = true
//   next(function(response){
//     return response
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
