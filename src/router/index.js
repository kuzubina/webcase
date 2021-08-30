import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty' },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Registration.vue'),
  },
  {
    path: '/login',
    name: 'authorization',
    meta: { layout: 'empty' },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const localData = localStorage.getItem('auth')
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (requireAuth && !localData) {
    next('/login')
  } else {
    next()
  }
})

export default router
