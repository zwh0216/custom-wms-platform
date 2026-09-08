<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 文本输入框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 文本输入框的值，与外部表单数据通过 v-model 双向绑定
 */
const inputValue = defineModel<string>()
</script>

<template>
  <!--
    element-plus 文本输入框：
    inputValue 为空时 el-input 内部会使用空字符串作为默认值
  -->
  <el-input
    v-model="inputValue"
    :placeholder="`请输入${props.component.label}`"
    clearable
  />
</template>

<style lang="scss" scoped></style>
