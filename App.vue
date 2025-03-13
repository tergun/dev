<template>
  <view>ceshi</view>
</template>
<script>
  import config from './config'
  export default {
    // Extract token verification into a separate function
    verifyToken: function() {
      // Set default states at startup
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
        console.log('token失效了')
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
            console.log('token失效了')
          }
        },
        fail: (err) => {
          // Request failed - set states for login page
          console.error('Token verification failed:', err)
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
        },
        complete: () => {
          uni.setStorageSync('isLoading', false)
          uni.setStorageSync('isConnected', true)
          this.$isRedirecting = false;
          
          console.log('***************')
        }
      })
    },
    
    onLaunch: function() {
      // Verify token on app launch
      this.verifyToken();
    },
    onShow: function() {
      console.log('App Show')
      // Re-verify token when app returns from background
      // This prevents white screen when token expires while app is in background
      this.verifyToken();
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
</style>
