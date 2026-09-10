<script setup lang="ts">
import { FormWrap, type FormWrapRef } from '@/components/form-wrap'
import { FORM_COMPONENTS } from '../lib/formComponents'
import { ref, useTemplateRef } from 'vue'
import { userLogin } from '@/api/login/login.server'
import { LOCAL_STORAGE_KEY, ls } from '@/lib/localStorage'
import { useRouter } from 'vue-router'

const formRef = useTemplateRef<FormWrapRef>('formRef')

const formValue = ref({})

const router = useRouter()

// 登录操作
const loginHandler = async () => {
  const formValue = await formRef.value?.validate()
  const res = await userLogin(formValue)
  if (res) {
    // 缓存token
    const token = res.data.token
    ls.setStorage(LOCAL_STORAGE_KEY.token, token)

    // 跳转到首页
    router.push('/dashborad')
  }
}
</script>

<template>
  <div class="login-form-wrap">
    <FormWrap
      ref="formRef"
      v-model="formValue"
      :components="FORM_COMPONENTS"
      :is-readonly="false"
      label-width="80px"
    />
    <el-button class="button-wrap" type="primary" @click="loginHandler">
      登录
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.login-form-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .button-wrap {
    margin-top: 48px;
    width: 100%;
  }
}
</style>
