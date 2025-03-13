<template>
  <view>ceshi</view>
</template>
<script setup>
  import { ref } from 'vue'
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import config from './config'
  
  // 用于防止重复重定向
  const isRedirecting = ref(false)
  
  // 提取token验证到单独的函数
  const verifyToken = () => {
    // 设置初始状态
    uni.setStorageSync('isLoading', true)
    uni.setStorageSync('isConnected', false)
    
    // 避免重复重定向
    if (isRedirecting.value) return
    isRedirecting.value = true
    
    // 检查token是否存在
    const token = uni.getStorageSync('token')
    if (!token) {
      // 没有token，设置登录页面状态
      uni.setStorageSync('isLoading', false)
      uni.setStorageSync('isConnected', true)
      isRedirecting.value = false
      console.log('token失效了')
      return
    }
    
    // Token存在，验证它
    uni.request({
      url: config.getUrl('tokenVerify'),
      method: 'GET',
      header: {
        'X-Access-Token': token
      },
      success: (res) => {
        console.log(res.data)
        if (res.data == true) {
          // Token有效 - 设置状态并重定向到项目列表
          uni.setStorageSync('isLoading', true)
          uni.setStorageSync('isConnected', false)
          uni.switchTab({
            url: '/pages/project_list/project_list'
          })
        } else {
          // Token无效 - 设置登录页面状态
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
          // 清除无效token
          uni.removeStorageSync('token')
          console.log('token失效了')
        }
      },
      fail: (err) => {
        // 请求失败 - 设置登录页面状态
        console.error('Token验证失败:', err)
        uni.setStorageSync('isLoading', false)
        uni.setStorageSync('isConnected', true)
      },
      complete: () => {
        uni.setStorageSync('isLoading', false)
        uni.setStorageSync('isConnected', true)
        isRedirecting.value = false
        
        console.log('***************')
      }
    })
  }
  
  // 生命周期钩子
  onLaunch(() => {
    // 应用启动时验证token
    verifyToken()
  })
  
  onShow(() => {
    console.log('App Show')
    // 应用从后台返回时重新验证token
    // 这可以防止应用在后台时token过期导致的白屏问题
    verifyToken()
  })
  
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style>
  /*每个页面公共css */
</style>
