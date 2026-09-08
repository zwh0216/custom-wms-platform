<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 只读数字组件接收与父级数字组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的数字值
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

  // 数字值统一转字符串展示
  return String(displayValue.value)
})
</script>

<template>
  <!--
    只读数字的展示容器：
    后续需要保留小数位或千分位展示时，可以在这里扩展格式化逻辑
  -->
  <div class="form-wrap-readonly-number">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-number {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
