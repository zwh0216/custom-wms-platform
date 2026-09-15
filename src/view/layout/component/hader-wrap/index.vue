<script setup>
import UserInfo from './UserInfo.vue'
</script>

<template>
  <div class="header-wrap">
    <div class="header-front">
      <div class="title-warp">CUSTOM MES</div>
    </div>
    <div class="header-center"></div>
    <div class="header-backend"><UserInfo /></div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrap {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-front {
    display: flex;
    align-items: center;

    .title-warp {
      font-size: 36px;
      color: #027aff;
    }
  }

  .header-center {
    display: flex;
    align-items: center;
  }

  .header-backend {
    display: flex;
    align-items: center;
  }
}
</style>
