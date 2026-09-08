import type { LocalStorageKey } from './type'

/**
 * local storage储存数据的key枚举
 */
export const LOCAL_STORAGE_KEY: Record<LocalStorageKey, LocalStorageKey> = {
  /** local storage储存token的key： token */
  token: 'token',
}
