<script setup lang="ts">
import ApprovalTimeline from './ApprovalTimeline.vue'
import type { SaleOrder } from '../../type/order'

const visible = defineModel<boolean>({ required: true })

defineProps<{
  order: SaleOrder | null
}>()
</script>

<template>
  <el-drawer
    v-model="visible"
    title="订单详情"
    size="520px"
    destroy-on-close
  >
    <template v-if="order">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="合同编号">
          {{ order.contractNo }}
        </el-descriptions-item>
        <el-descriptions-item label="销售经理">
          {{ order.salesManager }}
        </el-descriptions-item>
        <el-descriptions-item label="客户名称" :span="2">
          {{ order.customerName }}
        </el-descriptions-item>
        <el-descriptions-item label="产品" :span="2">
          {{ order.product }}
        </el-descriptions-item>
        <el-descriptions-item label="数量">
          {{ order.amount }}
        </el-descriptions-item>
        <el-descriptions-item label="交货状态">
          {{ order.deliveryStatus }}
        </el-descriptions-item>
        <el-descriptions-item label="下单日期">
          {{ order.orderDate }}
        </el-descriptions-item>
        <el-descriptions-item label="交货期">
          {{ order.deliveryDate }}
        </el-descriptions-item>
        <el-descriptions-item label="剩余天数" :span="2">
          {{
            order.remainingDays === null
              ? '--'
              : order.remainingDays < 0
                ? '已逾期'
                : `${order.remainingDays} 天`
          }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="section-title">审批记录</div>
      <ApprovalTimeline :records="order.approvalRecords" />
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.section-title {
  margin: 24px 0 12px;
  color: #303133;
  font-size: 15px;
  font-weight: 600;
}
</style>
