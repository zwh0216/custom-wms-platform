import type { FormItemConfigType } from './lib/FormItemConfigType'
import type { FormProps, FormValidationResult } from 'element-plus'

/**
 * 自定义表单的props
 */
export interface FormWrapProps extends FormProps {
  /**
   * 表单项组件列表
   */
  components: FormItemConfigType[]
  /**
   * 是否是只读状态表单，不传递则不是只读状态
   */
  isReadonly?: boolean
  /**
   * 表示一个表单项占据一行的多少。不设置则默认表示一行一个表单项
   * 一行占满用24表示，如果span设置为4，则表示一个表单项占一行的六分之一。
   */
  span?: number
}

/**
 * 自定义表单的ref
 */
export interface FormWrapRef {
  /**
   * 校验表单数据
   */
  validate: () => FormValidationResult
}
