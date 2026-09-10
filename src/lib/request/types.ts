/**
 * 后端统一响应结构
 */
export interface ApiResult<T = unknown> {
  /** 业务状态码 */
  code: number
  /** 业务数据 */
  data: T
  /** 响应消息 */
  msg: string
}
