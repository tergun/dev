<template>
  <view class="project-container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKey"
          @input="handleSearch"
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
        v-for="item in projectList" 
        :key="item.id"
        @tap="handleProjectClick(item)"
      >
        <view class="project-info">
          <view class="project-header">
            <image class="project-image" :src="item.image || '/static/default-project.png'" mode="aspectFill"></image>
            <view class="project-name">{{item.name}}</view>
          </view>
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
import { ref, onMounted } from 'vue'

const searchKey = ref('')
const projectList = ref([
  {
    id: 1,
    name: '智慧城市建设项目',
    investor: '城市发展投资有限公司',
    image: '/static/projects/smart-city.png'
  },
  {
    id: 2,
    name: '绿色能源产业园',
    investor: '新能源科技集团',
    image: '/static/projects/green-energy.png'
  },
  {
    id: 3,
    name: '智能制造产业基地',
    investor: '工业发展有限公司',
    image: '/static/projects/smart-manufacturing.png'
  },
  {
    id: 4,
    name: '文化创意产业园',
    investor: '文化传媒投资集团',
    image: '/static/projects/cultural-creative.png'
  }
])
const loading = ref(false)

// 搜索处理
const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    // 模拟搜索，实际项目中替换为API调用
    const keyword = searchKey.value.toLowerCase()
    projectList.value = [
      {
        id: 1,
        name: '智慧城市建设项目',
        investor: '城市发展投资有限公司',
        image: '/static/projects/smart-city.png'
      },
      {
        id: 2,
        name: '绿色能源产业园',
        investor: '新能源科技集团',
        image: '/static/projects/green-energy.png'
      },
      {
        id: 3,
        name: '智能制造产业基地',
        investor: '工业发展有限公司',
        image: '/static/projects/smart-manufacturing.png'
      },
      {
        id: 4,
        name: '文化创意产业园',
        investor: '文化传媒投资集团',
        image: '/static/projects/cultural-creative.png'
      }
    ].filter(item => 
      item.name.toLowerCase().includes(keyword) || 
      item.investor.toLowerCase().includes(keyword)
    )
    loading.value = false
  }, 300)
}

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
        
        .project-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .project-image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 8rpx;
            margin-right: 20rpx;
          }

          .project-name {
            font-size: 32rpx;
            font-weight: 500;
            color: #333333;
          }
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
