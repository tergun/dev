<template>
  <view class="mobile-container" :class="{ 'mobile-only': mobileOnly }">
    <slot v-if="canAccess"></slot>
    <view v-else class="access-denied">
      <uni-icons type="info" size="64" color="#909399"></uni-icons>
      <text class="message">{{ message }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { isMobileDevice } from '@/utils/platform'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  mobileOnly: {
    type: Boolean,
    default: true
  }
})

const canAccess = ref(true)
const message = ref('')
const authStore = useAuthStore()

onMounted(() => {
  if (props.mobileOnly && !isMobileDevice()) {
    canAccess.value = false
    message.value = '请使用移动设备访问'
  } else if (!authStore.checkPlatformAccess()) {
    canAccess.value = false
    message.value = '无访问权限'
  }
})
</script>

<style lang="scss">
.mobile-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  
  &.mobile-only {
    max-width: 750px;
    margin: 0 auto;
  }

  .access-denied {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    
    .message {
      margin-top: 16px;
      font-size: 16px;
      color: #909399;
    }
  }
}
</style>
