import { RouteRecordRaw } from 'vue-router'

const Index = () => import('@/views/SFC/Index/Index.vue')
const List = () => import('@/views/SFC/List/Index.vue')
const Element = () => import('@/views/SFC/Element/Index.vue')
const LifeCycle = () => import('@/views/SFC/LifeCycle/Index.vue')

export const SFCRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '主页',
      isShow: true
    },
    component: Index
  },
  {
    path: '/list',
    meta: {
      title: '列表页',
      isShow: true
    },
    component: List
  },
  {
    path: '/element',
    meta: {
      title: 'element-ui页',
      isShow: true
    },
    component: Element
  },
  {
    path: '/life-cycle',
    meta: {
      title: '生命周期页',
      isShow: true
    },
    component: LifeCycle
  }
]
