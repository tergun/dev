Page({
  data: {
    formData: {
      account: '',
      password: ''
    }
  },

  handleLogin() {
    // 登录逻辑处理
    console.log('登录信息：', this.data.formData)
  }
})
