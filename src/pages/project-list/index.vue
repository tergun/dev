<template>
  <view class="project-list">
    <view class="header">
      <text class="title">项目列表</text>
    </view>
    <view class="list-container">
      <view 
        v-for="(project, index) in projects" 
        :key="index"
        class="project-item"
        @tap="goToDetail(project.id)"
      >
        <view class="project-name">{{ project.name }}</view>
        <view class="project-info">
          <text class="label">投资主体：</text>
          <text class="value">{{ project.investor }}</text>
        </view>
        <view class="project-info">
          <text class="label">总投资：</text>
          <text class="value">{{ project.totalInvestment }}万元</text>
        </view>
        <view class="update-status" :class="{ active: project.recentlyUpdated }">
          {{ project.recentlyUpdated ? '7日内有更新' : '7日内无更新' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          id: 1,
          name: '示例项目一',
          investor: '示例投资公司',
          totalInvestment: 10000,
          recentlyUpdated: true
        },
        {
          id: 2,
          name: '示例项目二',
          investor: '示例投资公司',
          totalInvestment: 20000,
          recentlyUpdated: false
        }
      ]
    }
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/project-detail/index?id=${id}`
      })
    }
  }
}
</script>

<style>
.project-list {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.header {
  padding: 30rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.project-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.project-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.project-info {
  display: flex;
  font-size: 28rpx;
  margin-bottom: 10rpx;
}

.label {
  color: #666;
  width: 160rpx;
}

.value {
  color: #333;
  flex: 1;
}

.update-status {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  font-size: 24rpx;
  color: #999;
  padding: 6rpx 20rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
}

.update-status.active {
  color: #2d8cf0;
  background: rgba(45, 140, 240, 0.1);
}
</style>
