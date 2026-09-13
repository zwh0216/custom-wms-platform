<script setup lang="ts">
import { MENU_TYPE_ENUM } from '@/const/menu'
import type { Menu } from '../hook/useLeftMenu'

defineOptions({
  // 组件名用于递归渲染多级菜单
  name: 'LeftMenuItem',
})

defineProps<{
  // 当前需要渲染的菜单节点
  menu: Menu
}>()
</script>

<template>
  <!-- 分组菜单使用子菜单，并递归渲染其子节点 -->
  <el-sub-menu
    v-if="menu.type === MENU_TYPE_ENUM.group"
    :index="menu.path"
    :disabled="menu.disabled"
  >
    <template #title>
      <span>{{ menu.title }}</span>
    </template>

    <LeftMenuItem v-for="child in menu.children" :key="child.id" :menu="child" />
  </el-sub-menu>

  <!-- 叶子菜单使用菜单项，点击后由 el-menu 的路由模式处理跳转 -->
  <el-menu-item v-else :index="menu.path" :disabled="menu.disabled">
    {{ menu.title }}
  </el-menu-item>
</template>
