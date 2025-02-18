<template>
  <view class="proposal-create">
    <view class="card">
      <view class="form-item">
        <text class="label">提案类型</text>
        <view class="type-selector">
          <view class="type-option" 
                :class="{ active: type === 'renda' }"
                @tap="type = 'renda'">
            人大建议
          </view>
          <view class="type-option" 
                :class="{ active: type === 'zhengxie' }"
                @tap="type = 'zhengxie'">
            政协提案
          </view>
        </view>
      </view>

      <view class="form-item">
        <text class="label">标题</text>
        <input class="input" 
               v-model="title" 
               placeholder="请输入标题" />
      </view>

      <view class="form-item">
        <text class="label">承办部门</text>
        <department-select v-model="department" />
      </view>

      <view class="form-item">
        <text class="label">文件上传</text>
        <text class="tip">请在电脑端上传文件</text>
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
import DepartmentSelect from '@/components/DepartmentSelect'

export default {
  components: {
    DepartmentSelect
  },
  
  data() {
    return {
      type: 'renda',
      title: '',
      department: ''
    }
  },

  computed: {
    isValid() {
      return this.title.trim() && this.department
    }
  },

  methods: {
    ...mapActions('proposal', ['submitProposal']),
    
    async submit() {
      if (!this.isValid) return
      
      try {
        uni.showLoading({ title: '提交中' })
        await this.submitProposal({
          type: this.type,
          title: this.title,
          department: this.department
        })
        uni.showToast({ title: '提交成功' })
        uni.navigateBack()
      } catch (error) {
        uni.showToast({
          title: '提交失败',
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
.proposal-create {
  padding: 20rpx;
  padding-bottom: 120rpx;
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

.type-selector {
  display: flex;
  gap: 20rpx;
}

.type-option {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #666;
}

.type-option.active {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.input {
  height: 80rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
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
