import type { LocalStorageKey } from './type'

class LocalStorage {
  /**
   * 获取local storage某些数据
   */
  getStorage = (key: LocalStorageKey) => {
    try {
      return localStorage.getItem(key)
    } catch (err) {
      console.error(`获取${key}失败：${err}`)
      return null
    }
  }

  /**
   * 设置local storage某些数据
   */
  setStorage = (key: LocalStorageKey, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch (err) {
      console.error(`设置${key}-${value}失败：${err}`)
    }
  }
}

export const ls = new LocalStorage()
