import { EVENT_CENTER_ENUM, eventCenter } from '@/lib/eventCenter'
import { router } from './router'

/**
 * 移除所有路由
 */
const removeAllRoute = () => {
  const routes = router.getRoutes()
  routes.forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name)
    }
  })
}

let isRedirecting = false

/**
 * 跳转前往登录页
 */
const redirectLogin = () => {
  try {
    if (isRedirecting) return

    const currentRoute = router.currentRoute.value

    if (currentRoute.path === '/login') {
      return
    }

    isRedirecting = true
    removeAllRoute()
    router.push('/login')
  } finally {
    isRedirecting = false
  }
}

/**
 * 注册route相关的一些全局事件
 */
export const registRouterGlobalEvent = () => {
  /**
   * 注册 【跳转登录页】 全局事件
   */
  eventCenter.on(EVENT_CENTER_ENUM.GO_LOGIN, redirectLogin)
}
