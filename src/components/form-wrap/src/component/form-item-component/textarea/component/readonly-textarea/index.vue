<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 只读多行文本组件接收与父级多行文本组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的多行文本值
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

  // 统一转为字符串展示，兼容 string/number 等类型的表单值
  return String(displayValue.value)
})
</script>

<template>
  <!--
    只读多行文本的展示容器：
    保留换行展示，后续需要做格式化时可以在计算属性中转换
  -->
  <div class="form-wrap-readonly-textarea">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-textarea {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 24px;
  color: var(--el-text-color-regular);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
