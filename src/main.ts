import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import '@globalUtils/rem.ts'
// 将echarts 挂载到Vue3原型
import * as echarts from 'echarts' 

import 'element-plus/dist/index.css'

import Components from './register/component'


const app = createApp(App)
//确保 _use_ 路由实例使

// 全局方法
app.config.globalProperties.$echarts = echarts
//整个应用支持路由。
app.use(router as any)
app.use(ElementPlus as any)
app.use(Components)

app.mount('#app')
