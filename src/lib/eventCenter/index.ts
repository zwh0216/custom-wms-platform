import mitt from 'mitt'

export const EVENT_CENTER_ENUM = {
  /** 跳转到登录页面 */
  GO_LOGIN: 'auth:goLogin',
} as const

/**
 * 可用事件的名称
 */
type EventKeyName = (typeof EVENT_CENTER_ENUM)[keyof typeof EVENT_CENTER_ENUM]

/**
 * 事件中心
 */
class EventCenter {
  /** 事件中心对象 */
  eventCenter

  /**
   * 初始化事件中心
   */
  constructor() {
    this.eventCenter = mitt()
  }

  /**
   * 监听事件
   */
  on = (eventName: EventKeyName, handler: () => void) => {
    this.eventCenter.on(eventName, handler)
  }

  /**
   * 取消监听事件
   */
  off = (eventName: EventKeyName) => {
    this.eventCenter.off(eventName)
  }

  /**
   * 触发事件
   */
  emit = (eventName: EventKeyName) => {
    this.eventCenter.emit(eventName)
  }
}

export const eventCenter = new EventCenter()
