// Platform detection utilities
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const isDesktopDevice = () => {
  return !isMobileDevice();
};

// Feature restriction utilities
export const restrictToDesktop = () => {
  const isDesktop = isDesktopDevice()
  if (!isDesktop) {
    uni.showToast({
      title: "此功能仅支持在电脑端使用",
      icon: "none"
    })
  }
  return isDesktop
}

export const restrictToMobile = () => {
  const isMobile = isMobileDevice()
  if (!isMobile) {
    uni.showToast({
      title: "请使用移动设备访问",
      icon: "none"
    })
  }
  return isMobile
}
