<script setup lang="ts">
import { useSaleOrderList } from '../../hook/useSaleOrderList'
import type { SaleOrder, SaleOrderQuery } from '../../type/order'
import OrderDetailDrawer from '../common/OrderDetailDrawer.vue'
import OrderTable from '../common/OrderTable.vue'
import { ref } from 'vue'

const props = defineProps<{
  query: SaleOrderQuery
  active: boolean
}>()

const {
  pagedOrders,
  loading,
  currentPage,
  pageSize,
  total,
  changePage,
  changePageSize,
} = useSaleOrderList(
  'pending',
  () => props.query,
  () => props.active,
)

const detailVisible = ref(false)
const selectedOrder = ref<SaleOrder | null>(null)

const openDetail = (order: SaleOrder) => {
  selectedOrder.value = order
  detailVisible.value = true
}

</script>

<template>
  <OrderTable
    :orders="pagedOrders"
    :loading="loading"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    @page-change="changePage"
    @size-change="changePageSize"
  >
    <template #actions="{ row }">
      <el-button link type="primary" @click="openDetail(row)">查看</el-button>
    </template>
  </OrderTable>

  <OrderDetailDrawer v-model="detailVisible" :order="selectedOrder" />
</template>
