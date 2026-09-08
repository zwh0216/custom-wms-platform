import type { FormItemComponentType } from '../component/form-item-component'

/**
 * 表单类型
 */
export type FormType = keyof FormItemComponentType

/**
 * 表单类型的常量
 */
export const FORM_TYPE: Record<FormType, FormType> = {
  /**
   * 文本类型 表单项组件
   */
  text: 'text',
  /**
   * textarea类型 表单项组件
   */
  textarea: 'textarea',
  /**
   * 数字类型 表单项组件
   */
  number: 'number',
  /**
   * 金额类型 表单项组件
   */
  money: 'money',
  /**
   * 日期类型 表单项组件
   */
  date: 'date',
  /**
   * 日期范围类型 表单项组件
   */
  dateRange: 'dateRange',
  /**
   * 选择下拉框类型 表单项组件
   */
  select: 'select',
}
