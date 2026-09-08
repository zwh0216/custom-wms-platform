<script setup lang="ts">
import ReadonlyText from './component/readonly-text/index.vue'
import TextInput from './component/text-input/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前文本表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 当前文本表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const textValue = defineModel<string>()
</script>

<template>
  <!-- 只读状态：展示只读文本组件 -->
  <ReadonlyText
    v-if="props.isReadonly"
    v-model="textValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的文本输入框组件 -->
  <TextInput
    v-else
    v-model="textValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
