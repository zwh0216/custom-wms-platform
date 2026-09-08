<script setup lang="ts">
import { computed } from 'vue'
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'
import type { FormItemSelectOption } from '../../../../../lib/FormItemConfigType'

/**
 * 只读下拉选择组件接收与父级下拉选择组件相同的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 当前只读展示的选择值
 */
const selectValue = defineModel<string | number | boolean>()

/**
 * 根据配置中的选项列表查找选中值对应的展示文本
 */
const selectedLabel = computed(() => {
  const optionList: FormItemSelectOption[] = props.component.options ?? []

  // 通过全等匹配选中值对应的选项，保证 number/boolean 等类型也能正确匹配
  const matchedOption = optionList.find((option) => option.value === selectValue.value)

  // 命中选项时展示选项文案；未命中时尝试展示原始值，避免只读区域空白
  return matchedOption?.label ?? (selectValue.value === undefined || selectValue.value === null || selectValue.value === '' ? '-' : String(selectValue.value))
})
</script>

<template>
  <!--
    只读下拉选择的展示容器：
    值到文案的映射集中在这里处理，输入组件只负责选择原始值
  -->
  <div class="form-wrap-readonly-select">{{ selectedLabel }}</div>
</template>

<style lang="scss" scoped>
.form-wrap-readonly-select {
  /* 与 element-plus 默认表单内容保持一致的观感 */
  min-height: 32px;
  line-height: 32px;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
</style>
