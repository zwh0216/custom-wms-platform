import { querySalesOrders } from '@/api/sales-order/sales-order.server'
import {
  SALE_ORDER_STATUS,
  type SaleOrderStatus,
  type SalesOrderApiQuery,
  type SalesOrderVo,
} from '@/api/sales-order/sales-order.types'
import { isSuccessRes } from '@/lib/request'
import type {
  SaleOrder,
  SaleOrderQuery,
  SaleOrderTab,
} from '../type/order'
import { onMounted, reactive, ref } from 'vue'

const DAY = 24 * 60 * 60 * 1000
const pendingSaleOrderRequests = new Map<string, Promise<SaleOrder[]>>()

export const SALE_ORDER_STATUS_BY_TAB: Record<SaleOrderTab, SaleOrderStatus> = {
  pending: SALE_ORDER_STATUS.pending,
  approving: SALE_ORDER_STATUS.approving,
  approved: SALE_ORDER_STATUS.approved,
  'pending-me': SALE_ORDER_STATUS.waitForMyApprove,
}

const createApiQuery = (
  tab: SaleOrderTab,
  query: SaleOrderQuery,
): SalesOrderApiQuery => {
  const params: SalesOrderApiQuery = {
    status: SALE_ORDER_STATUS_BY_TAB[tab],
  }
  const contractCode = query.contractNo.trim()
  const creatorName = query.salesManager.trim()
  const customerName = query.customerName.trim()

  if (contractCode) params.contractCode = contractCode
  if (creatorName) params.creatorName = creatorName
  if (customerName) params.customerName = customerName

  return params
}

const formatDate = (value: string | null) => {
  if (!value) return ''
  return value.slice(0, 10)
}

const getRemainingDays = (deliveryDate: string) => {
  if (!deliveryDate) return null

  const target = new Date(`${deliveryDate}T00:00:00`).getTime()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Math.ceil((target - today.getTime()) / DAY)
}

const normalizeSaleOrder = (
  order: SalesOrderVo,
  status: SaleOrderStatus,
): SaleOrder => {
  const deliveryDate = formatDate(order.deadline)

  return {
    id: order.id,
    prodOrderId: order.prodOrderId,
    contractNo: order.contractCode || '',
    salesManager: order.creatorName || '',
    customerName: order.customerName || '',
    product: order.prodName || '',
    amount: order.amount ?? 0,
    deliveryStatus: '',
    orderDate: formatDate(order.createTime),
    deliveryDate,
    remainingDays: getRemainingDays(deliveryDate),
    status,
    approvalRecords: [],
    currentApprover: '',
    pendingForCurrentUser: status === SALE_ORDER_STATUS.waitForMyApprove,
  }
}

export const createEmptySaleOrderQuery = (): SaleOrderQuery => ({
  contractNo: '',
  salesManager: '',
  customerName: '',
})

/**
 * 按页签状态查询销售订单，接口没有返回的字段保持为空。
 */
export const fetchSaleOrders = async (
  tab: SaleOrderTab,
  query: SaleOrderQuery,
) => {
  const status = SALE_ORDER_STATUS_BY_TAB[tab]
  const params = createApiQuery(tab, query)
  const requestKey = JSON.stringify(params)
  const pendingRequest = pendingSaleOrderRequests.get(requestKey)

  if (pendingRequest) {
    return pendingRequest
  }

  const request = querySalesOrders(params).then((res) => {
    if (!isSuccessRes(res) || !Array.isArray(res.data)) {
      return []
    }

    return res.data.map((order) => normalizeSaleOrder(order, status))
  })
  const clearRequest = () => {
    if (pendingSaleOrderRequests.get(requestKey) === request) {
      pendingSaleOrderRequests.delete(requestKey)
    }
  }

  pendingSaleOrderRequests.set(requestKey, request)
  void request.then(clearRequest, clearRequest)

  return request
}

export const filterSaleOrdersByQuery = (
  source: readonly SaleOrder[],
  query: SaleOrderQuery,
) => {
  const contractNo = query.contractNo.trim().toLowerCase()
  const salesManager = query.salesManager.trim().toLowerCase()
  const customerName = query.customerName.trim().toLowerCase()

  return source.filter((order) => {
    const isMatchedContract =
      !contractNo || order.contractNo.toLowerCase().includes(contractNo)
    const isMatchedManager =
      !salesManager || order.salesManager.toLowerCase().includes(salesManager)
    const isMatchedCustomer =
      !customerName || order.customerName.toLowerCase().includes(customerName)

    return isMatchedContract && isMatchedManager && isMatchedCustomer
  })
}

/**
 * 加载各页签数量及筛选项。这些数据同样来自销售订单查询接口。
 */
export const useSaleOrders = () => {
  const counts = reactive<Record<SaleOrderTab, number>>({
    pending: 0,
    approving: 0,
    approved: 0,
    'pending-me': 0,
  })
  const salesManagers = ref<string[]>([])
  const loading = ref(false)

  const loadSummary = async () => {
    loading.value = true
    const tabs: SaleOrderTab[] = [
      'pending',
      'approving',
      'approved',
      'pending-me',
    ]
    const results = await Promise.all(
      tabs.map((tab) => fetchSaleOrders(tab, createEmptySaleOrderQuery())),
    )

    tabs.forEach((tab, index) => {
      counts[tab] = results[index].length
    })

    salesManagers.value = Array.from(
      new Set(
        results
          .flat()
          .map((order) => order.salesManager)
          .filter(Boolean),
      ),
    ).sort((left, right) => left.localeCompare(right, 'zh-CN'))
    loading.value = false
  }

  onMounted(loadSummary)

  return {
    counts,
    salesManagers,
    loading,
    refresh: loadSummary,
  }
}
