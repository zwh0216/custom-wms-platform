import {
  FORM_TYPE,
  type FormItemConfigType,
} from '@/components/form-wrap/index'

export const FORM_COMPONENTS: FormItemConfigType[] = [
  {
    type: FORM_TYPE.text,
    label: '用户名',
    required: true,
    field: 'userName',
  },
  {
    type: FORM_TYPE.text,
    label: '密码',
    required: true,
    field: 'password',
  },
]
