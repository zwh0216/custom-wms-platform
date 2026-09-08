<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 数字输入框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 数字输入框的值，与外部表单数据通过 v-model 双向绑定
 */
const inputValue = defineModel<number | null>()
</script>

<template>
  <!--
    element-plus 数字输入框：
    支持清除、调节步长，后续需要限制范围时可通过 component 配置扩展
  -->
  <el-input-number
    v-model="inputValue"
    :placeholder="`请输入${props.component.label}`"
    :step="1"
    :precision="0"
    controls-position="right"
  />
</template>

<style lang="scss" scoped></style>
