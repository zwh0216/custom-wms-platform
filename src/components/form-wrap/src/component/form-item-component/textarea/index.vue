<script setup lang="ts">
import ReadonlyTextarea from './component/readonly-textarea/index.vue'
import TextareaInput from './component/textarea-input/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前多行文本表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 多行文本表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const textareaValue = defineModel<string>()
</script>

<template>
  <!-- 只读状态：展示只读多行文本组件 -->
  <ReadonlyTextarea
    v-if="props.isReadonly"
    v-model="textareaValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的多行文本输入框组件 -->
  <TextareaInput
    v-else
    v-model="textareaValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
