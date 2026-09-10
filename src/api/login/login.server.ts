import { request } from '@/lib/request/request'
import type { UserLoginVO } from './login.typs'

/**
 * 登录接口
 */
export const userLogin = (data: { userName: string; password: string }) => {
  return request<UserLoginVO>({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}
