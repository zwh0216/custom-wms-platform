<script setup lang="ts">
import type { ApprovalRecord } from '../../type/order'

defineProps<{
  records: ApprovalRecord[]
}>()

const getStatusType = (status: ApprovalRecord['status']) => {
  if (status === 'approved') return 'success'
  if (status === 'rejected') return 'danger'
  return 'primary'
}
</script>

<template>
  <el-timeline v-if="records.length" class="approval-timeline">
    <el-timeline-item
      v-for="record in records"
      :key="record.id"
      :type="getStatusType(record.status)"
      :timestamp="record.operateTime || '待处理'"
      placement="top"
    >
      <div class="record-head">
        <span class="record-node">{{ record.nodeName }}</span>
        <el-tag
          size="small"
          effect="plain"
          :type="getStatusType(record.status)"
        >
          {{
            record.status === 'approved'
              ? '已通过'
              : record.status === 'rejected'
                ? '已驳回'
                : '审批中'
          }}
        </el-tag>
      </div>
      <div class="record-info">审批人：{{ record.approver || '--' }}</div>
      <div class="record-opinion">意见：{{ record.opinion || '--' }}</div>
    </el-timeline-item>
  </el-timeline>
  <el-empty v-else description="暂无审批记录" :image-size="72" />
</template>

<style lang="scss" scoped>
.approval-timeline {
  padding: 4px 4px 0;
}

.record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.record-node {
  color: #303133;
  font-weight: 600;
}

.record-info,
.record-opinion {
  margin-top: 6px;
  color: #606266;
  font-size: 13px;
  line-height: 1.6;
}
</style>

