<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image class="avatar" src="/static/avatar.png" mode="aspectFill"></image>
        <view class="info">
          <text class="name">张三</text>
          <text class="role">项目管理员</text>
        </view>
      </view>
      <view class="stats">
        <view class="stat-item">
          <text class="value">12</text>
          <text class="label">我的项目</text>
        </view>
        <view class="stat-item">
          <text class="value">5</text>
          <text class="label">待处理</text>
        </view>
      </view>
    </view>
    
    <!-- 功能列表 -->
    <view class="menu-list">
      <view class="menu-group">
        <view class="menu-item" v-for="item in menuItems" :key="item.id" @tap="handleMenuClick(item)">
          <view class="left">
            <text class="iconfont" :class="item.icon"></text>
            <text class="text">{{item.text}}</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-group">
        <view class="menu-item" @tap="handleLogout">
          <view class="left">
            <text class="iconfont icon-logout"></text>
            <text class="text">退出登录</text>
          </view>
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { id: 1, text: '个人信息', icon: 'icon-user' },
  { id: 2, text: '消息通知', icon: 'icon-notice' },
  { id: 3, text: '系统设置', icon: 'icon-setting' },
  { id: 4, text: '关于我们', icon: 'icon-about' }
])

const handleMenuClick = (item) => {
  // 处理菜单点击
  uni.showToast({
    title: `点击了${item.text}`,
    icon: 'none'
  })
}

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #F5F7FA;
  padding-bottom: env(safe-area-inset-bottom);
}

.user-card {
  background: linear-gradient(135deg, #40A9FF 0%, #1890FF 100%);
  padding: 60rpx 30rpx 30rpx;
  color: #FFFFFF;
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      border: 4rpx solid rgba(255, 255, 255, 0.3);
    }
    
    .info {
      margin-left: 20rpx;
      
      .name {
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
      }
      
      .role {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }
  
  .stats {
    display: flex;
    
    .stat-item {
      flex: 1;
      text-align: center;
      
      .value {
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 4rpx;
        display: block;
      }
      
      .label {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }
}

.menu-list {
  padding: 30rpx;
  
  .menu-group {
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 2rpx solid #F5F5F5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .left {
        display: flex;
        align-items: center;
        
        .iconfont {
          font-size: 40rpx;
          color: #1890FF;
          margin-right: 20rpx;
        }
        
        .text {
          font-size: 28rpx;
          color: #333333;
        }
      }
      
      .iconfont.icon-arrow-right {
        font-size: 32rpx;
        color: #999999;
      }
    }
  }
}
</style>
