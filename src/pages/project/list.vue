<template>
  <view class="project-list">
    <view class="list-container">
      <view class="card project-item" v-for="(item, index) in projectList" :key="index" @tap="goToDetail(item)">
        <view class="project-header">
          <text class="project-title">{{ item.title }}</text>
          <view class="update-status" :class="{ 'not-updated': !item.isUpdated }">
            {{ item.isUpdated ? '已更新' : '未更新' }}
          </view>
        </view>
        
        <view class="project-info">
          <view class="info-row">
            <view class="info-item">
              <text class="label">责任单位：</text>
              <text class="value">{{ item.department }}</text>
            </view>
            <view class="info-item">
              <text class="label">分管领导：</text>
              <text class="value">{{ item.leader }}</text>
            </view>
          </view>
          
          <view class="progress-section">
            <text class="progress-label">形象进度</text>
            <view class="progress-bar">
              <view class="progress-inner" :style="{ width: item.progress + '%' }"></view>
            </view>
            <text class="progress-value">{{ item.progress }}%</text>
          </view>

          <view class="status-section">
            <view class="status-item" v-for="(status, idx) in item.approvalStatus" :key="idx">
              <view class="status-dot" :class="{ 'completed': status.completed }"></view>
              <text class="status-text">{{ status.name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projectList: [
        {
          title: '城市轨道交通建设工程',
          department: '市建设局',
          leader: '张三',
          progress: 75,
          isUpdated: true,
          approvalStatus: [
            { name: '立项', completed: true },
            { name: '环评', completed: true },
            { name: '规划', completed: false },
            { name: '施工', completed: false }
          ]
        },
        {
          title: '智慧城市数字化转型项目',
          department: '市信息化局',
          leader: '李四',
          progress: 30,
          isUpdated: false,
          approvalStatus: [
            { name: '立项', completed: true },
            { name: '环评', completed: false },
            { name: '规划', completed: false },
            { name: '施工', completed: false }
          ]
        }
      ]
    }
  },
  methods: {
    goToDetail(item) {
      uni.navigateTo({
        url: `/pages/project/detail?id=${item.id}`
      })
    }
  }
}
</script>

<style scoped>
.project-list {
  padding: 20rpx;
}

.project-item {
  margin-bottom: 30rpx;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.project-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  flex: 1;
  margin-right: 20rpx;
}

.update-status {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  background: #e8f7ed;
  color: #52c41a;
}

.update-status.not-updated {
  background: #fff1f0;
  color: #f5222d;
}

.project-info {
  color: #666;
}

.info-row {
  display: flex;
  margin-bottom: 24rpx;
}

.info-item {
  flex: 1;
  display: flex;
}

.label {
  color: #999;
  width: 140rpx;
}

.value {
  flex: 1;
}

.progress-section {
  margin-bottom: 24rpx;
}

.progress-label {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 12rpx;
  display: block;
}

.progress-bar {
  height: 8rpx;
  background: #f0f0f0;
  border-radius: 4rpx;
  overflow: hidden;
  margin: 8rpx 0;
  flex: 1;
}

.progress-inner {
  height: 100%;
  background: #1890ff;
  transition: width 0.3s ease;
}

.progress-value {
  font-size: 24rpx;
  color: #666;
  margin-left: 12rpx;
}

.status-section {
  display: flex;
  justify-content: space-between;
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid #eee;
}

.status-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #d9d9d9;
  margin-right: 8rpx;
}

.status-dot.completed {
  background: #52c41a;
}

.status-text {
  font-size: 24rpx;
  color: #666;
}
</style>
