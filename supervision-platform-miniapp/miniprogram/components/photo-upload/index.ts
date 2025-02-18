/// <reference path="../../../typings/index.d.ts" />

interface PhotoInfo {
  path: string;
  date: string;
  location: string;
}

Component({
  data: {
    currentPhoto: null as PhotoInfo | null,
    photos: [] as PhotoInfo[]
  },

  methods: {
    chooseImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.setData({
            currentPhoto: {
              path: res.tempFilePaths[0],
              date: '',
              location: ''
            }
          });
        }
      });
    },

    onDateChange(e: any) {
      this.setData({
        'currentPhoto.date': e.detail.value
      });
    },

    onLocationInput(e: any) {
      this.setData({
        'currentPhoto.location': e.detail.value
      });
    },

    cancelUpload() {
      this.setData({
        currentPhoto: null
      });
    },

    confirmUpload() {
      const { currentPhoto, photos } = this.data;
      if (currentPhoto && currentPhoto.date && currentPhoto.location) {
        const newPhotos = [...photos, currentPhoto];
        this.setData({
          photos: newPhotos,
          currentPhoto: null
        });
        this.triggerEvent('photosUploaded', { photos: newPhotos });
      }
    }
  }
});
