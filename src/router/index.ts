import { RouteRecordRaw } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router'
import { SFCRouter } from './sfcRouter'
import { TSXRouter } from './tsxRouter'

const ErrorViews = () => import('@/views/error/Index.vue')
const Login = () => import('@/views/logins/Index.vue')

console.log(Login)

const history = createWebHistory()

const routerOption: Array<RouteRecordRaw> = [ {
  path: '/404',
  meta: {
    title: '未知页面',
    isShow: true,
    isHideHeader: true
  },
  component: ErrorViews
}, {
  path: '/login',
  meta: {
    title: '登录页',
    isShow: true,
    isHideHeader: true
  },
  component: Login
}]

const router = createRouter({
  history,
  routes: [
    ...routerOption,
    ...SFCRouter,
    ...TSXRouter
  ]
})

export default router
