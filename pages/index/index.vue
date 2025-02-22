<template>
  <view class="container">
    <!-- 顶部状态栏 -->
    <view class="status-bar">
      <text class="title">项目监管平台</text>
    </view>
    
    <!-- 统计卡片 -->
    <view class="stats-section">
      <view class="stats-card">
        <text class="stats-value">128</text>
        <text class="stats-label">总项目数</text>
      </view>
      <view class="stats-card">
        <text class="stats-value">45</text>
        <text class="stats-label">进行中</text>
      </view>
      <view class="stats-card">
        <text class="stats-value">83</text>
        <text class="stats-label">已完成</text>
      </view>
    </view>
    
    <!-- 快速操作区 -->
    <view class="quick-actions">
      <view class="section-title">快速操作</view>
      <view class="action-grid">
        <view class="action-item" @tap="navigateToProjects">
          <view class="action-icon">
            <text class="iconfont icon-project"></text>
          </view>
          <text class="action-text">项目列表</text>
        </view>
        <view class="action-item">
          <view class="action-icon">
            <text class="iconfont icon-approval"></text>
          </view>
          <text class="action-text">待审批</text>
        </view>
        <view class="action-item">
          <view class="action-icon">
            <text class="iconfont icon-report"></text>
          </view>
          <text class="action-text">统计报表</text>
        </view>
        <view class="action-item">
          <view class="action-icon">
            <text class="iconfont icon-notice"></text>
          </view>
          <text class="action-text">通知公告</text>
        </view>
      </view>
    </view>
    
    <!-- 最近项目 -->
    <view class="recent-projects">
      <view class="section-title">最近项目</view>
      <view class="project-list">
        <view class="project-item" v-for="project in recentProjects" :key="project.id" @tap="navigateToDetail(project.id)">
          <image class="project-image" :src="project.image" mode="aspectFill"></image>
          <view class="project-info">
            <text class="project-name">{{project.name}}</text>
            <text class="project-status" :class="project.status.type">{{project.status.text}}</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const recentProjects = ref([
  {
    id: 1,
    name: '智慧城市建设项目',
    image: '/static/projects/smart-city.png',
    status: { type: 'progress', text: '进行中' }
  },
  {
    id: 2,
    name: '绿色能源产业园',
    image: '/static/projects/green-energy.png',
    status: { type: 'success', text: '已完成' }
  },
  {
    id: 3,
    name: '智能制造产业基地',
    image: '/static/projects/smart-manufacturing.png',
    status: { type: 'progress', text: '进行中' }
  }
])

const navigateToProjects = () => {
  uni.switchTab({
    url: '/pages/project/list'
  })
}

const navigateToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/project/detail?id=${id}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: 30rpx;
}

.status-bar {
  background: linear-gradient(135deg, #40A9FF 0%, #1890FF 100%);
  padding: 60rpx 30rpx 30rpx;
  
  .title {
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: 600;
  }
}

.stats-section {
  margin: -40rpx 30rpx 30rpx;
  display: flex;
  gap: 20rpx;
  
  .stats-card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
    
    .stats-value {
      font-size: 36rpx;
      font-weight: 600;
      color: #1890FF;
      margin-bottom: 8rpx;
    }
    
    .stats-label {
      font-size: 24rpx;
      color: #666666;
    }
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 24rpx;
  padding: 0 30rpx;
}

.quick-actions {
  margin-bottom: 30rpx;
  
  .action-grid {
    padding: 0 15rpx;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
    
    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      
      .action-icon {
        width: 80rpx;
        height: 80rpx;
        background: rgba(24, 144, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
        
        .iconfont {
          font-size: 40rpx;
          color: #1890FF;
        }
      }
      
      .action-text {
        font-size: 24rpx;
        color: #666666;
      }
    }
  }
}

.recent-projects {
  .project-list {
    padding: 0 30rpx;
    
    .project-item {
      background: #FFFFFF;
      border-radius: 16rpx;
      padding: 20rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
      
      .project-image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
      }
      
      .project-info {
        flex: 1;
        
        .project-name {
          font-size: 28rpx;
          color: #333333;
          margin-bottom: 8rpx;
        }
        
        .project-status {
          font-size: 24rpx;
          padding: 4rpx 12rpx;
          border-radius: 4rpx;
          
          &.progress {
            background: rgba(24, 144, 255, 0.1);
            color: #1890FF;
          }
          
          &.success {
            background: rgba(82, 196, 26, 0.1);
            color: #52C41A;
          }
        }
      }
      
      .iconfont {
        font-size: 32rpx;
        color: #999999;
      }
    }
  }
}
</style>
