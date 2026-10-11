<script setup lang="ts">
import type { SaleOrderQuery } from '../../type/order'

const query = defineModel<SaleOrderQuery>({ required: true })

defineProps<{
  salesManagers: string[]
}>()

const emit = defineEmits<{
  search: []
  reset: []
  export: []
}>()
</script>

<template>
  <div class="filter-wrap">
    <div class="filter-fields">
      <el-input
        v-model="query.contractNo"
        class="filter-item"
        clearable
        placeholder="合同编号"
        @keyup.enter="emit('search')"
      />
      <el-select
        v-model="query.salesManager"
        class="filter-item"
        clearable
        filterable
        placeholder="销售经理"
      >
        <el-option
          v-for="manager in salesManagers"
          :key="manager"
          :label="manager"
          :value="manager"
        />
      </el-select>
      <el-input
        v-model="query.customerName"
        class="filter-item"
        clearable
        placeholder="客户名称"
        @keyup.enter="emit('search')"
      />
    </div>

    <div class="filter-actions">
      <el-button type="primary" @click="emit('search')">筛选</el-button>
      <el-button @click="emit('reset')">重置</el-button>
      <el-button @click="emit('export')">导出订单</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background: #f7f9fc;
  border: 1px solid #e8edf5;
  border-radius: 6px;
}

.filter-fields,
.filter-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-item {
  width: 180px;
}

@media (max-width: 980px) {
  .filter-wrap {
    align-items: stretch;
    flex-direction: column;
  }

  .filter-actions {
    justify-content: flex-end;
  }
}

@media (max-width: 640px) {
  .filter-fields {
    display: grid;
    grid-template-columns: 1fr;
  }

  .filter-item {
    width: 100%;
  }
}
</style>
