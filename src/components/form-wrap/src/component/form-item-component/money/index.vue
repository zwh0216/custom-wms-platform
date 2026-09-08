<script setup lang="ts">
import ReadonlyMoney from './component/readonly-money/index.vue'
import MoneyInput from './component/money-input/index.vue'
import type { FormCommonComponentProps } from '../../../lib/types/formCommonComponent.type'

/**
 * 当前金额表单项组件的通用配置
 */
const props = defineProps<FormCommonComponentProps>()

/**
 * 金额表单项的值，与外部表单数据通过 v-model 双向绑定
 */
const moneyValue = defineModel<number | null>()
</script>

<template>
  <!-- 只读状态：展示只读金额组件 -->
  <ReadonlyMoney
    v-if="props.isReadonly"
    v-model="moneyValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />

  <!-- 非只读状态：展示可编辑的金额输入框组件 -->
  <MoneyInput
    v-else
    v-model="moneyValue"
    :component="props.component"
    :isReadonly="props.isReadonly"
  />
</template>

<style lang="scss" scoped></style>
