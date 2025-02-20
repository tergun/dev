<template>
  <view class="login-container">
    <!-- 头部Logo -->
    <view class="logo-container">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
    </view>
    
    <!-- 登录/注册标题 -->
    <view class="title">登录/注册</view>
    
    <!-- 表单区域 -->
    <view class="form-container">
      <!-- 账号输入框 -->
      <view class="input-item">
        <input 
          type="text" 
          v-model="formData.account" 
          placeholder="账号" 
          placeholder-class="placeholder"
        />
      </view>
      
      <!-- 密码输入框 -->
      <view class="input-item">
        <input 
          type="password" 
          v-model="formData.password" 
          placeholder="密码" 
          placeholder-class="placeholder"
        />
      </view>
      
      <!-- 登录按钮 -->
      <button class="login-btn" @tap="handleLogin">获取验证码</button>
      
      <!-- 用户协议 -->
      <view class="agreement">
        <text class="agreement-text">注册即表示同意</text>
        <text class="link">《用户服务协议》</text>
        <text class="agreement-text">和</text>
        <text class="link">《隐私政策》</text>
      </view>
    </view>
    
    <!-- 微信登录 -->
    <view class="wechat-login">
      <view class="wechat-login-title">微信登录</view>
      <button class="wechat-btn" @tap="handleWechatLogin">
        <text class="iconfont icon-wechat"></text>
        <text class="btn-text">微信一键登录</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  account: '',
  password: ''
})

const handleLogin = () => {
  // 登录逻辑处理
  console.log('登录信息：', formData.value)
}

const handleWechatLogin = () => {
  // 微信登录逻辑
  uni.login({
    provider: 'weixin',
    success: function (loginRes) {
      console.log('微信登录成功：', loginRes)
    },
    fail: function (err) {
      console.error('微信登录失败：', err)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #1890FF 0%, #FFFFFF 50%);
  padding: 0 30rpx;
  
  .logo-container {
    padding: 60rpx 0;
    display: flex;
    justify-content: center;
    
    .logo {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
  }
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60rpx;
  }
  
  .form-container {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    
    .input-item {
      background: #F8F8F8;
      border-radius: 10rpx;
      margin-bottom: 20rpx;
      
      input {
        height: 90rpx;
        padding: 0 20rpx;
      }
    }
    
    .placeholder {
      color: #999999;
    }
    
    .login-btn {
      background: #1890FF;
      color: #FFFFFF;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 10rpx;
      margin: 40rpx 0;
    }
    
    .agreement {
      text-align: center;
      font-size: 24rpx;
      color: #999999;
      
      .link {
        color: #1890FF;
      }
    }
  }
  
  .wechat-login {
    margin-top: 60rpx;
    
    .wechat-login-title {
      text-align: center;
      font-size: 28rpx;
      color: #999999;
      margin-bottom: 30rpx;
    }
    
    .wechat-btn {
      background: #07C160;
      color: #FFFFFF;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .iconfont {
        font-size: 40rpx;
        margin-right: 10rpx;
      }
      
      .btn-text {
        font-size: 32rpx;
      }
    }
  }
}
</style>
