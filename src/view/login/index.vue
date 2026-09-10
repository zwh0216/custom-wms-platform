<script setup lang="ts">
import LoginBox from '@/assets/image/login-box.png'
import LoginForm from './component/LoginForm.vue'
</script>

<template>
  <div class="login-page_wrap">
    <div class="login-box">
      <img class="login-image" :src="LoginBox" />
      <div class="form-box">
        <div class="box-title">工业互联网平台</div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page_wrap {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/image/login-bg.png');
  display: flex;
  align-items: center;
  justify-content: center;

  .login-box {
    display: flex;
    height: 625px;
    width: 1400px;
    overflow: hidden;
    border-radius: 8px;

    .login-image {
      flex: 1 1 auto;
      overflow: hidden;
      object-fit: none;
      object-position: bottom right;
    }

    .form-box {
      flex: 0 0 350px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      padding: 16px;

      .box-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        line-height: 1.2;
      }
    }
  }
}
</style>
