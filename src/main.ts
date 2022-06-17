import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router as any)
app.use(ElementPlus as any)

app.mount('#app')
