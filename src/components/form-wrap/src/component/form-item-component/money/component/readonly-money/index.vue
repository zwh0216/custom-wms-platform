<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 金额展示默认保留的小数位数
 */
const MONEY_PRECISION = 2

/**
 * 只读金额组件接收与父级金额组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的金额值
 */
const displayValue = defineModel<number | null>()

/**
 * 只读展示内容的计算属性
 */
const displayText = computed(() => {
  // 空值占位符，避免只读区域显示空白
  if (displayValue.value === undefined || displayValue.value === null) {
    return '-'
  }

  // 金额展示统一保留两位小数，并转为字符串
  return displayValue.value.toFixed(MONEY_PRECISION)
})
</script>

<template>
  <!--
    只读金额的展示容器：
    金额格式化逻辑集中在这里，输入组件只负责接收原始数值
  -->
  <div class="form-wrap-readonly-money">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-money {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
