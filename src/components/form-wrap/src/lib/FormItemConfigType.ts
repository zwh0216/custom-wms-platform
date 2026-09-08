import type { FormType } from './formType'

/**
 * 下拉选择项的类型
 */
export interface FormItemSelectOption {
  /**
   * 下拉选项的展示文本
   */
  label: string
  /**
   * 下拉选项的值
   */
  value: string | number | boolean
  /**
   * 当前下拉选项是否禁用
   */
  disabled?: boolean
}

/**
 * 下拉选择值的基础类型
 */
export type FormItemSelectValue = FormItemSelectOption['value']

/**
 * 表单项组件的类型
 */
export interface FormItemConfigType {
  /**
   * 表单项的字段key，唯一标识
   */
  field: string
  /**
   * 表单项的字段名称
   */
  label: string
  /**
   * 表单项是否必填
   */
  required: boolean
  /**
   * 表单项的类型
   */
  type: FormType
  /**
   * 表单是否开启插槽
   */
  slot?: string
  /**
   * select类型表单项的可选项配置
   */
  options?: FormItemSelectOption[]
}
