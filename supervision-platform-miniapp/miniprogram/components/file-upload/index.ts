/// <reference path="../../../typings/index.d.ts" />

Component({
  properties: {
    maxCount: {
      type: Number,
      value: 9
    }
  },

  data: {
    files: [] as WechatMiniprogram.ChooseFile[]
  },

  methods: {
    chooseFile() {
      const that = this;
      // 只有PC端可以上传文件
      if (!wx.getSystemInfoSync().windowWidth) {
        wx.showToast({
          title: '请在电脑端上传文件',
          icon: 'none'
        });
        return;
      }
      wx.chooseMessageFile({
        count: this.properties.maxCount,
        type: 'file',
        extension: ['.doc', '.docx', '.xls', '.xlsx', '.pdf'],
        success(res) {
          that.setData({
            files: res.tempFiles
          });
          that.triggerEvent('filesSelected', { files: res.tempFiles });
        }
      });
    },

    clearFiles() {
      this.setData({
        files: []
      });
      this.triggerEvent('filesSelected', { files: [] });
    },

    uploadFiles() {
      // TODO: 实现文件上传逻辑
      this.triggerEvent('upload', { files: this.data.files });
    }
  }
});
