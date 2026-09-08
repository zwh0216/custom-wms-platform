<script setup lang="ts">
import ReadonlyNumber from './component/readonly-number/index.vue'
import NumberInput from './component/number-input/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前数字表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 数字表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const numberValue = defineModel<number | null>()
</script>

<template>
  <!-- 只读状态：展示只读数字组件 -->
  <ReadonlyNumber
    v-if="props.isReadonly"
    v-model="numberValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的数字输入框组件 -->
  <NumberInput
    v-else
    v-model="numberValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
