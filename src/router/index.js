import Vue from 'vue'
import VueRouter from 'vue-router'

import Homepage from '@/views/Homepage' //主页
import Login from "../views/Login" //登陆
import Register from "../views/Register"; //注册
import Upload from "../views/Upload";
import Content from "../views/Content"
import Public from "../views/Public"

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: Login
},
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }, {
    path: '/Homepage',
    name: 'Homepage',
    component: Homepage
  }, {
    path: '/upload/:id/',
    name: 'Upload',
    component: Upload
  }, {
    path: '/content/:id/',
    name: 'Content',
    component: Content
  }, {
    path: '/public',
    name: 'Public',
    component: Public
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
