import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { redirectAlreadyLogin: true },
    component: () => import(/* webpackChunkName: "login" */'../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {},
    component: () => import(/* webpackChunkName: "register" */'../views/Register.vue')
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () => import(/* webpackChunkName: "column" */'../views/ColumnDetail.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */'../views/PostDetail.vue')
  },

  {
    path: '/create',
    name: 'create',
    meta: { requiredLogin: true },
    component: () => import(/* webpackChunkName: "post" */'../views/CreatePost.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  const isLogin = user.isLogin
  if (isLogin) {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      store.dispatch('fetchUserInfo').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        store.commit('logout')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  }
})

export default router
