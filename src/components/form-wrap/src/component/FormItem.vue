<script setup lang="ts">
import { ElFormItem, type FormItemRule } from 'element-plus'
import type { FormItemProps } from '../lib/types/formItem.type'
import { formItemComponent } from './form-item-component'
import { computed, useSlots } from 'vue'

const props = defineProps<FormItemProps>()
const slotMap = useSlots()

// 计算当前表单项的校验规则
const rules = computed(() => {
  const rules: FormItemRule[] = []

  // 当前表单项是否必填
  if (props.component.required) {
    rules.push({
      required: true,
      message: `${props.component.label}是必填`,
    })
  }

  return rules?.length ? rules : void 0
})

const isSlot = computed(() => {
  return props.component.slot ? slotMap[props.component.slot] : false
})
</script>

<template>
  <el-form-item
    :label="props.component.field"
    :required="props.component.required"
    :rules="rules"
  >
    <!-- 外部自定义表单项 -->
    <slot
      v-if="isSlot"
      :name="props.component.slot"
      v-bind="{ component: props.component }"
    />

    <!-- 预制的表单项组件 -->
    <component
      v-else
      :is="formItemComponent[props.component.type] || formItemComponent.text"
      v-model="props.formValue"
      :component="props.component"
      :isReadonly="props.isReadonly"
    ></component>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
