/// <reference path="../../../typings/index.d.ts" />

Page({
  data: {
    files: [] as WechatMiniprogram.ChooseFile[],
    currentStep: 1,
    selectedDepartments: [] as Array<{id: string; name: string}>
  },

  onLoad() {
    // 页面加载时的初始化
  },

  onFilesSelected(e: any) {
    this.setData({
      files: e.detail.files
    });
  },

  onUpload() {
    if (this.data.files.length > 0) {
      // TODO: 实现文件上传逻辑
      this.setData({
        currentStep: 2
      });
    }
  },

  onDepartmentsSelected(e: any) {
    this.setData({
      selectedDepartments: e.detail.departments,
      currentStep: 3
    });
  },

  onResponsibilityConfirm(e: any) {
    const { isResponsible } = e.detail;
    if (isResponsible !== 'none') {
      this.setData({
        currentStep: 4
      });
    }
  },

  onPhotosUploaded(e: any) {
    const { photos } = e.detail;
    this.setData({
      photos,
      currentStep: 5
    });
  },

  onReplyUploaded(e: any) {
    const { file } = e.detail;
    this.setData({
      replyFile: file,
      currentStep: 6
    });
  }
});
