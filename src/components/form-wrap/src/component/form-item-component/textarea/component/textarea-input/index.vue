<script setup lang="ts">
import type { FormCommonComponentProps } from '../../../../../lib/types/formCommonComponent.type'

/**
 * 多行文本输入框组件的属性
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 多行文本输入框的值，与外部表单数据通过 v-model 双向绑定
 */
const textareaValue = defineModel<string>()
</script>

<template>
  <!--
    element-plus 多行文本输入框：
    开启自适应高度，输入内容超过三行后自动出现滚动条
  -->
  <el-input
    v-model="textareaValue"
    type="textarea"
    :placeholder="`请输入${props.component.label}`"
    :rows="3"
    :autosize="{ minRows: 3, maxRows: 6 }"
    resize="none"
  />
</template>

<style lang="scss" scoped></style>
