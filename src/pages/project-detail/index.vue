<template>
  <view class="project-detail">
    <view class="section">
      <view class="section-title">基础信息</view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">调度层级</text>
          <text class="value">{{ project.level }}</text>
        </view>
        <view class="info-item">
          <text class="label">项目名称</text>
          <text class="value">{{ project.name }}</text>
        </view>
        <view class="info-item">
          <text class="label">投资主体</text>
          <text class="value">{{ project.investor }}</text>
        </view>
        <view class="info-item">
          <text class="label">建设性质</text>
          <text class="value">{{ project.nature }}</text>
        </view>
        <view class="info-item">
          <text class="label">总投资</text>
          <text class="value">{{ project.totalInvestment }}万元</text>
        </view>
        <view class="info-item">
          <text class="label">2025年计划完成投资</text>
          <text class="value">{{ project.planInvestment2025 }}万元</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">前期手续办理情况</view>
      <view class="approval-list">
        <view 
          v-for="(item, index) in approvalSteps" 
          :key="index"
          class="approval-item"
        >
          <view class="approval-header">
            <text class="approval-name">{{ item.name }}</text>
            <view :class="['status-tag', item.status]">{{ item.statusText }}</view>
          </view>
          <view v-if="item.status === 'no'" class="approval-detail">
            <view class="detail-item">
              <text class="detail-label">办理期限：</text>
              <picker 
                mode="selector" 
                :range="deadlineOptions"
                @change="handleDeadlineChange"
              >
                <text class="picker-text">{{ item.deadline || '请选择' }}</text>
              </picker>
            </view>
            <view class="detail-item">
              <text class="detail-label">办理层级：</text>
              <picker 
                mode="selector" 
                :range="levelOptions"
                @change="handleLevelChange"
              >
                <text class="picker-text">{{ item.level || '请选择' }}</text>
              </picker>
            </view>
            <view class="action-buttons">
              <button class="btn" @tap="viewDetails(item, 'docs')">组卷情况</button>
              <button class="btn" @tap="viewDetails(item, 'approval')">审批情况</button>
            </view>
          </view>
          <view v-if="item.status === 'yes'" class="upload-area">
            <button class="upload-btn" @tap="uploadFile">上传审批文件</button>
          </view>
          <view v-if="item.status === 'unnecessary'" class="upload-area">
            <button class="upload-btn" @tap="uploadExplanation">上传说明材料</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      project: {
        level: '市级',
        name: '示例项目',
        investor: '示例投资公司',
        nature: '新建',
        totalInvestment: 10000,
        planInvestment2025: 5000
      },
      approvalSteps: [
        {
          name: '立项批复',
          status: 'yes',
          statusText: '已完成'
        },
        {
          name: '环评批复',
          status: 'no',
          statusText: '未完成',
          deadline: '',
          level: ''
        },
        {
          name: '规划许可',
          status: 'unnecessary',
          statusText: '无需办理'
        }
      ],
      deadlineOptions: ['1个月', '3个月', '6个月', '12个月'],
      levelOptions: ['旗级', '市级', '自治区级', '国家级']
    }
  },
  methods: {
    handleDeadlineChange(e) {
      const index = e.detail.value
      // TODO: Update deadline
    },
    handleLevelChange(e) {
      const index = e.detail.value
      // TODO: Update level
    },
    viewDetails(item, type) {
      // TODO: Navigate to details page
    },
    uploadFile() {
      // TODO: Implement file upload
      if (uni.getSystemInfoSync().platform === 'mobile') {
        uni.showToast({
          title: '请在电脑端进行文件上传操作',
          icon: 'none'
        })
        return
      }
    },
    uploadExplanation() {
      // TODO: Implement explanation upload
      if (uni.getSystemInfoSync().platform === 'mobile') {
        uni.showToast({
          title: '请在电脑端进行文件上传操作',
          icon: 'none'
        })
        return
      }
    }
  }
}
</script>

<style>
.project-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  border-left: 8rpx solid #2d8cf0;
  padding-left: 20rpx;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.info-item {
  background: #f8f8f8;
  padding: 20rpx;
  border-radius: 12rpx;
}

.label {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 10rpx;
}

.value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.approval-item {
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.approval-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.approval-name {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.status-tag {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.status-tag.yes {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.status-tag.no {
  background: rgba(245, 34, 45, 0.1);
  color: #f5222d;
}

.status-tag.unnecessary {
  background: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.approval-detail {
  background: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.detail-label {
  font-size: 26rpx;
  color: #666;
  width: 160rpx;
}

.picker-text {
  font-size: 26rpx;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.btn {
  flex: 1;
  font-size: 26rpx;
  padding: 16rpx 0;
  background: #2d8cf0;
  color: #fff;
  border-radius: 8rpx;
}

.upload-area {
  padding: 20rpx 0 0;
}

.upload-btn {
  width: 100%;
  font-size: 26rpx;
  padding: 16rpx 0;
  background: #2d8cf0;
  color: #fff;
  border-radius: 8rpx;
}
</style>
