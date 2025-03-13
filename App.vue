<template>
  <view>ceshi</view>
</template>
<script setup>
  import { ref } from 'vue'
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import config from './config'
  
  // 用于防止重复重定向
  const isRedirecting = ref(false)
  
  // 初始化应用状态
  uni.setStorageSync('appReady', false) // 新增：标记App是否完成初始化
  
  // 提取token验证到单独的函数
  const verifyToken = () => {
    // 设置初始状态 - 显示加载动画
    uni.setStorageSync('isLoading', true)
    uni.setStorageSync('isConnected', false)
    uni.setStorageSync('appReady', false) // 标记App正在初始化
    
    // 避免重复重定向
    if (isRedirecting.value) return
    isRedirecting.value = true
    
    // 检查token是否存在
    const token = uni.getStorageSync('token')
    if (!token) {
      console.log('没有token，准备显示登录页面')
      // 没有token，延迟3秒后设置登录页面状态并跳转
      setTimeout(() => {
        uni.setStorageSync('isLoading', false)
        uni.setStorageSync('isConnected', true)
        uni.setStorageSync('appReady', true) // 标记App初始化完成
        isRedirecting.value = false
        console.log('token失效了，3秒后跳转到登录页面')
        // 显式跳转到登录页面
        uni.reLaunch({
          url: '/pages/index/index'
        })
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
          uni.setStorageSync('appReady', true) // 标记App初始化完成
          isRedirecting.value = false
          // 显式跳转到登录页面
          uni.reLaunch({
            url: '/pages/index/index'
          })
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
        console.log('Token验证结果:', res.data)
        if (res.data == true) {
          // Token有效 - 设置状态并重定向到项目列表
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', false)
          uni.setStorageSync('appReady', true) // 标记App初始化完成
          uni.switchTab({
            url: '/pages/project_list/project_list'
          })
        } else {
          // Token无效 - 延迟3秒后设置登录页面状态并跳转
          setTimeout(() => {
            uni.setStorageSync('isLoading', false)
            uni.setStorageSync('isConnected', true)
            uni.setStorageSync('appReady', true) // 标记App初始化完成
            // 清除无效token
            uni.removeStorageSync('token')
            console.log('token失效了，3秒后跳转到登录页面')
            // 显式跳转到登录页面
            uni.reLaunch({
              url: '/pages/index/index'
            })
          }, 3000)
        }
      },
      fail: (err) => {
        // 请求失败 - 延迟3秒后设置登录页面状态并跳转
        console.error('Token验证失败:', err)
        setTimeout(() => {
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
          uni.setStorageSync('appReady', true) // 标记App初始化完成
          console.log('请求失败，3秒后跳转到登录页面')
          // 显式跳转到登录页面
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }, 3000)
      },
      complete: () => {
        // 清除超时定时器
        clearTimeout(timeoutId)
        console.log('Token验证完成')
      }
    })
  }
  
  // 生命周期钩子
  onLaunch(() => {
    console.log('App onLaunch - 开始验证token')
    // 应用启动时验证token
    verifyToken()
  })
  
  onShow(() => {
    console.log('App onShow - 从后台返回')
    // 应用从后台返回时重新验证token
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
