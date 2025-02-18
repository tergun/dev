<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">重点项目督办管理平台</h2>
      <div class="form-item">
        <input 
          v-model="username" 
          type="text" 
          placeholder="请输入用户名"
          class="input"
        />
      </div>
      <div class="form-item">
        <input 
          v-model="password" 
          type="password" 
          placeholder="请输入密码"
          class="input"
        />
      </div>
      <button class="btn" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        alert('请输入用户名和密码')
        return
      }

      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        this.$router.push('/projects')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-item {
  margin-bottom: 20px;

  .input {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #2d8cf0;
    }
  }
}

.btn {
  width: 100%;
  height: 40px;
  background: #2d8cf0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: darken(#2d8cf0, 10%);
  }
}
</style>
