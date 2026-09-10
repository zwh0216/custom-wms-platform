import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router, registRouterGlobalEvent } from '@/router/index.ts'

const init = () => {
  const app = createApp(App)

  // 初始化路由
  app.use(router)
  registRouterGlobalEvent() // 注册route相关的一些全局事件

  app.mount('#app')
}

init()
