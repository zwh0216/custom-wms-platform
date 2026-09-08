<script setup lang="ts">
import ReadonlyDateRange from './component/readonly-date-range/index.vue'
import DateRangePicker from './component/date-range-picker/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前日期范围表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 日期范围表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const dateRangeValue = defineModel<[string, string] | null>()
</script>

<template>
  <!-- 只读状态：展示只读日期范围组件 -->
  <ReadonlyDateRange
    v-if="props.isReadonly"
    v-model="dateRangeValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的日期范围选择组件 -->
  <DateRangePicker
    v-else
    v-model="dateRangeValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
