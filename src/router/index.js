import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/'
import login from '../views/login/login.vue'
import homea from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: homea
      }, {
        path: 'comment', // 完整 相对
        component: () => import('../views/comment')
      }, {
        path: 'material',
        component: () => import('../views/material')
      }, {
        path: 'articles', // 文章列表
        component: () => import('../views/articles')
      }, {
        path: 'publish', // 发布文章
        component: () => import('../views/publish')
      }, {
        path: 'publish/:articleId', // 修改文章
        component: () => import('../views/publish')
      },
      {
        path: 'userinfo', // 修改文章
        component: () => import('../views/account')
      }]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //按需加载解决首屏加载慢的问题；
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
