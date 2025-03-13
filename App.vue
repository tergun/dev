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
    // 确保在验证开始前设置正确的初始状态
    uni.setStorageSync('isLoading', false)
    uni.setStorageSync('isConnected', true)
    
    // 避免重复重定向
    if (isRedirecting.value) return
    isRedirecting.value = true
    
    // 检查token是否存在
    const token = uni.getStorageSync('token')
    if (!token) {
      // 没有token，延迟3秒后设置登录页面状态
      setTimeout(() => {
        uni.setStorageSync('isLoading', false)
        uni.setStorageSync('isConnected', true)
        isRedirecting.value = false
        console.log('token失效了，3秒后跳转到登录页面')
      }, 3000)
      return
    }
    
    // 添加超时处理，防止请求长时间未响应导致白屏
    let timeoutId = setTimeout(() => {
      if (isRedirecting.value) {
        console.log('Token验证超时，3秒后显示登录页面')
        setTimeout(() => {
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
          isRedirecting.value = false
        }, 3000)
      }
    }, 5000) // 5秒超时
    
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
          uni.setStorageSync('isLoading', false)  // 改为false以避免显示加载动画
          uni.setStorageSync('isConnected', false)
          uni.switchTab({
            url: '/pages/project_list/project_list'
          })
        } else {
          // Token无效 - 延迟3秒后设置登录页面状态
          setTimeout(() => {
            uni.setStorageSync('isLoading', false)
            uni.setStorageSync('isConnected', true)
            // 清除无效token
            uni.removeStorageSync('token')
            console.log('token失效了，3秒后跳转到登录页面')
          }, 3000)
        }
      },
      fail: (err) => {
        // 请求失败 - 延迟3秒后设置登录页面状态
        console.error('Token验证失败:', err)
        setTimeout(() => {
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
          console.log('请求失败，3秒后跳转到登录页面')
        }, 3000)
      },
      complete: () => {
        // 清除超时定时器
        clearTimeout(timeoutId)
        // 只重置重定向标志，不覆盖success/fail回调中的状态设置
        console.log('Token验证完成')
      }
    })
  }
  
  // 生命周期钩子
  onLaunch(() => {
    // 应用启动时验证token
    verifyToken()
  })
  
  onShow(() => {
    console.log('App Show - 从后台返回')
    // 应用从后台返回时重新验证token
    // 这可以防止应用在后台时token过期导致的白屏问题
    console.log('开始验证token...')
    verifyToken()
  })
  
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style>
  /*每个页面公共css */
</style>
