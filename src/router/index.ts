import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './route'
import { LOCAL_STORAGE_KEY, ls } from '@/lib/localStorage'

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

/**
 * 路由守卫
 */
router.beforeEach((to) => {
  if (to.meta.requiredAuth) {
    const token = ls.getStorage(LOCAL_STORAGE_KEY.token)

    // 没有token，跳转到登录页面
    if (!token) {
      return {
        path: '/login',
      }
    }
  }

  // return to
})
