<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 只读日期范围组件接收与父级日期范围组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的日期范围值
 */
const displayValue = defineModel<[string, string] | null>()

/**
 * 只读展示内容的计算属性
 */
const displayText = computed(() => {
  // 空值占位符，避免只读区域显示空白
  if (
    displayValue.value === undefined ||
    displayValue.value === null ||
    displayValue.value.length !== 2 ||
    displayValue.value[0] === '' ||
    displayValue.value[1] === ''
  ) {
    return '-'
  }

  // 起止日期用范围分隔符拼接展示
  return `${displayValue.value[0]} ~ ${displayValue.value[1]}`
})
</script>

<template>
  <!--
    只读日期范围的展示容器：
    起止日期格式化逻辑集中在这里，输入组件只负责选择原始日期范围
  -->
  <div class="form-wrap-readonly-date-range">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-date-range {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
