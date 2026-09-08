<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 日期选择的默认格式，例如：2026-09-08
 */
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 日期选择框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 日期选择框的值，与外部表单数据通过 v-model 双向绑定
 */
const dateValue = defineModel<string>()
</script>

<template>
  <!--
    element-plus 日期选择框：
    valueFormat 保证绑定的值为字符串日期，format 控制输入框展示格式
  -->
  <el-date-picker
    v-model="dateValue"
    type="date"
    :value-format="DATE_FORMAT"
    :format="DATE_FORMAT"
    :placeholder="`请选择${props.component.label}`"
    clearable
  />
</template>

<style lang="scss" scoped></style>
