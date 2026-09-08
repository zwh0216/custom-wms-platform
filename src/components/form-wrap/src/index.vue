<script setup lang="ts">
import type { FormWrapProps, FormWrapRef } from './type'
import FormItem from './component/FormItem.vue'
import { computed, useTemplateRef } from 'vue'
import type { FormInstance } from 'element-plus'

/**
 * 表单值
 */
const formValue = defineModel<Record<string, any>>()

const props = defineProps<FormWrapProps>()

const formRef = useTemplateRef<FormInstance>('formRef')

/**
 * 计算一个表单项占据一行的多少，百分比
 */
const width = computed(() => {
  if (!props.span || props.span > 24 || props.span < 0) {
    return '100%'
  }

  return `${(props.span / 24) * 100}%`
})

/**
 * 校验表单数据
 */
const validateFormValue = async () => {
  return (await formRef.value?.validate()) ?? false
}

defineExpose<FormWrapRef>({ validate: validateFormValue })
</script>

<template>
  <el-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :label-width="props.labelWidth || '120px'"
  >
    <div :style="{ width }" v-for="item in props.components" :key="item.field">
      <FormItem
        :component="item"
        :isReadonly="props.isReadonly || false"
        :form-value="formValue?.[item.field]"
      >
        <template v-if="item.slot" #[item.slot]="{ component }">
          <slot :name="item.slot" v-bind="{ component }" />
        </template>
      </FormItem>
    </div>
  </el-form>
</template>

<style lang="scss" scoped></style>
