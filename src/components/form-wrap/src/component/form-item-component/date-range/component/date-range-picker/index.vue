<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 日期范围选择的默认格式，例如：2026-09-08
 */
const DATE_RANGE_FORMAT = 'YYYY-MM-DD'

/**
 * 日期范围选择框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 日期范围选择框的值，与外部表单数据通过 v-model 双向绑定
 */
const dateRangeValue = defineModel<[string, string] | null>()
</script>

<template>
  <!--
    element-plus 日期范围选择框：
    valueFormat 保证绑定的值为字符串数组，format 控制输入框展示格式
  -->
  <el-date-picker
    v-model="dateRangeValue"
    type="daterange"
    :value-format="DATE_RANGE_FORMAT"
    :format="DATE_RANGE_FORMAT"
    :start-placeholder="`开始${props.component.label}`"
    :end-placeholder="`结束${props.component.label}`"
    clearable
  />
</template>

<style lang="scss" scoped></style>
