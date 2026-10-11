/**
 * 销售订单审批状态，值与后端 ApprovalStatusEnum 保持一致。
 */
export const SALE_ORDER_STATUS = {
  pending: 'Pending',
  approving: 'Approving',
  approved: 'Approved',
  waitForMyApprove: 'WaitForMyApprove',
} as const

export type SaleOrderStatus =
  (typeof SALE_ORDER_STATUS)[keyof typeof SALE_ORDER_STATUS]

/**
 * 销售订单查询参数
 */
export interface SalesOrderApiQuery {
  status: SaleOrderStatus
  prodOrderId?: string
  contractCode?: string
  creatorName?: string
  customerName?: string
  prodId?: string
  createTime?: string
  deadline?: string
}

/**
 * 销售订单查询接口返回的数据
 */
export interface SalesOrderVo {
  id: string
  prodOrderId: string
  contractCode: string
  creatorId: string
  creatorName: string | null
  customerName: string | null
  prodId: string
  prodName: string | null
  amount: number
  createTime: string | null
  updateTime: string | null
  deadline: string | null
  version: number
}
