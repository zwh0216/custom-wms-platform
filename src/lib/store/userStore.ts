import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserLoginVO } from '@/api/login/login.typs'

/**
 * 全局用户信息
 * token 已单独缓存在本地存储中，这里不再重复保存
 */
export type UserInfo = Omit<UserLoginVO, 'token'>

/**
 * 用户信息全局状态
 */
export const useUserStore = defineStore('user', () => {
  // 当前登录用户信息
  const userInfo = ref<UserInfo | null>(null)

  // 登录成功后保存用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  // 退出登录或登录失效时清空用户信息
  const clearUserInfo = () => {
    userInfo.value = null
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
  }
})
