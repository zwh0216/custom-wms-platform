<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLeftMenu } from '../hook/useLeftMenu'
import LeftMenuItem from './LeftMenuItem.vue'

const { menus } = useLeftMenu()

// 使用当前路由路径标记激活的菜单
const route = useRoute()
</script>

<template>
  <el-menu class="menu-wrap" :default-active="route.path" router>
    <!-- 根据菜单类型递归渲染子菜单和叶子菜单 -->
    <LeftMenuItem v-for="menu in menus" :key="menu.id" :menu="menu" />
  </el-menu>
</template>

<style lang="scss" scoped>
.menu-wrap {
  height: 100%;
}
</style>
