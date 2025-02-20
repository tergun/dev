import { computed } from "vue";
import { isMobileDevice, isDesktopDevice } from "@/utils/platform";

export const usePlatformRestrictions = () => {
  const isDesktop = computed(() => isDesktopDevice());
  const isMobile = computed(() => isMobileDevice());

  // 限制桌面端功能
  const restrictToDesktop = (action = "") => {
    if (!isDesktop.value) {
      uni.showToast({
        title: action ? `${action}仅支持在电脑端使用` : "此功能仅支持在电脑端使用",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    return true;
  };

  // 限制移动端功能
  const restrictToMobile = () => {
    if (!isMobile.value) {
      uni.showToast({
        title: "请使用移动设备访问",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    return true;
  };

  // 文件上传权限
  const canUpload = computed(() => {
    const allowed = isDesktop.value;
    if (!allowed) {
      restrictToDesktop("文件上传");
    }
    return allowed;
  });

  // 文件下载权限
  const canDownload = computed(() => {
    const allowed = isDesktop.value;
    if (!allowed) {
      restrictToDesktop("文件下载");
    }
    return allowed;
  });

  // 修改权限
  const canModify = computed(() => {
    const allowed = isDesktop.value;
    if (!allowed) {
      restrictToDesktop("内容修改");
    }
    return allowed;
  });

  return {
    isDesktop,
    isMobile,
    restrictToDesktop,
    restrictToMobile,
    canUpload,
    canDownload,
    canModify,
  };
};
