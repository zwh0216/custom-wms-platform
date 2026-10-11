<script setup lang="ts">
import { useSaleOrderList } from '../../hook/useSaleOrderList'
import type { SaleOrder, SaleOrderQuery } from '../../type/order'
import ApprovalTimeline from '../common/ApprovalTimeline.vue'
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
  'approved',
  () => props.query,
  () => props.active,
)

const detailVisible = ref(false)
const recordVisible = ref(false)
const selectedOrder = ref<SaleOrder | null>(null)

const openDetail = (order: SaleOrder) => {
  selectedOrder.value = order
  detailVisible.value = true
}

const openRecords = (order: SaleOrder) => {
  selectedOrder.value = order
  recordVisible.value = true
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
      <el-button link type="primary" @click="openRecords(row)">
        查看审批记录
      </el-button>
    </template>
  </OrderTable>

  <OrderDetailDrawer v-model="detailVisible" :order="selectedOrder" />

  <el-drawer
    v-model="recordVisible"
    title="审批记录"
    size="520px"
    destroy-on-close
  >
    <ApprovalTimeline
      v-if="selectedOrder"
      :records="selectedOrder.approvalRecords"
    />
  </el-drawer>
</template>
