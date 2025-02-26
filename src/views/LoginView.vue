<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
    </div>
    <div class="container mx-auto px-4 flex items-center justify-between max-w-7xl relative">
      <!-- 3D Visualization -->
      <div class="flex-1 mr-20">
        <div class="relative w-full aspect-square">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-96 h-96 relative">
              <!-- Rotating platforms -->
              <div class="absolute inset-0 animate-spin-slow">
                <div class="absolute inset-0 border-2 border-blue-400/10 rounded-full"></div>
                <div class="absolute inset-[10%] border-2 border-blue-400/20 rounded-full"></div>
                <div class="absolute inset-[20%] border-2 border-blue-400/30 rounded-full"></div>
              </div>
              <!-- 3D Chart Icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative w-80 h-80">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                    <!-- Chart container -->
                    <div class="relative w-full h-full">
                      <!-- Rotating circles -->
                      <div class="absolute inset-0 animate-spin-slow">
                        <div class="absolute inset-0 border-2 border-blue-400/20 rounded-full"></div>
                        <div class="absolute inset-[10%] border-2 border-blue-400/30 rounded-full"></div>
                        <div class="absolute inset-[20%] border-2 border-blue-400/40 rounded-full"></div>
                      </div>
                      <!-- Chart box -->
                      <div class="absolute inset-[15%] bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl transform rotate-45 overflow-hidden">
                        <!-- Pattern overlay -->
                        <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                        <!-- Chart bars -->
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="transform -rotate-45 flex items-end gap-2">
                            <div class="w-4 h-12 bg-white/90 rounded-t shadow-inner"></div>
                            <div class="w-4 h-16 bg-white/90 rounded-t shadow-inner"></div>
                            <div class="w-4 h-20 bg-white/90 rounded-t shadow-inner"></div>
                          </div>
                        </div>
                      </div>
                      <!-- Floating elements -->
                      <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-lg transform rotate-45 animate-float"></div>
                      <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300/20 rounded-lg transform -rotate-12 animate-float-delay"></div>
                    </div>
                  </div>
                  <!-- Floating elements -->
                  <div class="absolute top-10 right-10 w-10 h-10 bg-blue-400/20 rounded-lg transform rotate-45 animate-float"></div>
                  <div class="absolute bottom-20 left-20 w-8 h-8 bg-blue-300/20 rounded-lg transform -rotate-12 animate-float-delay"></div>
                </div>
              </div>
              <!-- Floating elements -->
              <div class="absolute top-10 right-10 animate-float">
                <div class="w-10 h-10 bg-blue-400/20 rounded-lg transform rotate-45"></div>
              </div>
              <div class="absolute bottom-20 left-20 animate-float-delay">
                <div class="w-8 h-8 bg-blue-300/20 rounded-lg transform -rotate-12"></div>
              </div>
              <!-- Floating elements -->
              <div class="absolute top-0 right-0 animate-float">
                <div class="w-8 h-8 bg-blue-400/30 rounded-lg transform rotate-45"></div>
              </div>
              <div class="absolute bottom-0 left-0 animate-float-delay">
                <div class="w-6 h-6 bg-blue-300/20 rounded-lg transform -rotate-12"></div>
              </div>
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

<script setup lang="ts">
import { ref } from 'vue'
import ChartIcon from '@/components/ChartIcon.vue'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', { username: username.value, password: password.value })
}
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 12s linear infinite;
}

.animate-spin-reverse {
  animation: spin 15s linear infinite reverse;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 3s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
