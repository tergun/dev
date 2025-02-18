export default {
  methods: {
    async handleFilePreview(file) {
      // 移动端仅显示提示，实际预览在PC端进行
      uni.showToast({
        title: '请在电脑端查看文件',
        icon: 'none'
      })
    },

    async handleFileDownload(file) {
      // 移动端仅显示提示，实际下载在PC端进行
      uni.showToast({
        title: '请在电脑端下载文件',
        icon: 'none'
      })
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    getFileIcon(fileName) {
      const ext = fileName.split('.').pop().toLowerCase()
      const icons = {
        'doc': '📝',
        'docx': '📝',
        'xls': '📊',
        'xlsx': '📊',
        'pdf': '📄'
      }
      return icons[ext] || '📄'
    }
  }
}
