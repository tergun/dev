/// <reference path="../../../typings/index.d.ts" />

Component({
  data: {
    file: null as WechatMiniprogram.ChooseFile | null
  },

  methods: {
    chooseFile() {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        extension: ['.pdf', '.doc', '.docx'],
        success: (res) => {
          this.setData({
            file: res.tempFiles[0]
          });
        }
      });
    },

    clearFile() {
      this.setData({
        file: null
      });
    },

    submitFile() {
      if (this.data.file) {
        this.triggerEvent('upload', { file: this.data.file });
      }
    }
  }
});
