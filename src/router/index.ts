import { createWebHistory, createRouter } from 'vue-router'
import { SFCRouter } from './sfcRouter'
import { TSXRouter } from './tsxRouter'
const history = createWebHistory()



const router = createRouter({
  history,
  routes: [
    ...SFCRouter,
    ...TSXRouter
  ]
})

export default router
