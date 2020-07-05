import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/ShowInfo')
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import('../views/UpdateInfo')
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
