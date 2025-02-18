<template>
  <view class="review-panel">
    <view class="review-header">
      <text class="review-title">审核意见</text>
    </view>
    
    <view class="review-options">
      <view class="option-item" 
            :class="{ active: decision === 'approve' }"
            @tap="selectDecision('approve')">
        <text class="option-icon">✓</text>
        <text class="option-text">同意</text>
      </view>
      
      <view class="option-item" 
            :class="{ active: decision === 'reject' }"
            @tap="selectDecision('reject')">
        <text class="option-icon">✕</text>
        <text class="option-text">退回修改</text>
      </view>
    </view>
    
    <view class="comment-area" v-if="decision === 'reject'">
      <textarea class="comment-input"
                v-model="comment"
                placeholder="请输入退回原因（必填）"
                :maxlength="200"
                auto-height />
      <text class="word-count">{{ comment.length }}/200</text>
    </view>
    
    <view class="action-buttons">
      <button class="btn btn-default" @tap="cancel">取消</button>
      <button class="btn btn-primary" 
              :disabled="!isValid"
              @tap="submit">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      decision: '',
      comment: ''
    }
  },
  computed: {
    isValid() {
      if (!this.decision) return false
      if (this.decision === 'reject' && !this.comment.trim()) return false
      return true
    }
  },
  methods: {
    selectDecision(decision) {
      this.decision = decision
      if (decision === 'approve') {
        this.comment = ''
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      if (!this.isValid) return
      this.$emit('submit', {
        decision: this.decision,
        comment: this.comment
      })
    }
  }
}
</script>

<style>
.review-panel {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
}

.review-header {
  margin-bottom: 30rpx;
}

.review-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.review-options {
  display: flex;
  margin-bottom: 30rpx;
}

.option-item {
  flex: 1;
  height: 80rpx;
  margin: 0 10rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-item.active {
  background: #e6f7ff;
  border-color: #1890ff;
}

.option-icon {
  font-size: 32rpx;
  margin-right: 8rpx;
}

.option-item.active .option-icon,
.option-item.active .option-text {
  color: #1890ff;
}

.comment-area {
  margin-bottom: 30rpx;
}

.comment-input {
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
}

.word-count {
  text-align: right;
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}

.action-buttons .btn {
  width: 200rpx;
  margin-left: 20rpx;
}

.btn:disabled {
  opacity: 0.5;
}
</style>
