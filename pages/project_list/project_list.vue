<template>
  <view class="project-container">
    <swiper indicator-dots indicator-color="#999999" indicator-active-color="#ffffff" autoplay interval="2000" circular>
      <swiper-item>
        <image src="/static/projects/swiper1.jpg" class="image" mode="widthFix center"></image>
      </swiper-item>
      <swiper-item>
        <image src="/static/projects/swiper2.jpg" class="image" mode="widthFix center"></image>
      </swiper-item>
      <swiper-item>
        <image src="/static/projects/swiper3.jpg" class="image" mode="widthFix center"></image>
      </swiper-item>
    </swiper>
    
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input type="text" v-model="searchKey" @input="handleSearch" placeholder="搜索项目" placeholder-class="placeholder" />
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
      <view class="project-item" v-else v-for="item in projectList" :key="item.id" @tap="handleProjectClick(item)">
        <!-- 进度蒙层 -->
        <view class="progress-overlay" :style="{ width: item.progress + '%' }"></view>
        <view style="height: 100%;display: block;align-items: end;">
          <text class="progress-text">形象进度：{{item.progress}}%</text>
        </view>
        <view class="project-info">
          <image class="project-image" :src="item.image || '/static/projects/default-project.png'" mode="aspectFill"></image>
          <view class="right-content">
            <view class="content">
              <view class="project-header">
                <text class="project-name">{{item.name}}</text>
                <image v-if="isRecentlyUpdated(item.updatedAt)" src="/static/projects/update-badge.png" class="update-badge" mode="aspectFit"></image>
              </view>
              <view class="project-investor">
                <text class="label">投资主体：</text>
                <text class="value">{{item.investor}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import config from '../../config'

const searchKey = ref('')
const projectList = ref([{
    id: 1,
    name: '智慧城市建设项目',
    investor: '城市发展投资有限公司',
    image: '/static/projects/smart-city.png',
    updatedAt: new Date(),
    investorUpdatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    progress: 100
  },
  {
    id: 2,
    name: '绿色能源产业园',
    investor: '新能源科技集团',
    image: '/static/projects/green-energy.png',
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    investorUpdatedAt: new Date(),
    progress: 45
  },
  {
    id: 3,
    name: '智能制造产业基地',
    investor: '工业发展有限公司',
    image: '/static/projects/smart-manufacturing.png',
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    investorUpdatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    progress: 30
  },
  {
    id: 4,
    name: '文化创意产业园',
    investor: '文化传媒投资集团',
    image: '/static/projects/cultural-creative.png',
    updatedAt: new Date(),
    investorUpdatedAt: new Date(),
    progress: 90
  }
])
const loading = ref(false)

// 检查是否最近7天内更新
const isRecentlyUpdated = (date) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return new Date(date) > sevenDaysAgo
}

// 搜索处理
const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    const keyword = searchKey.value.toLowerCase()
    projectList.value = projectList.value.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.investor.toLowerCase().includes(keyword)
    )
    loading.value = false
  }, 300)
}

// 查看项目详情
const handleProjectClick = (project) => {
  console.log(project.id)
  
  uni.navigateTo({
    url: `/pages/project_detail/project_detail?id=${project.id}`,
    fail: () => {
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

const getProjectList = () => {
  uni.request({
    url: config.getUrl('project_list'),
    method: 'GET',
    data: {
      pageNo: 1,
      pageSize: 10
    },
    success: (res) => {
      console.log('项目列表', res.data)
      projectList.value = res.data.result.records.map(item => ({
        id: item.id,
        name: item.xmmc,
        investor: item.tzzt,
        progress: item.wcqk
      }))
    },
    fail: (res) => {
      console.log('失败')
    }
  })
}

onMounted(() => {
  getProjectList()
  handleSearch()
})
</script>

<style lang="scss" scoped>
@keyframes jellyEffect {
  0% { transform: scaleX(1); }
  25% { transform: scaleX(1.05); }
  50% { transform: scaleX(0.95); }
  75% { transform: scaleX(1.02); }
  100% { transform: scaleX(1); }
}

.project-container {
  min-height: 100vh;
  background: #F5F7FA;
  padding: 30rpx;

  .search-bar {
    margin-top: 20rpx;
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
  
  .image {
    width: 100%;
    height: 100%;
  }

  .project-list {
    .project-item {
      background: #FFFFFF;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      overflow: hidden;

      .project-info {
        display: flex;
        align-items: flex-start;
        width: 100%;

        .project-image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 8rpx;
          margin-right: 20rpx;
          flex-shrink: 0;
        }

        .progress-text {
          color: #409EFF;
          font-weight: 600;
          font-size: 24rpx;
          padding: 0rpx 12rpx;
          border-radius: 20rpx;
          box-shadow: 0 2rpx 8rpx rgba(64, 158, 255, 0.15);
          position: absolute;
          bottom: 0;
          right: 0;
          align-items: center;
        }

        .progress-overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg,
            rgba(64, 158, 255, 0.6) 0%,
            rgba(64, 158, 255, 0.5) 15%,
            rgba(64, 158, 255, 0.4) 30%,
            rgba(64, 158, 255, 0.3) 45%,
            rgba(64, 158, 255, 0.2) 60%,
            rgba(64, 158, 255, 0.15) 75%,
            rgba(64, 158, 255, 0.1) 90%,
            rgba(64, 158, 255, 0.05) 100%);
          z-index: 1;
          transition: width 0.3s ease;
          border-radius: 0 16rpx 16rpx 0;
          transform-origin: left;
          animation: jellyEffect 0.6s ease-in-out;
        }

        .right-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8rpx;

            .project-name {
              font-size: 32rpx;
              font-weight: 500;
              color: #333333;
              line-height: 1.2;
              flex: 1;
              margin-right: 12rpx;
            }
          }

          .project-investor {
            font-size: 28rpx;
            color: #666666;
            display: flex;
            align-items: center;
            margin-bottom: 12rpx;

            .label {
              color: #999999;
            }

            .value {
              color: #666666;
            }
          }


        }
      }
    }
  }

  .update-badge {
    width: 120rpx;
    height: 40rpx;
    object-fit: contain;
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
