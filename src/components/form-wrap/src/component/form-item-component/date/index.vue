<script setup lang="ts">
import ReadonlyDate from './component/readonly-date/index.vue'
import DatePicker from './component/date-picker/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前日期表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 日期表单项的值，与外部表单数据通过 v-model 双向绑定
 * 默认按字符串日期处理，便于表单提交与后端交互
 */
const dateValue = defineModel<string>()
</script>

<template>
  <!-- 只读状态：展示只读日期组件 -->
  <ReadonlyDate
    v-if="props.isReadonly"
    v-model="dateValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的日期选择组件 -->
  <DatePicker
    v-else
    v-model="dateValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
