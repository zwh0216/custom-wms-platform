<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 只读文本组件接收与父级文本组件相同的通用配置
 */
defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的文本值
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
    只读文本的展示容器：
    后续需要做数据格式化时，可以在计算属性中对 displayValue 做转换
  -->
  <div class="form-wrap-readonly-text">{{ displayText }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-text {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
