import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

import {store} from '@/components/store/store.js'

var beforeEnterAuth = (to, from, next) => {
  console.log(to)
  console.log(store)
  console.log('route isAuth', store.getters.isAuth)
  store.dispatch('tryLogin')
  if (store.getters.isAuth){
    if (to.path == '/login')
      next('/')
    next()
  }else{
    next('/login') 
  }
}

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    beforeEnter (to, from, next) {
      beforeEnterAuth(to, from, next)
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
