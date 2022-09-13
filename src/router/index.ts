import { RouteRecordRaw } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router'

const EquilibriumAnalysis = () => import('@/views/equilibriumAnalysis/Index.vue')
const PurchasedElectricity = () => import('@/views/purchasedElectricity/Index.vue')

const history = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    name:'EquilibriumAnalysis',
    path: '/equilibrium-analysis',
    meta: {
      title: '平衡分析',
      // isShow: true,
      // isHideHeader: true
    },
    component: EquilibriumAnalysis
  },
  {
    name:'PurchasedElectricity',
    path: '/purchased-electricity',
    meta: {
      title: '外购电决策'
    },
    component: PurchasedElectricity
  },

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
