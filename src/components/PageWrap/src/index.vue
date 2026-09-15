<script setup lang="ts"></script>

<template>
  <div class="page-wrap_shell">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-wrap_shell {
  height: calc(100% - 32px);
  margin: 16px;
  padding: 16px;
  background-color: white;
}
</style>
