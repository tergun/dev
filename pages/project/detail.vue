<template>
  <view class="detail-container">
    <!-- 基本信息卡片 -->
    <view class="info-card">
      <image class="project-image" :src="projectInfo.image || '/static/default-project.png'" mode="aspectFill"></image>
      <view class="card-title">基本信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">调度层级</text>
          <text class="value">{{projectInfo.level}}</text>
        </view>
        <view class="info-item">
          <text class="label">项目名称</text>
          <text class="value">{{projectInfo.name}}</text>
        </view>
        <view class="info-item">
          <text class="label">投资主体</text>
          <text class="value">{{projectInfo.investor}}</text>
        </view>
        <view class="info-item">
          <text class="label">建设性质</text>
          <text class="value">{{projectInfo.nature}}</text>
        </view>
      </view>
    </view>

    <!-- 投资信息卡片 -->
    <view class="info-card">
      <view class="card-title">投资信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">总投资</text>
          <text class="value">{{projectInfo.totalInvestment}}万元</text>
        </view>
        <view class="info-item">
          <text class="label">2025年计划完成投资</text>
          <text class="value">{{projectInfo.plannedInvestment2025}}万元</text>
        </view>
      </view>
    </view>

    <!-- 时间信息卡片 -->
    <view class="info-card">
      <view class="card-title">时间信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">计划开复工时间</text>
          <text class="value">{{projectInfo.plannedStartDate}}</text>
        </view>
        <view class="info-item">
          <text class="label">计划完工时间</text>
          <text class="value">{{projectInfo.plannedEndDate}}</text>
        </view>
      </view>
    </view>

    <!-- 责任信息卡片 -->
    <view class="info-card">
      <view class="card-title">责任信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">分管领导</text>
          <text class="value">{{projectInfo.supervisor}}</text>
        </view>
        <view class="info-item">
          <text class="label">责任单位</text>
          <text class="value">{{projectInfo.responsibleUnit}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const projectInfo = ref({
  level: '市级重点项目',
  name: '智慧城市建设项目',
  investor: '城市发展投资有限公司',
  image: '/static/projects/smart-city.png',
  nature: '新建',
  totalInvestment: '50000',
  plannedInvestment2025: '20000',
  plannedStartDate: '2025-03-01',
  plannedEndDate: '2025-12-31',
  supervisor: '张三',
  responsibleUnit: '城市建设局'
})

// 获取项目详情
const getProjectDetail = async (id) => {
  try {
    // 实际项目中替换为API调用
    const response = await uni.request({
      url: `/api/projects/${id}`,
      method: 'GET'
    })
    projectInfo.value = response.data
  } catch (error) {
    console.error('获取项目详情失败：', error)
    uni.showToast({
      title: '获取项目详情失败',
      icon: 'none'
    })
  }
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.$page?.options?.id
  if (id) {
    getProjectDetail(id)
  }
})
</script>

<style lang="scss" scoped>
.detail-container {
  min-height: 100vh;
  background: #F5F7FA;
  padding: 30rpx;
  
  :deep(.uni-page-head) {
    background: transparent;
  }
}

.info-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .project-image {
    width: 100%;
    height: 320rpx;
    border-radius: 8rpx;
    margin-bottom: 30rpx;
    background-color: #F5F7FA;
  }

  .card-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
    margin-bottom: 24rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid #1890FF;
    display: flex;
    align-items: center;
    line-height: 1.4;
  }

  .info-list {
    .info-item {
      display: flex;
      align-items: flex-start;
      padding: 24rpx 0;
      border-bottom: 2rpx solid #F5F5F5;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      &:first-child {
        padding-top: 0;
      }

      .label {
        width: 280rpx;
        font-size: 28rpx;
        color: #999999;
        line-height: 1.5;
        flex-shrink: 0;
      }

      .value {
        flex: 1;
        font-size: 28rpx;
        color: #333333;
        line-height: 1.5;
        word-break: break-all;
        padding-right: 20rpx;
      }
    }
  }
}
</style>
