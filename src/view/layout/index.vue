<script setup lang="ts"></script>

<template>
  <div class="layout-wrap">
    <div class="layout_left-menu"></div>
    <div class="layout-page_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrap {
  display: flex;
  overflow: auto;
  height: 100vh;
  width: 100vw;

  .layout_left-menu {
    flex: 0 0 260px;
    height: 100%;
  }

  .layout-page_main {
    flex: 1 1 auto;
  }
}
</style>
