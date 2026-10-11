<script setup lang="ts">
import { PageWrap } from '@/components/PageWrap'
import type {
  SaleOrderQuery,
  SaleOrderTab,
} from './type/order'
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import OrderFilter from './component/order-filter/index.vue'
import PendingApprovalTab from './component/pending-approval/index.vue'
import ApprovingTab from './component/approving/index.vue'
import ApprovedTab from './component/approved/index.vue'
import PendingMeTab from './component/pending-me/index.vue'
import { exportSaleOrders } from './hook/useSaleOrderList'
import { fetchSaleOrders, useSaleOrders } from './hook/useSaleOrders'

const createEmptyQuery = (): SaleOrderQuery => ({
  contractNo: '',
  salesManager: '',
  customerName: '',
})

const activeTab = ref<SaleOrderTab>('pending')
const draftQuery = reactive<SaleOrderQuery>(createEmptyQuery())
const appliedQuery = ref<SaleOrderQuery>(createEmptyQuery())

const { counts, salesManagers } = useSaleOrders()

const tabItems = computed(
  () =>
    [
      { name: 'pending', label: '待审批', count: counts.pending },
      { name: 'approving', label: '审批中', count: counts.approving },
      { name: 'approved', label: '已审批', count: counts.approved },
      { name: 'pending-me', label: '待我审批', count: counts['pending-me'] },
    ] as const,
)

const search = () => {
  appliedQuery.value = { ...draftQuery }
}

const reset = () => {
  Object.assign(draftQuery, createEmptyQuery())
  appliedQuery.value = createEmptyQuery()
}

const exportOrders = async () => {
  const data = await fetchSaleOrders(activeTab.value, appliedQuery.value)
  exportSaleOrders(data)
  ElMessage.success(`已导出 ${data.length} 条订单`)
}
</script>

<template>
  <PageWrap>
    <div class="sale-order-page">
      <header class="page-header">
        <div>
          <h1>订单审批管理</h1>
          <p>统一查看销售订单进度，快速处理当前审批任务</p>
        </div>
        <div class="header-mark">订单中心</div>
      </header>

      <OrderFilter
        v-model="draftQuery"
        :sales-managers="salesManagers"
        @search="search"
        @reset="reset"
        @export="exportOrders"
      />

      <el-tabs v-model="activeTab" class="order-tabs">
        <el-tab-pane
          v-for="item in tabItems"
          :key="item.name"
          :name="item.name"
        >
          <template #label>
            <span class="tab-label">
              {{ item.label }}
              <span class="tab-count">{{ item.count }}</span>
            </span>
          </template>

          <PendingApprovalTab
            v-if="item.name === 'pending'"
            :query="appliedQuery"
            :active="activeTab === 'pending'"
          />
          <ApprovingTab
            v-else-if="item.name === 'approving'"
            :query="appliedQuery"
            :active="activeTab === 'approving'"
          />
          <ApprovedTab
            v-else-if="item.name === 'approved'"
            :query="appliedQuery"
            :active="activeTab === 'approved'"
          />
          <PendingMeTab
            v-else
            :query="appliedQuery"
            :active="activeTab === 'pending-me'"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </PageWrap>
</template>

<style lang="scss" scoped>
.sale-order-page {
  min-width: 0;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;

  h1 {
    margin: 0;
    color: #1f2d3d;
    font-size: 22px;
    font-weight: 650;
    line-height: 1.3;
  }

  p {
    margin: 6px 0 0;
    color: #8492a6;
    font-size: 13px;
    line-height: 1.5;
  }
}

.header-mark {
  flex: 0 0 auto;
  padding: 5px 10px;
  color: #2765b3;
  font-size: 12px;
  background: #edf5ff;
  border: 1px solid #cfe3ff;
  border-radius: 4px;
}

.order-tabs {
  margin-top: 18px;

  :deep(.el-tabs__header) {
    margin-bottom: 14px;
  }

  :deep(.el-tabs__item) {
    height: 44px;
    font-size: 14px;
  }
}

.tab-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.tab-count {
  min-width: 20px;
  padding: 0 6px;
  color: #6b7a90;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  background: #eef2f7;
  border-radius: 9px;
}

:deep(.el-tabs__item.is-active) .tab-count {
  color: #2f6fd0;
  background: #e7f0ff;
}

@media (max-width: 720px) {
  .page-header {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
  }

  .header-mark {
    align-self: flex-start;
  }
}
</style>
