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
  'approving',
  () => props.query,
  () => props.active,
)

const detailVisible = ref(false)
const progressVisible = ref(false)
const selectedOrder = ref<SaleOrder | null>(null)

const openDetail = (order: SaleOrder) => {
  selectedOrder.value = order
  detailVisible.value = true
}

const openProgress = (order: SaleOrder) => {
  selectedOrder.value = order
  progressVisible.value = true
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
      <el-button link type="primary" @click="openProgress(row)">
        查看审批进度
      </el-button>
    </template>
  </OrderTable>

  <OrderDetailDrawer v-model="detailVisible" :order="selectedOrder" />

  <el-drawer
    v-model="progressVisible"
    title="审批进度"
    size="520px"
    destroy-on-close
  >
    <template v-if="selectedOrder">
      <div class="progress-summary">
        <span>当前审批人</span>
        <strong>{{ selectedOrder.currentApprover || '--' }}</strong>
      </div>
      <ApprovalTimeline :records="selectedOrder.approvalRecords" />
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.progress-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 12px 14px;
  color: #606266;
  background: #f5f7fa;
  border-radius: 4px;

  strong {
    color: #303133;
  }
}
</style>
