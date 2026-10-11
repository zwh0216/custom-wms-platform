import { request } from '@/lib/request/request'
import type {
  SalesOrderApiQuery,
  SalesOrderVo,
} from './sales-order.types'

/**
 * 查询销售订单列表
 */
export const querySalesOrders = (params: SalesOrderApiQuery) => {
  return request<SalesOrderVo[]>({
    url: '/sales-order/query',
    method: 'GET',
    params,
  })
}
