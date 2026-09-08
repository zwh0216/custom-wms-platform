<script setup lang="ts">
import ReadonlySelect from './component/readonly-select/index.vue'
import SelectInput from './component/select-input/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前下拉选择表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 下拉选择表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const selectValue = defineModel<string | number | boolean>()
</script>

<template>
  <!-- 只读状态：展示只读下拉选择组件 -->
  <ReadonlySelect
    v-if="props.isReadonly"
    v-model="selectValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的下拉选择组件 -->
  <SelectInput
    v-else
    v-model="selectValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
