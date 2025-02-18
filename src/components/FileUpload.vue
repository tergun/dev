<template>
  <view class="file-upload">
    <view class="upload-area" @tap="selectFile" v-if="!readonly" :class="{ 'uploading': uploading }">
      <view class="upload-content">
        <text class="upload-icon">{{ uploading ? '⏳' : '📤' }}</text>
        <text class="upload-text">{{ uploading ? '文件上传中...' : '点击上传文件' }}</text>
        <text class="upload-desc">支持Word、Excel、PDF格式，单个文件不超过{{ formatFileSize(MAX_FILE_SIZE) }}</text>
      </view>
    </view>
    
    <view class="file-list">
      <view class="file-item" v-for="(file, index) in fileList" :key="index">
        <text class="file-icon" @tap="handleFileAction(file)">
          {{ getFileIcon(file.type) }}
        </text>
        <view class="file-info" @tap="handleFileAction(file)">
          <text class="file-name">{{ file.name }}</text>
          <text class="file-size">{{ formatFileSize(file.size) }}</text>
          <text class="upload-time" v-if="file.uploadTime">{{ formatDate(file.uploadTime) }}</text>
        </view>
        <view class="file-actions">
          <text class="file-status" v-if="showStatus">{{ file.status }}</text>
          <text class="action-icon" v-if="!readonly && !isMobile" @tap.stop="deleteFile(index)">✕</text>
        </view>
      </view>
      <view class="empty-state" v-if="fileList.length === 0">
        <text class="empty-icon">📂</text>
        <text class="empty-text">{{ isMobile ? '暂无文件' : '点击上方区域上传文件' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import fileApi from '@/api/file'
import { MAX_FILE_SIZE } from '@/utils/constants'

export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      fileList: [],
      uploading: false
    }
  },

  computed: {
    isMobile() {
      // #ifdef H5
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      // #endif
      // #ifdef MP-WEIXIN
      return true
      // #endif
    }
  },

  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    selectFile() {
      if (this.isMobile) {
        uni.showToast({
          title: '请在电脑端上传文件',
          icon: 'none'
        })
        return
      }

      // Create hidden input for file selection
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      input.accept = '.doc,.docx,.xls,.xlsx,.pdf'
      input.style.display = 'none'
      
      input.onchange = async (event) => {
        const files = Array.from(event.target.files)
        if (!files.length) return

        try {
          this.uploading = true
          const results = await fileApi.uploadFiles(files, this.type)
          this.fileList.push(...results)
          this.$emit('upload-success', results)
        } catch (error) {
          uni.showToast({
            title: error.message,
            icon: 'none'
          })
        } finally {
          this.uploading = false
          document.body.removeChild(input)
        }
      }

      document.body.appendChild(input)
      input.click()
    },

    getFileIcon(type) {
      const icons = {
        'doc': '📝',
        'docx': '📝',
        'xls': '📊',
        'xlsx': '📊',
        'pdf': '📄'
      }
      return icons[type] || '📄'
    },

    async deleteFile(index) {
      const file = this.fileList[index]
      try {
        // TODO: Implement file deletion in cloud storage
        this.fileList.splice(index, 1)
        this.$emit('delete-success', file)
      } catch (error) {
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    },

    async handleFileAction(file) {
      if (this.isMobile) {
        uni.showToast({
          title: '请在电脑端操作文件',
          icon: 'none'
        })
        return
      }
      
      try {
        const url = await fileApi.getPreviewUrl(file.path)
        window.open(url, '_blank')
      } catch (error) {
        uni.showToast({
          title: '预览失败',
          icon: 'none'
        })
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }
  }
}
</script>

<style>
.file-upload {
  width: 100%;
}

.upload-area {
  border: 2rpx dashed #d9d9d9;
  border-radius: 8rpx;
  background: #fafafa;
  padding: 40rpx;
  text-align: center;
  margin-bottom: 20rpx;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.upload-area.uploading {
  pointer-events: none;
  opacity: 0.7;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.upload-text {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 12rpx;
}

.upload-desc {
  font-size: 24rpx;
  color: #999;
}

.file-list {
  background: #fff;
  border-radius: 8rpx;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.file-item:last-child {
  border-bottom: none;
}

.file-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.file-size {
  font-size: 24rpx;
  color: #999;
}

.file-status {
  font-size: 24rpx;
  color: #1890ff;
  margin-right: 20rpx;
}

.action-icon {
  font-size: 32rpx;
  color: #999;
  padding: 10rpx;
  cursor: pointer;
}

.action-icon:hover {
  color: #f5222d;
}

.upload-time {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.empty-state {
  text-align: center;
  padding: 40rpx;
  color: #999;
}

.empty-icon {
  font-size: 64rpx;
  margin-bottom: 16rpx;
  display: block;
}

.empty-text {
  font-size: 28rpx;
}
</style>
