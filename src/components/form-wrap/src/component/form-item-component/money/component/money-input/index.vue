<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 金额输入允许的最大小数位数
 */
const MONEY_PRECISION = 2

/**
 * 金额输入框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 金额输入框的值，与外部表单数据通过 v-model 双向绑定
 */
const inputValue = defineModel<number | null>()
</script>

<template>
  <!--
    element-plus 数字输入框用于金额录入：
    步长 0.01、保留两位小数，并通过 formatter/parser 加入千分位展示
  -->
  <el-input-number
    v-model="inputValue"
    :placeholder="`请输入${props.component.label}`"
    :step="0.01"
    :precision="MONEY_PRECISION"
    :min="0"
    controls-position="right"
    :formatter="(value: string) => Number(value).toLocaleString('zh-CN', { minimumFractionDigits: MONEY_PRECISION, maximumFractionDigits: MONEY_PRECISION })"
    :parser="(value: string) => value.replace(/[^\d.-]/g, '')"
  />
</template>

<style lang="scss" scoped></style>
