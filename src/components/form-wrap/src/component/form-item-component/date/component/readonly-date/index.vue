<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 只读日期组件接收与父级日期组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的日期值
 */
const displayValue = defineModel<string>()

/**
 * 只读展示内容的计算属性
 */
const displayText = computed(() => {
  // 空值占位符，避免只读区域显示空白
  if (
    displayValue.value === undefined ||
    displayValue.value === null ||
    displayValue.value === ''
  ) {
    return '-'
  }

  // 日期值默认已是字符串，这里直接展示；后续需要日期格式化时可在计算属性中转换
  return String(displayValue.value)
})
</script>

<template>
  <!--
    只读日期的展示容器：
    日期格式化逻辑集中在这里，输入组件只负责选择原始日期
  -->
  <div class="form-wrap-readonly-date">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-date {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
