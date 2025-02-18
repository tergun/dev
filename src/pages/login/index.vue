<template>
  <view class="login-container">
    <view class="login-box">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <view class="title">重点项目督办管理平台</view>
      <view class="form-item">
        <input type="text" v-model="username" placeholder="请输入用户名" class="input" />
      </view>
      <view class="form-item">
        <input type="password" v-model="password" placeholder="请输入密码" class="input" />
      </view>
      <button @tap="handleLogin" class="login-btn">登 录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // TODO: Implement login logic
      if (this.username && this.password) {
        uni.showLoading({
          title: '登录中...'
        })
        // Mock login success
        setTimeout(() => {
          uni.hideLoading()
          uni.navigateTo({
            url: '/pages/project-list/index'
          })
        }, 1500)
      } else {
        uni.showToast({
          title: '请输入用户名和密码',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 30rpx;
}

.login-box {
  width: 100%;
  max-width: 600rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin: 0 auto 30rpx;
  display: block;
}

.title {
  font-size: 36rpx;
  color: #333;
  text-align: center;
  margin-bottom: 50rpx;
  font-weight: bold;
}

.form-item {
  margin-bottom: 30rpx;
}

.input {
  width: 100%;
  height: 88rpx;
  background: #f8f8f8;
  border-radius: 44rpx;
  padding: 0 40rpx;
  font-size: 28rpx;
  color: #333;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  background: #2d8cf0;
  border-radius: 44rpx;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50rpx;
}
</style>
