import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login" */'../views/Login.vue')
const Home = () => import(/* webpackChunkName: "home" */'../views/Home.vue')

Vue.use(VueRouter)

  const routes = [
    {path:'/',redirect:'/login'},
    {path: '/login',component: Login},
    {path: '/home',component: Home}
]

const router = new VueRouter({
  routes
})

export default router
