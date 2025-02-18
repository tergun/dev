<template>
  <view class="project-detail">
    <view class="card basic-info">
      <view class="section-header">
        <text class="section-title">基本信息</text>
        <text class="edit-btn" v-if="isGovOffice" @tap="handleEdit">编辑</text>
      </view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">项目名称</text>
          <text class="value">{{ project.title }}</text>
        </view>
        <view class="info-item">
          <text class="label">责任单位</text>
          <text class="value">{{ project.department }}</text>
        </view>
        <view class="info-item">
          <text class="label">分管领导</text>
          <text class="value">{{ project.leader }}</text>
        </view>
        <view class="info-item">
          <text class="label">项目总投资</text>
          <text class="value">{{ project.investment }}</text>
        </view>
      </view>
    </view>

    <view class="card progress-card">
      <view class="section-header">
        <text class="section-title">项目进度</text>
        <text :class="['update-tag', project.isUpdated ? 'updated' : 'not-updated']">
          {{ project.isUpdated ? '已更新' : '7日未更新' }}
        </text>
      </view>
      <view class="progress-bar">
        <view class="progress-inner" :style="{ width: project.progress + '%' }"></view>
        <text class="progress-text">{{ project.progress }}%</text>
      </view>
      <view class="progress-desc">
        <text>{{ project.progressDescription }}</text>
      </view>
    </view>

    <view class="card approval-card">
      <view class="section-header">
        <text class="section-title">前期手续办理</text>
      </view>
      <view class="approval-list">
        <view class="approval-item" v-for="(item, index) in project.approvals" :key="index">
          <view class="approval-header">
            <view class="approval-title-wrap">
              <view :class="['status-dot', item.status]"></view>
              <text class="approval-title">{{ item.title }}</text>
            </view>
            <text :class="['status-text', item.status]">{{ getStatusText(item.status) }}</text>
          </view>
          
          <view class="approval-content" v-if="item.status === 'processing' || item.status === 'completed'">
            <view class="detail-item">
              <text class="detail-label">办理期限：</text>
              <text class="detail-value">{{ item.deadline }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">办理层级：</text>
              <text class="detail-value">{{ item.level }}</text>
            </view>
            <view class="detail-item" v-if="item.status === 'completed'">
              <text class="detail-label">完成时间：</text>
              <text class="detail-value">{{ item.completedDate }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="action-bar" v-if="canEdit">
      <button class="btn btn-primary" @tap="updateProgress">更新进度</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isGovOffice: true,
      canEdit: true,
      project: {
        title: '城市轨道交通建设工程',
        department: '市建设局',
        leader: '张三',
        investment: '50亿元',
        progress: 75,
        isUpdated: true,
        progressDescription: '已完成地铁站主体结构施工，正在进行内部装修和设备安装。',
        approvals: [
          {
            title: '立项批复',
            status: 'completed',
            deadline: '2024-03-01',
            level: '市级',
            completedDate: '2024-02-15'
          },
          {
            title: '环境影响评估',
            status: 'processing',
            deadline: '2024-04-01',
            level: '省级'
          },
          {
            title: '规划许可',
            status: 'pending',
            deadline: '',
            level: ''
          },
          {
            title: '施工许可',
            status: 'pending',
            deadline: '',
            level: ''
          }
        ]
      }
    }
  },
  methods: {
    handleEdit() {
      uni.navigateTo({
        url: '/pages/project/edit'
      })
    },
    updateProgress() {
      uni.navigateTo({
        url: '/pages/project/update-progress'
      })
    },
    getStatusText(status) {
      const statusMap = {
        completed: '已完成',
        processing: '办理中',
        pending: '未开始'
      }
      return statusMap[status]
    }
  }
}
</script>

<style>
.project-detail {
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.edit-btn {
  font-size: 28rpx;
  color: #1890ff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.value {
  font-size: 28rpx;
  color: #333;
}

.progress-card {
  margin: 20rpx 0;
}

.update-tag {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.updated {
  background: #e8f7ed;
  color: #52c41a;
}

.not-updated {
  background: #fff1f0;
  color: #f5222d;
}

.progress-bar {
  height: 16rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  position: relative;
  margin: 20rpx 0;
}

.progress-inner {
  height: 100%;
  background: #1890ff;
  border-radius: 8rpx;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -40rpx;
  font-size: 28rpx;
  color: #1890ff;
}

.progress-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-top: 20rpx;
}

.approval-list {
  margin-top: 20rpx;
}

.approval-item {
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.approval-item:last-child {
  border-bottom: none;
}

.approval-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.approval-title-wrap {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  margin-right: 12rpx;
}

.status-dot.completed {
  background: #52c41a;
}

.status-dot.processing {
  background: #1890ff;
}

.status-dot.pending {
  background: #d9d9d9;
}

.approval-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.status-text {
  font-size: 24rpx;
}

.status-text.completed {
  color: #52c41a;
}

.status-text.processing {
  color: #1890ff;
}

.status-text.pending {
  color: #999;
}

.approval-content {
  background: #f8f8f8;
  padding: 16rpx;
  border-radius: 8rpx;
  margin-top: 16rpx;
}

.detail-item {
  display: flex;
  margin-bottom: 8rpx;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 26rpx;
  color: #999;
  width: 140rpx;
}

.detail-value {
  font-size: 26rpx;
  color: #666;
  flex: 1;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.action-bar .btn {
  width: 100%;
}
</style>
