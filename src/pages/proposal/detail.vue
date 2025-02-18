<template>
  <view class="proposal-detail">
    <view class="card header-card">
      <view class="title-section">
        <text class="title">{{ proposal.title }}</text>
        <text :class="['status-tag', getStatusClass()]">{{ proposal.status }}</text>
      </view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">承办部门</text>
          <text class="value">{{ proposal.department }}</text>
        </view>
        <view class="info-item">
          <text class="label">交办日期</text>
          <text class="value">{{ proposal.assignDate }}</text>
        </view>
        <view class="info-item">
          <text class="label">办理期限</text>
          <text class="value">{{ proposal.deadline }}</text>
        </view>
        <view class="info-item">
          <text class="label">提案类型</text>
          <text class="value">{{ proposal.type }}</text>
        </view>
      </view>
    </view>

    <view class="card timeline-card">
      <view class="timeline-header">
        <text class="section-title">办理进度</text>
      </view>
      <view class="timeline">
        <view class="timeline-item" v-for="(step, index) in proposal.timeline" :key="index"
              :class="{ 'completed': step.completed }">
          <view class="timeline-dot"></view>
          <view class="timeline-content">
            <text class="step-title">{{ step.title }}</text>
            <text class="step-date">{{ step.date }}</text>
            <text class="step-desc">{{ step.description }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="card files-card">
      <view class="section-header">
        <text class="section-title">相关文件</text>
      </view>
      <view class="file-list">
        <view class="file-item" v-for="(file, index) in proposal.files" :key="index" @tap="previewFile(file)">
          <text class="file-icon">📄</text>
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
            <text class="file-size">{{ file.size }}</text>
          </view>
          <text class="download-icon">⬇️</text>
        </view>
      </view>
    </view>

    <view class="action-bar" v-if="canEdit">
      <button class="btn btn-primary" @tap="handleEdit">编辑</button>
      <button class="btn btn-default" @tap="handleReject" v-if="canReject">退回修改</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      proposal: {
        title: '关于改善城市交通拥堵的建议',
        status: '处理中',
        department: '市交通局',
        assignDate: '2024-02-18',
        deadline: '2024-04-18',
        type: '人大建议',
        timeline: [
          {
            title: '文件上传',
            date: '2024-02-18',
            description: '已完成初始文件上传',
            completed: true
          },
          {
            title: '部门接收',
            date: '2024-02-19',
            description: '市交通局已接收任务',
            completed: true
          },
          {
            title: '会见照片',
            date: '2024-02-25',
            description: '待上传会见照片',
            completed: false
          },
          {
            title: '答复文件',
            date: null,
            description: '待上传答复文件',
            completed: false
          }
        ],
        files: [
          {
            name: '初始建议文件.pdf',
            size: '2.5MB'
          },
          {
            name: '部门接收回执.pdf',
            size: '1.2MB'
          }
        ]
      },
      canEdit: true,
      canReject: true
    }
  },
  methods: {
    getStatusClass() {
      return this.proposal.status === '已完成' ? 'status-completed' : 'status-processing'
    },
    previewFile(file) {
      // TODO: Implement file preview
      uni.showToast({
        title: '正在打开文件...',
        icon: 'loading'
      })
    },
    handleEdit() {
      uni.navigateTo({
        url: '/pages/proposal/edit'
      })
    },
    handleReject() {
      uni.showModal({
        title: '退回修改',
        content: '确认要将此建议退回修改吗？',
        success: (res) => {
          if (res.confirm) {
            // TODO: Implement rejection logic
          }
        }
      })
    }
  }
}
</script>

<style>
.proposal-detail {
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.header-card {
  margin-bottom: 20rpx;
}

.title-section {
  margin-bottom: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.status-tag {
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-completed {
  background: #e8f7ed;
  color: #52c41a;
}

.status-processing {
  background: #e6f7ff;
  color: #1890ff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
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

.timeline-card {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 24rpx;
  display: block;
}

.timeline {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 30rpx;
  padding-bottom: 40rpx;
  border-left: 2rpx solid #e8e8e8;
}

.timeline-item.completed {
  border-left-color: #1890ff;
}

.timeline-dot {
  position: absolute;
  left: -9rpx;
  top: 0;
  width: 16rpx;
  height: 16rpx;
  background: #d9d9d9;
  border-radius: 50%;
}

.timeline-item.completed .timeline-dot {
  background: #1890ff;
}

.timeline-content {
  padding-left: 20rpx;
}

.step-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
  display: block;
}

.step-date {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
  display: block;
}

.step-desc {
  font-size: 26rpx;
  color: #666;
}

.file-list {
  margin-top: 16rpx;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.file-item:last-child {
  border-bottom: none;
}

.file-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.file-size {
  font-size: 24rpx;
  color: #999;
}

.download-icon {
  font-size: 36rpx;
  color: #1890ff;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
}

.action-bar .btn {
  flex: 1;
  margin: 0 10rpx;
}
</style>
