import { CODE_ENUM } from '../enum/codeEnum'
import type { ApiResult } from '../types'

/**
 * 当前请求的响应是否成功
 */
export const isSuccessRes = <T>(res: ApiResult<T>) => {
  return res.code === CODE_ENUM.SUCCESS
}
