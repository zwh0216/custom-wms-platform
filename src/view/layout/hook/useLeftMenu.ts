import { findAllMenus } from '@/api/menu/menu.server'
import type { MENU_TYPE_ENUM } from '@/const/menu'
import { isSuccessRes } from '@/lib/request'
import { onMounted, ref } from 'vue'

export interface Menu {
  // 菜单的id
  id: string

  // 菜单的名称
  name: string

  // 菜单的路径
  path: string

  // 菜单的中文名称
  title: string

  // 菜单的类型
  type: (typeof MENU_TYPE_ENUM)[keyof typeof MENU_TYPE_ENUM]

  // 菜单的禁用状态
  disabled: boolean

  // 菜单的自定义icon
  icon: string

  // 菜单的父菜单
  parent: string

  // 菜单的分组
  group: string

  // 版本号
  version: number

  // 子节点
  children: Menu[]

  // 创建时间
  createTime: string

  // 更新事件
  updateTime: string
}

export const useLeftMenu = () => {
  const menus = ref<Menu[]>()

  const queryMenus = async () => {
    const res = await findAllMenus()
    if (isSuccessRes(res)) {
      // 保存菜单树，供左侧菜单组件渲染
      menus.value = res.data
    }
  }

  onMounted(() => {
    queryMenus()
  })

  return {
    menus,
  }
}
