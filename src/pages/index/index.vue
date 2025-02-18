<template>
  <view class="container">
    <view class="welcome">
      <text class="title">督办管理平台</text>
      <text class="subtitle">欢迎使用</text>
    </view>
    
    <view class="menu">
      <view class="menu-item" @tap="navigateTo('/pages/proposal/list')">
        <text class="menu-icon">📋</text>
        <text class="menu-text">建议提案管理</text>
      </view>
      <view class="menu-item" @tap="navigateTo('/pages/project/list')">
        <text class="menu-icon">🏗️</text>
        <text class="menu-text">重点项目管理</text>
      </view>
    </view>

    <view class="role-info">
      <text class="role-text">当前身份：{{ roleName }}</text>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { USER_ROLES } from '@/utils/auth'

export default {
  computed: {
    ...mapState('user', ['role']),
    roleName() {
      const roleMap = {
        [USER_ROLES.GOV_OFFICE]: '政府办',
        [USER_ROLES.PEOPLE_OFFICE]: '人大办',
        [USER_ROLES.CONSULT_OFFICE]: '政协办',
        [USER_ROLES.DEPARTMENT]: '部门单位'
      }
      return roleMap[this.role] || '未知身份'
    }
  },
  methods: {
    navigateTo(url) {
      uni.switchTab({
        url
      })
    }
  }
}
</script>

<style>
.container {
  padding: 40rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
}

.welcome {
  text-align: center;
  margin-bottom: 60rpx;
  margin-top: 60rpx;
}

.title {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.subtitle {
  font-size: 32rpx;
  color: #666;
}

.menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  margin-bottom: 60rpx;
}

.menu-item {
  background: #fff;
  padding: 40rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.menu-icon {
  font-size: 48rpx;
  margin-right: 30rpx;
}

.menu-text {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.role-info {
  margin-top: auto;
  padding: 20rpx 40rpx;
  background: #fff;
  border-radius: 30rpx;
}

.role-text {
  font-size: 28rpx;
  color: #666;
}
</style>
