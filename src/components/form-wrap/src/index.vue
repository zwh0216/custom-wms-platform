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
  return new Promise(async (resolve, reject) => {
    if (!formRef.value) return reject(null)

    await formRef.value.validate((isValidate: boolean) => {
      if (isValidate) {
        resolve(formValue.value)
      }

      reject(null)
    })
  })
}

/**
 * 表单项的值变化
 */
const onChangeFormValue = (field: string, value: any) => {
  if (formValue.value) {
    console.log('value ->', value)
    console.log('field ->', field)
    formValue.value[field] = value
    console.log('formValue.value ->', formValue.value)
  }
}

defineExpose<FormWrapRef>({ validate: validateFormValue })
</script>

<template>
  <el-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :label-width="props.labelWidth || '120px'"
    label-position="left"
  >
    <div :style="{ width }" v-for="item in props.components" :key="item.field">
      <!-- v-model="formValue?.[item.field]" -->
      <FormItem
        :value="formValue?.[item.field]"
        :component="item"
        :isReadonly="props.isReadonly || false"
        @change="(value) => onChangeFormValue(item.field, value)"
      >
        <template v-if="item.slot" #[item.slot]="{ component }">
          <slot :name="item.slot" v-bind="{ component }" />
        </template>
      </FormItem>
    </div>
  </el-form>
</template>

<style lang="scss" scoped></style>
