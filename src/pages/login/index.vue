<template>
  <mobile-container>
    <view class="login-container">
      <view class="login-header">
        <image class="logo" src="/static/logo.png" mode="aspectFit" />
        <text class="title">项目督办管理平台</text>
      </view>

      <view class="login-form">
        <uni-forms ref="form" :model="formData" :rules="rules">
          <uni-forms-item name="username">
            <uni-easyinput
              v-model="formData.username"
              placeholder="请输入用户名"
              :clearable="true"
            />
          </uni-forms-item>

          <uni-forms-item name="password">
            <uni-easyinput
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              :clearable="true"
            />
          </uni-forms-item>
        </uni-forms>

        <button class="login-button" @click="handleLogin">登录</button>
      </view>
    </view>
  </mobile-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import MobileContainer from "@/components/base/MobileContainer.vue";

const authStore = useAuthStore();
const form = ref(null);

const formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入用户名",
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码",
      },
    ],
  },
};

const handleLogin = async () => {
  try {
    const valid = await form.value?.validate();
    if (!valid) return;

    const success = await authStore.login(formData);
    if (success) {
      uni.showToast({
        title: "登录成功",
        icon: "success",
      });
      uni.redirectTo({
        url: "/pages/project-list/index",
      });
    } else {
      uni.showToast({
        title: "登录失败",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    uni.showToast({
      title: "登录失败",
      icon: "error",
    });
  }
};
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;

  .login-header {
    text-align: center;
    margin-bottom: 40px;

    .logo {
      width: 120px;
      height: 120px;
      margin-bottom: 16px;
    }

    .title {
      font-size: 24px;
      color: #303133;
      font-weight: 500;
    }
  }

  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .login-button {
      width: 100%;
      height: 44px;
      margin-top: 24px;
      background-color: #409eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
