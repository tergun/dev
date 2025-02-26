<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between max-w-6xl">
      <!-- Left side: Simple 2D Chart -->
      <div class="w-full md:w-[420px] mb-8 md:mb-0 md:mr-12">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <!-- Simple background pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/2 left-0 w-full h-px bg-white/20"></div>
            <div class="absolute top-0 left-1/2 w-px h-full bg-white/20"></div>
          </div>
          
          <div class="flex items-end justify-center gap-6 h-48 relative">
            <div v-for="(item, index) in stats" :key="index" class="flex flex-col items-center">
              <div class="w-8 bg-white/90 rounded-t-lg transition-all duration-500"
                   :style="{height: item.height + 'px', animation: 'grow-up 0.6s ease-out ' + index * 0.15 + 's forwards'}">
              </div>
              <div class="mt-3 text-white/90 text-sm font-medium">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Login Form -->
      <div class="w-full md:w-[420px] bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">巴林右旗重点项目监管平台</h1>
          <p class="text-gray-500">欢迎登录</p>
          <p class="text-xs text-gray-400 mt-1">WELCOME TO LOGIN</p>
        </div>
        
        <div class="space-y-4">
          <div class="relative">
            <input 
              type="text" 
              v-model="username" 
              placeholder="请输入账号" 
              class="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
          
          <div class="relative">
            <input 
              type="password" 
              v-model="password" 
              placeholder="请输入密码" 
              class="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
          
          <button 
            @click="handleLogin" 
            class="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            立即登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const stats = ref([
  { label: '项目数', height: 80 },
  { label: '投资额', height: 120 },
  { label: '完成率', height: 100 }
])

const handleLogin = () => {
  console.log('Login attempt:', { username: username.value, password: password.value })
}
</script>

<style>
@keyframes grow-up {
  from { transform: scaleY(0); opacity: 0; }
  to { transform: scaleY(1); opacity: 0.9; }
}
</style>
