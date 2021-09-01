import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const Index = () => import('@/views/Index/Index.vue')
const List = () => import('@/views/List/Index.vue')
const Element = () => import('@/views/Element/Index.vue')

const router = createRouter({
  history,
  routes: [
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
    }
  ]
})

export default router
