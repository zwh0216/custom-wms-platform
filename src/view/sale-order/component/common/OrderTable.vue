<script setup lang="ts">
import type { SaleOrder } from '../../type/order'

defineProps<{
  orders: SaleOrder[]
  loading: boolean
  currentPage: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

const getRemainingDaysType = (days: number) => {
  if (days <= 7) return 'danger'
  if (days <= 30) return 'warning'
  return 'success'
}

const getDeliveryStatusType = (status: string) => {
  if (status === '已完成') return 'success'
  if (status === '已发货') return 'primary'
  if (status === '生产中') return 'warning'
  return 'info'
}
</script>

<template>
  <div class="order-table-wrap">
    <el-table
      v-loading="loading"
      :data="orders"
      border
      stripe
      row-key="id"
      empty-text="暂无符合条件的订单"
    >
      <el-table-column prop="contractNo" label="合同编号" width="150" />
      <el-table-column prop="salesManager" label="销售经理" width="105" />
      <el-table-column
        prop="customerName"
        label="客户名称"
        min-width="190"
        show-overflow-tooltip
      />
      <el-table-column
        prop="product"
        label="产品"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column prop="amount" label="数量" width="100" align="right" />
      <el-table-column label="交货状态" width="105" align="center">
        <template #default="{ row }">
          <el-tag
            v-if="row.deliveryStatus"
            size="small"
            effect="plain"
            :type="getDeliveryStatusType(row.deliveryStatus)"
          >
            {{ row.deliveryStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderDate" label="下单日期" width="120" />
      <el-table-column prop="deliveryDate" label="交货期" width="120" />
      <el-table-column label="剩余天数" width="105" align="center">
        <template #default="{ row }">
          <span v-if="row.remainingDays === null">--</span>
          <span v-else-if="row.remainingDays < 0" class="remaining-overdue">
            已逾期
          </span>
          <el-tag
            v-else
            size="small"
            effect="light"
            :type="getRemainingDaysType(row.remainingDays)"
          >
            {{ row.remainingDays }} 天
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="238" fixed="right">
        <template #default="{ row }">
          <div class="action-group">
            <slot name="actions" :row="row" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wrap">
      <span class="total-text">共 {{ total }} 条</span>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        layout="sizes, prev, pager, next"
        background
        @current-change="emit('pageChange', $event)"
        @size-change="emit('sizeChange', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-table-wrap {
  min-width: 0;
}

.remaining-overdue {
  color: #f56c6c;
  font-weight: 600;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;

  :deep(.el-button + .el-button) {
    margin-left: 0;
  }
}

.pagination-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
}

.total-text {
  color: #909399;
  font-size: 13px;
}

@media (max-width: 720px) {
  .pagination-wrap {
    align-items: flex-end;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
