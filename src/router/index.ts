import { RouteRecordRaw } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  //   {
  //   path: '/',
  //   meta: {
  //     title: '主页',
  //     isShow: true,
  //     isHideHeader: true
  //   },
  //   component: Index
  // }
]

const router = createRouter({
  history,
  routes
})

export default router
