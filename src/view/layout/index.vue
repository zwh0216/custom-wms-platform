<script setup lang="ts">
import HeaderWrap from './component/hader-wrap/index.vue'
import LeftMenu from './component/LeftMenu.vue'
</script>

<template>
  <div class="layout-wrap">
    <div class="layout-header">
      <header-wrap />
    </div>
    <div class="layout-body">
      <div class="layout_left-menu">
        <left-menu />
      </div>
      <div class="layout-page_main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #ebeef5;
  gap: 4px;

  .layout-header {
    height: 68px;
    flex: 0 0 68px;
  }

  .layout-body {
    display: flex;
    overflow: auto;
    flex: 1 1 auto;
    height: calc(100% - 68px);

    .layout_left-menu {
      flex: 0 0 260px;
      height: 100%;
    }

    .layout-page_main {
      flex: 1 1 auto;
    }
  }
}
</style>
