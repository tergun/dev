<template>
  <view class="project-update">
    <view class="card">
      <view class="project-info">
        <text class="project-title">{{ project.title }}</text>
        <text class="department">{{ project.department }}</text>
      </view>

      <view class="form-item">
        <text class="label">形象进度</text>
        <view class="progress-input">
          <slider class="progress-slider" 
                 :value="progress" 
                 @change="handleProgressChange" />
          <text class="progress-value">{{ progress }}%</text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">进展说明</text>
        <textarea class="textarea" 
                  v-model="description"
                  placeholder="请输入项目最新进展情况"
                  :maxlength="200" />
        <text class="word-count">{{ description.length }}/200</text>
      </view>

      <view class="form-item">
        <text class="label">相关文件</text>
        <text class="tip">请在电脑端上传相关文件</text>
      </view>
    </view>

    <view class="action-bar">
      <button class="btn btn-default" @tap="cancel">取消</button>
      <button class="btn btn-primary" 
              :disabled="!isValid"
              @tap="submit">提交</button>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      project: {
        id: '',
        title: '',
        department: ''
      },
      progress: 0,
      description: ''
    }
  },

  computed: {
    isValid() {
      return this.description.trim() && this.progress >= 0
    }
  },

  onLoad(options) {
    // 实际项目中从store或API获取项目信息
    this.project = {
      id: options.id,
      title: '城市轨道交通建设工程',
      department: '市建设局'
    }
    this.progress = 75
  },

  methods: {
    ...mapActions('project', ['updateProjectProgress']),

    handleProgressChange(e) {
      this.progress = e.detail.value
    },

    async submit() {
      if (!this.isValid) return

      try {
        uni.showLoading({ title: '提交中' })
        await this.updateProjectProgress({
          id: this.project.id,
          progress: this.progress,
          description: this.description
        })
        uni.showToast({ title: '更新成功' })
        uni.navigateBack()
      } catch (error) {
        uni.showToast({
          title: '更新失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },

    cancel() {
      uni.navigateBack()
    }
  }
}
</script>

<style>
.project-update {
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.project-info {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.project-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.department {
  font-size: 26rpx;
  color: #666;
}

.form-item {
  margin-bottom: 30rpx;
}

.label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.progress-input {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.progress-slider {
  flex: 1;
}

.progress-value {
  font-size: 28rpx;
  color: #1890ff;
  width: 80rpx;
  text-align: right;
}

.textarea {
  width: 100%;
  height: 200rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
}

.word-count {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  margin-top: 8rpx;
}

.tip {
  font-size: 26rpx;
  color: #999;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 20rpx;
}

.action-bar .btn {
  flex: 1;
}
</style>
