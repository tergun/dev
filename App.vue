<template>
  <view>ceshi</view>
</template>
<script>
  import config from './config'
  export default {
    onLaunch: function() {
      // Set default states at app startup
      uni.setStorageSync('isLoading', true)
      uni.setStorageSync('isConnected', false)
      
      // Avoid duplicate redirects
      if (this.$isRedirecting) return;
      this.$isRedirecting = true;
      
      // Check if token exists
      const token = uni.getStorageSync('token')
      if (!token) {
        // No token, set states for login page
        uni.setStorageSync('isLoading', false)
        uni.setStorageSync('isConnected', true)
        this.$isRedirecting = false
        return
      }
      
      // Token exists, verify it
      uni.request({
        url: config.getUrl('tokenVerify'),
        method: 'GET',
        header: {
          'X-Access-Token': token
        },
        success: (res) => {
          console.log(res.data)
          if (res.data == true) {
            // Token is valid - set states and redirect to project list
            uni.setStorageSync('isLoading', true)
            uni.setStorageSync('isConnected', false)
            uni.switchTab({
              url: '/pages/project_list/project_list'
            })
          } else {
            // Token is invalid - set states for login page
            uni.setStorageSync('isLoading', false)
            uni.setStorageSync('isConnected', true)
            // Clear invalid token
            uni.removeStorageSync('token')
          }
        },
        fail: (err) => {
          // Request failed - set states for login page
          console.error('Token verification failed:', err)
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
        },
        complete: () => {
          this.$isRedirecting = false;
        }
      })
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
</style>
