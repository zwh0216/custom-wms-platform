import { request } from '@/lib/request/request'
import type { MenuVo } from './menu.types'

/**
 * 获取所有菜单
 */
export const findAllMenus = () => {
  return request<MenuVo[]>({
    url: '/menu/query',
    method: 'GET',
  })
}
