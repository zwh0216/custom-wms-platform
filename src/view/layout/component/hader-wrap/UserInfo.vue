<script setup lang="ts">
import { useUserStore } from '@/lib/store/userStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 记录头像地址是否加载失败，失败后使用首字母头像兜底
const isAvatarLoadFailed = ref(false)

// 优先展示昵称，没有昵称时展示用户名
const displayName = computed(
  () => userInfo.value?.nickName || userInfo.value?.userName || '未登录',
)

// 获取用户名或昵称的首个字符
const avatarText = computed(() => {
  const name = userInfo.value?.nickName || userInfo.value?.userName || ''
  return Array.from(name.trim())[0]?.toUpperCase() || '?'
})

// 头像为空或加载失败时，不向头像组件传递图片地址
const avatarUrl = computed(() => {
  if (isAvatarLoadFailed.value) {
    return ''
  }

  return userInfo.value?.profilePhotoUrl?.trim() || ''
})

// 用户头像地址变化后，重新尝试加载
watch(
  () => userInfo.value?.profilePhotoUrl,
  () => {
    isAvatarLoadFailed.value = false
  },
)

// 头像加载失败后切换到首字母头像
const handleAvatarError = () => {
  isAvatarLoadFailed.value = true
}
</script>

<template>
  <div class="user-info">
    <el-avatar
      class="user-avatar"
      :size="32"
      :src="avatarUrl"
      @error="handleAvatarError"
    >
      {{ avatarText }}
    </el-avatar>
    <span class="user-name">{{ displayName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  .user-avatar {
    flex-shrink: 0;
    overflow: hidden;
    color: #606266;
    font-size: 14px;
    background-color: #dcdfe6;
    border-radius: 50%;
  }

  .user-name {
    overflow: hidden;
    color: #303133;
    font-size: 14px;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
