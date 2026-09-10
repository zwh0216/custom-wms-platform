import {
  create,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { LOCAL_STORAGE_KEY, ls } from '../localStorage'
import { CODE_ENUM } from './enum/codeEnum'
import type { ApiResult } from './types'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { isSuccessRes } from './tool/utils'
import { EVENT_CENTER_ENUM, eventCenter } from '../eventCenter'

// 超时限制：30秒
const TIME_OUT_LIMIT = 30 * 1000

/**
 * 创建请求对象
 */
const requestInstance = create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: TIME_OUT_LIMIT,
})

/**
 * 请求拦截器
 */
requestInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any, any>) => {
    // 添加token
    const token = ls.getStorage(LOCAL_STORAGE_KEY.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    console.error(`请求异常：${err}`)
    return Promise.reject(false)
  },
)

/**
 * 响应的拦截器
 */
requestInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResult>) => {
    // 不是200响应需要，展示错误信息
    if (!isSuccessRes(response.data)) {
      const msg = response.data?.msg || '网络异常'
      ElMessage.error(msg)
      // 返回403的的请求
      if (response.data.code === CODE_ENUM.NO_AUTH) {
        eventCenter.emit(EVENT_CENTER_ENUM.GO_LOGIN)
      }
    }

    return response
  },
  (err) => {
    console.error('err ->', err)
    return { code: 500, data: null, message: '网络异常' }
  },
)

/**
 * 发起请求并返回业务响应体
 */
const request = <T, D = unknown, P = unknown>(
  config: AxiosRequestConfig<D, P>,
): Promise<ApiResult<T>> => {
  return requestInstance
    .request<ApiResult<T>, AxiosResponse<ApiResult<T>>>(config)
    .then((response) => response.data)
}

export { request }
