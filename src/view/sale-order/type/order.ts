import type { SaleOrderStatus } from '@/api/sales-order/sales-order.types'

/**
 * 订单列表页签
 */
export type SaleOrderTab = 'pending' | 'approving' | 'approved' | 'pending-me'

/**
 * 审批节点状态
 */
export type ApprovalRecordStatus = 'pending' | 'approved' | 'rejected'

/**
 * 订单查询条件
 */
export interface SaleOrderQuery {
  contractNo: string
  salesManager: string
  customerName: string
}

/**
 * 审批记录
 */
export interface ApprovalRecord {
  id: string
  nodeName: string
  approver: string
  status: ApprovalRecordStatus
  opinion: string
  operateTime: string
}

/**
 * 销售订单
 */
export interface SaleOrder {
  id: string
  prodOrderId: string
  contractNo: string
  salesManager: string
  customerName: string
  product: string
  amount: number
  deliveryStatus: string
  orderDate: string
  deliveryDate: string
  remainingDays: number | null
  status: SaleOrderStatus
  approvalRecords: ApprovalRecord[]
  currentApprover: string
  pendingForCurrentUser: boolean
}
