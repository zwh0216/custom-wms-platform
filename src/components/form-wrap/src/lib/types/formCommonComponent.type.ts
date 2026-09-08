import type { FormItemConfigType } from '../FormItemConfigType'

/**
 * 所有表单项组件的通用props
 */
export interface FormCommonComponentProps {
  /**
   * 表单项配置字段
   */
  component: FormItemConfigType
  /**
   * 当前表单项是否只读
   */
  isReadonly: boolean
}
