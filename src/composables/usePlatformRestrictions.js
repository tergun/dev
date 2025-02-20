import { computed } from 'vue'
import { isMobileDevice, isDesktopDevice } from '@/utils/platform'

export const usePlatformRestrictions = () => {
  const isDesktop = computed(() => isDesktopDevice())
  const isMobile = computed(() => isMobileDevice())

  const restrictToDesktop = (action) => {
    if (!isDesktop.value) {
      uni.showToast({
        title: '此功能仅支持在电脑端使用',
        icon: 'none'
      })
      return false
    }
    return true
  }

  const restrictToMobile = (action) => {
    if (!isMobile.value) {
      uni.showToast({
        title: '请使用移动设备访问',
        icon: 'none'
      })
      return false
    }
    return true
  }

  const canUpload = computed(() => isDesktop.value)
  const canDownload = computed(() => isDesktop.value)
  const canModify = computed(() => isDesktop.value)

  return {
    isDesktop,
    isMobile,
    restrictToDesktop,
    restrictToMobile,
    canUpload,
    canDownload,
    canModify
  }
}
