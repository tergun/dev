<template>
  <view class="project-container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索项目" 
          placeholder-class="placeholder"
        />
      </view>
    </view>
    
    <!-- 项目列表 -->
    <view class="project-list">
      <template v-if="loading">
        <view class="loading">加载中...</view>
      </template>
      <template v-else-if="projectList.length === 0">
        <view class="empty">暂无项目</view>
      </template>
      <view 
        class="project-item" 
        v-else
        v-for="(item, index) in projectList" 
        :key="item.id || index"
        @tap="handleProjectClick(item)"
      >
        <view class="project-info">
          <view class="project-name">{{item.name}}</view>
          <view class="project-investor">
            <text class="label">投资主体：</text>
            <text class="value">{{item.investor}}</text>
          </view>
        </view>
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { debounce } from 'lodash-es'

const searchKey = ref('')
const projectList = ref([])
const loading = ref(false)

// 获取项目列表
const fetchProjects = async () => {
  loading.value = true
  try {
    // 这里替换为实际的API调用
    const response = await uni.request({
      url: '/api/projects',
      method: 'GET',
      data: {
        keyword: searchKey.value
      }
    })
    projectList.value = response.data || []
  } catch (error) {
    console.error('获取项目列表失败：', error)
    uni.showToast({
      title: '获取项目列表失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// 监听搜索关键词变化
watch(searchKey, debounce(() => {
  fetchProjects()
}, 300))

// 查看项目详情
const handleProjectClick = (project) => {
  uni.navigateTo({
    url: `/pages/project/detail?id=${project.id}`,
    fail: () => {
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

// 页面加载时获取数据
onMounted(() => {
  fetchProjects()
})
</script>

<style lang="scss" scoped>
.project-container {
  min-height: 100vh;
  background: #F5F7FA;
  padding: 30rpx;
  
  .search-bar {
    margin-bottom: 30rpx;
    
    .search-input {
      background: #FFFFFF;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      
      .iconfont {
        font-size: 32rpx;
        color: #999999;
        margin-right: 20rpx;
      }
      
      input {
        flex: 1;
        height: 80rpx;
        font-size: 28rpx;
      }
      
      .placeholder {
        color: #999999;
      }
    }
  }
  
  .project-list {
    .project-item {
      background: #FFFFFF;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .project-info {
        flex: 1;
        
        .project-name {
          font-size: 32rpx;
          font-weight: 500;
          color: #333333;
          margin-bottom: 16rpx;
        }
        
        .project-investor {
          font-size: 28rpx;
          color: #666666;
          
          .label {
            color: #999999;
          }
          
          .value {
            color: #666666;
          }
        }
      }
      
      .iconfont {
        font-size: 32rpx;
        color: #999999;
      }
    }
  }
  
  .loading,
  .empty {
    text-align: center;
    padding: 40rpx 0;
    color: #999999;
    font-size: 28rpx;
  }
}
</style>
