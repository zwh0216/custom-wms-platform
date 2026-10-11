import { SALE_ORDER_STATUS } from '@/api/sales-order/sales-order.types'
import type { SaleOrder, SaleOrderQuery, SaleOrderTab } from '../type/order'
import { fetchSaleOrders, filterSaleOrdersByQuery } from './useSaleOrders'
import {
  computed,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'

/**
 * 为各页签提供接口查询和分页逻辑。
 * 仅当页签处于激活状态时才调用接口，避免筛选等操作触发所有状态请求。
 */
export const useSaleOrderList = (
  tab: SaleOrderTab,
  query: MaybeRefOrGetter<SaleOrderQuery>,
  isActive: MaybeRefOrGetter<boolean> = true,
) => {
  const loadedOrders = ref<SaleOrder[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  let requestSequence = 0
  let loadedQueryKey: string | null = null

  const orders = computed(() =>
    filterSaleOrdersByQuery(loadedOrders.value, toValue(query)),
  )

  const pagedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return orders.value.slice(start, start + pageSize.value)
  })

  const loadOrders = async () => {
    const currentQuery = toValue(query)
    loadedQueryKey = JSON.stringify(currentQuery)
    const sequence = ++requestSequence
    loading.value = true
    const data = await fetchSaleOrders(tab, currentQuery)

    if (sequence !== requestSequence) return

    loadedOrders.value = data
    currentPage.value = 1
    loading.value = false
  }

  const loadWhenActivated = () => {
    if (!toValue(isActive)) return
    if (JSON.stringify(toValue(query)) === loadedQueryKey) return
    loadOrders()
  }

  // 首次激活或带着已变更条件切回该页签时加载，未加载过的页签切换时补载。
  watch(() => toValue(isActive), loadWhenActivated, { immediate: true })

  // 条件变更时仅刷新当前激活的页签，其他页签保持静默。
  watch(
    () => toValue(query),
    () => {
      if (!toValue(isActive)) return
      loadOrders()
    },
    { deep: true },
  )

  const changePage = (page: number) => {
    currentPage.value = page
  }

  const changePageSize = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
  }

  return {
    orders,
    pagedOrders,
    loading,
    currentPage,
    pageSize,
    total: computed(() => orders.value.length),
    changePage,
    changePageSize,
    refresh: loadOrders,
  }
}

const statusLabels: Record<SaleOrder['status'], string> = {
  [SALE_ORDER_STATUS.pending]: '待审批',
  [SALE_ORDER_STATUS.approving]: '审批中',
  [SALE_ORDER_STATUS.approved]: '已审批',
  [SALE_ORDER_STATUS.waitForMyApprove]: '待我审批',
}

export const exportSaleOrders = (orders: SaleOrder[]) => {
  const headers = [
    '审批状态',
    '合同编号',
    '销售经理',
    '客户名称',
    '产品',
    '数量',
    '下单日期',
    '交货期',
    '剩余天数',
  ]

  const rows = orders.map((order) => [
    statusLabels[order.status],
    order.contractNo,
    order.salesManager,
    order.customerName,
    order.product,
    order.amount,
    order.orderDate,
    order.deliveryDate,
    order.remainingDays ?? '',
  ])

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(','),
    )
    .join('\n')

  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8',
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `销售订单_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}
