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
        <view class="project-info">
          <image class="project-image" :src="item.image || '/static/title.png'" mode="aspectFill"></image>
          <view class="content">
            <view class="project-header">
              <text class="project-name" style="width: 80%;">{{item.name}}</text>
              <image v-if="isRecentlyUpdated(item.updatedAt)" src="/static/projects/update-badge.png" class="update-badge" mode="aspectFit"></image>
            </view>
            <view class="project-investor">
              <text class="label">投资主体：</text>
              <text class="value">{{item.investor}}</text>
            </view>
            <view class="progress-container">
              <view class="progress-row">
                <text class="progress-label">工程形象进度：{{item.progress}}%</text>
                <view class="progress-bar project-progress" :style="{ '--progress': item.progress + '%' }"></view>
              </view>
              <view class="progress-row">
                <text class="progress-label">手续办理进度：{{item.procedureProgress}}%</text>
                <view class="progress-bar procedure-progress" :style="{ '--progress': item.procedureProgress + '%' }"></view>
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
    progress: 100,
    procedureProgress: 85
  },
  {
    id: 2,
    name: '绿色能源产业园',
    investor: '新能源科技集团',
    image: '/static/projects/green-energy.png',
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    investorUpdatedAt: new Date(),
    progress: 45,
    procedureProgress: 60
  },
  {
    id: 3,
    name: '智能制造产业基地',
    investor: '工业发展有限公司',
    image: '/static/projects/smart-manufacturing.png',
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    investorUpdatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    progress: 30,
    procedureProgress: 40
  },
  {
    id: 4,
    name: '文化创意产业园',
    investor: '文化传媒投资集团',
    image: '/static/projects/cultural-creative.png',
    updatedAt: new Date(),
    investorUpdatedAt: new Date(),
    progress: 90,
    procedureProgress: 95
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
        progress: item.wcqk,
        procedureProgress: item.sxwcl || 0 // Map procedure progress from API
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

      .progress-bar {
        position: relative;
        width: 100%;
        height: 4rpx;
        background: #f0f0f0;
        border-radius: 2rpx;
        margin-bottom: 12rpx;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: var(--progress, 0%);
          transition: width 0.3s ease;
        }
      }

      .project-progress {
        &::after {
          background: linear-gradient(90deg, #409EFF 0%, #60A5FA 100%);
        }
      }

      .procedure-progress {
        &::after {
          background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
        }
        
        .procedure-progress-text {
          color: #10B981;
          font-weight: 600;
          font-size: 24rpx;
          padding: 0rpx 12rpx;
          border-radius: 20rpx;
          box-shadow: 0 2rpx 8rpx rgba(16, 185, 129, 0.15);
          position: absolute;
          bottom: 0;
          right: 0;
          align-items: center;
        }
      }

      .project-info {
        display: flex;
        align-items: flex-start;

        .project-image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 8rpx;
          margin-right: 20rpx;
          flex-shrink: 0;
        }

        .content {
          flex: 1;

          .project-header {
            display: flex;
            margin-bottom: 12rpx;

            .project-name {
              font-size: 32rpx;
              font-weight: 500;
              color: #333333;
              line-height: 1.2;
            }
          }

          .project-investor {
            font-size: 28rpx;
            color: #666666;
            display: flex;
            align-items: center;
            margin-bottom: 16rpx;

            .label {
              color: #999999;
            }

            .value {
              color: #666666;
            }
          }

          .progress-container {
            margin-top: 16rpx;
            
            .progress-row {
              margin-bottom: 12rpx;
              
              .progress-label {
                font-size: 24rpx;
                color: #666;
                margin-bottom: 6rpx;
                display: block;
              }
              
              .progress-bar {
                width: 100%;
                height: 3rpx;
                background: #f0f0f0;
                border-radius: 2rpx;
                overflow: hidden;
                position: relative;
                
                &::after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 100%;
                  width: var(--progress, 0%);
                  transition: width 0.3s ease;
                  border-radius: 2rpx;
                }
              }
              
              .project-progress::after {
                background: linear-gradient(90deg, #409EFF 0%, #60A5FA 100%);
              }
              
              .procedure-progress::after {
                background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
              }
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
