import { RouteRecordRaw } from 'vue-router'
const Index = () => import('@/views/TSX/Index/Index.tsx')
// const List = () => import('@/views/TSX/List/Index.vue')
// const Element = () => import('@/views/TSX/Element/Index.vue')
// const LifeCycle = () => import('@/views/TSX/LifeCycle/Index.vue')
console.log(Index)
export const TSXRouter: Array<RouteRecordRaw> = [
  {
    path: '/tsx-index',
    meta: {
      title: '主页',
      isShow: true
    },
    component: Index
  }
  // {
  //   path: '/list',
  //   meta: {
  //     title: '列表页',
  //     isShow: true
  //   },
  //   component: List
  // },
  // {
  //   path: '/element',
  //   meta: {
  //     title: 'element-ui页',
  //     isShow: true
  //   },
  //   component: Element
  // },
  // {
  //   path: '/life-cycle',
  //   meta: {
  //     title: '生命周期页',
  //     isShow: true
  //   },
  //   component: LifeCycle
  // }
]
