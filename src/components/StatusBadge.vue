<template>
  <view :class="['status-badge', type]">
    <text class="status-text">{{ text }}</text>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.status-badge.success {
  background: #e8f7ed;
  color: #52c41a;
}

.status-badge.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.status-badge.warning {
  background: #fff7e6;
  color: #fa8c16;
}

.status-badge.error {
  background: #fff1f0;
  color: #f5222d;
}

.status-badge.default {
  background: #f5f5f5;
  color: #999;
}

.status-text {
  font-size: 24rpx;
  line-height: 1;
}
</style>
