import type { FormItemConfigType } from '../FormItemConfigType'

export interface FormItemProps {
  /**
   * 当前表单项的值
   */
  formValue: any
  /**
   * 当前表单项组件的配置字段
   */
  component: FormItemConfigType
  /**
   * 当前表单项的只读状态
   */
  isReadonly: boolean
}
