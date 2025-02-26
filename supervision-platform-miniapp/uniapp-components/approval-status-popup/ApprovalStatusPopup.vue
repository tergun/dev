<template>
  <view class="popup-wrapper">
    <view class="popup-content">
      <view class="table">
        <view class="table-header-section">
          <view class="section-title">审批手续办理情况</view>
        </view>
        <scroll-view class="scroll-container" scroll-y>
          <view class="table-content">
            <template v-for="(row, index) in tableData" :key="index">
              <!-- First item -->
              <view class="table-row">
                <view class="table-group">
                  <view class="table-header">
                    <text class="header-text">{{row.header1}}</text>
                  </view>
                  <view class="table-cell" :class="getStatusClass(row.value1)">
                    <text class="status-dot" v-if="row.value1 === '是'"></text>
                    <text class="cell-text">{{row.value1}}</text>
                  </view>
                </view>
              </view>
              <!-- Second item (now in a separate row) -->
              <view class="table-row">
                <view class="table-group">
                  <view class="table-header">
                    <text class="header-text">{{row.header2}}</text>
                  </view>
                  <view class="table-cell" :class="getStatusClass(row.value2)">
                    <text class="status-dot" v-if="row.value2 === '是'"></text>
                    <text class="cell-text">{{row.value2}}</text>
                  </view>
                </view>
              </view>
            </template>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="popup-close-wrapper">
      <view class="connect-line"></view>
      <view class="popup-close" @tap="closePopup">
        <text class="close-icon">×</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ApprovalStatusPopup',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getStatusClass(value) {
      if (value === '是') {
        return 'status-yes';
      } else if (value === '否') {
        return 'status-no';
      }
      return '';
    },
    closePopup() {
      this.$emit('close');
    }
  }
}
</script>

<style>
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  width: 80%;
  max-width: 600rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 30rpx;
}

.table {
  width: 100%;
}

.table-header-section {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.scroll-container {
  max-height: 600rpx;
}

.table-content {
  width: 100%;
}

.table-row {
  margin-bottom: 20rpx;
  width: 100%;
}

.table-group {
  width: 100%;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  overflow: hidden;
}

.table-header {
  background-color: #f8f8f8;
  padding: 16rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.header-text {
  font-size: 28rpx;
  color: #666;
}

.table-cell {
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #4CAF50;
  margin-right: 10rpx;
}

.cell-text {
  font-size: 28rpx;
  color: #333;
}

.status-yes {
  color: #4CAF50;
}

.status-no {
  color: #F44336;
}

.popup-close-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30rpx;
}

.connect-line {
  width: 2rpx;
  height: 40rpx;
  background-color: #ddd;
}

.popup-close {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.close-icon {
  font-size: 40rpx;
  color: #999;
  line-height: 1;
}
</style>
