import { RouteRecordRaw } from 'vue-router'
const Index = () => import('../views/TSX/Index/Index')
const List = () => import('../views/TSX/List/Index')
const Element = () => import('../views/TSX/Element/Index')
// const LifeCycle = () => import('@/views/TSX/LifeCycle/Index.vue')

export const TSXRouter: Array<RouteRecordRaw> = [
  {
    path: '/index-tsx',
    meta: {
      title: '主页',
      isShow: true
    },
    component: Index
  },
  {
    path: '/list-tsx',
    meta: {
      title: '列表页-tsx',
      isShow: true
    },
    component: List
  },
  {
    path: '/element-tsx',
    meta: {
      title: 'element-ui页-tsx',
      isShow: true
    },
    component: Element
  },
  // {
  //   path: '/life-cycle',
  //   meta: {
  //     title: '生命周期页',
  //     isShow: true
  //   },
  //   component: LifeCycle
  // }
]
