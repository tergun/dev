/// <reference path="../../typings/index.d.ts" />

export const isPC = (): boolean => {
  // 在小程序中，所有访问都是移动端
  return false;
};

export const isMobile = (): boolean => {
  return true;
};

export const canUpload = (): boolean => {
  // 只有PC端可以上传、下载、修改
  return false;
};
