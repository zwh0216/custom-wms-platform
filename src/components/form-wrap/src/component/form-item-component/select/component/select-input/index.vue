<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 下拉选择框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 下拉选择框的值，与外部表单数据通过 v-model 双向绑定
 */
const selectValue = defineModel<string | number | boolean>()
</script>

<template>
  <!--
    element-plus 下拉选择框：
    选项来自 props.component.options，未配置时展示空数据提示
  -->
  <el-select
    v-model="selectValue"
    :placeholder="`请选择${props.component.label}`"
    clearable
  >
    <el-option
      v-for="option in props.component.options ?? []"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>

<style lang="scss" scoped></style>
