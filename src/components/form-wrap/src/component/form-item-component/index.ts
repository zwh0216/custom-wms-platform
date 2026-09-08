import Date from './date/index.vue'
import DateRange from './date-range/index.vue'
import Money from './money/index.vue'
import Number from './number/index.vue'
import Select from './select/index.vue'
import Text from './text/index.vue'
import Textarea from './textarea/index.vue'

/**
 * 表单项组件映射的类型
 */
export type FormItemComponentType = {
  date: typeof Date
  dateRange: typeof DateRange
  money: typeof Money
  number: typeof Number
  select: typeof Select
  text: typeof Text
  textarea: typeof Textarea
}

/**
 * 表单项组件的映射
 */
export const formItemComponent: FormItemComponentType = {
  date: Date,
  dateRange: DateRange,
  money: Money,
  number: Number,
  select: Select,
  text: Text,
  textarea: Textarea,
}
