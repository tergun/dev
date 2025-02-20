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
export const restrictToDesktop = (action) => {
  if (!isDesktopDevice()) {
    uni.showToast({
      title: "此功能仅支持在电脑端使用",
      icon: "none",
    });
    return false;
  }
  return true;
};

export const restrictToMobile = (action) => {
  if (!isMobileDevice()) {
    uni.showToast({
      title: "请使用移动设备访问",
      icon: "none",
    });
    return false;
  }
  return true;
};
