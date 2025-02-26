<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between max-w-7xl relative">
      <!-- Left side: Stats -->
      <div class="w-full md:w-[480px] mb-8 md:mb-0 md:mr-20">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-2xl">
          <div class="flex items-end justify-center gap-6 h-64">
            <div class="flex flex-col items-center">
              <div class="stats-bar h-[160px]"></div>
              <p class="mt-4 text-white/90 text-sm">项目数</p>
            </div>
            <div class="flex flex-col items-center">
              <div class="stats-bar h-[200px] animation-delay-200"></div>
              <p class="mt-4 text-white/90 text-sm">投资额</p>
            </div>
            <div class="flex flex-col items-center">
              <div class="stats-bar h-[180px] animation-delay-400"></div>
              <p class="mt-4 text-white/90 text-sm">完成率</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Login Form -->
      <div class="w-[480px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 relative">
        <!-- Decorative elements -->
        <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-lg transform rotate-12"></div>
        <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-300/20 rounded-lg transform -rotate-12"></div>
        
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">巴林右旗重点项目监管平台</h1>
          <div class="flex items-center justify-center space-x-3 mt-6">
            <div class="h-[1px] w-16 bg-gray-200"></div>
            <p class="text-gray-500">欢迎登录</p>
            <div class="h-[1px] w-16 bg-gray-200"></div>
          </div>
          <p class="text-xs text-gray-400 mt-2">WELCOME TO LOGIN</p>
        </div>
        
        <div class="space-y-6">
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-500">
              <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              v-model="username" 
              placeholder="请输入账号" 
              class="w-full h-12 pl-12 pr-4 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-500">
              <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input 
              type="password" 
              v-model="password" 
              placeholder="请输入密码" 
              class="w-full h-12 pl-12 pr-4 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          
          <button 
            @click="handleLogin" 
            class="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            立即登录
          </button>

          <div class="flex items-center justify-between text-sm mt-4">
            <label class="flex items-center text-gray-500 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer" />
              <span class="group-hover:text-blue-500 transition-colors">记住密码</span>
            </label>
            <a href="#" class="text-blue-500 hover:text-blue-600 transition-colors">立即注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  width: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  transform-origin: bottom;
  transform: scaleY(0);
  animation: grow 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.stats-bar:hover {
  background: white;
  transition: background-color 0.3s;
}

@keyframes grow {
  from {
    transform: scaleY(0);
    opacity: 0.5;
  }
  to {
    transform: scaleY(1);
    opacity: 0.9;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const stats = ref([
  { label: '项目数', height: 160 },
  { label: '投资额', height: 200 },
  { label: '完成率', height: 180 }
])

const handleLogin = () => {
  console.log('Login attempt:', { username: username.value, password: password.value })
}
</script>

<style>
.stats-bar {
  width: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  transform-origin: bottom;
  animation: grow 1s ease-out forwards;
}

.stats-bar:hover {
  background: white;
  transition: background-color 0.3s;
}

@keyframes grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
</style>
