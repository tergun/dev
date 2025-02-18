<template>
  <view class="proposal-list">
    <view class="filter-bar">
      <view class="filter-item" @tap="switchType('renda')">
        <text :class="['type-text', currentType === 'renda' ? 'active' : '']">人大建议</text>
      </view>
      <view class="filter-item" @tap="switchType('zhengxie')">
        <text :class="['type-text', currentType === 'zhengxie' ? 'active' : '']">政协提案</text>
      </view>
    </view>

    <view class="list-container">
      <view class="card proposal-item" v-for="(item, index) in proposalList" :key="index" @tap="goToDetail(item)">
        <view class="proposal-header">
          <text class="proposal-title">{{ item.title }}</text>
          <text :class="['status-tag', item.status === '已完成' ? 'status-completed' : 'status-processing']">
            {{ item.status }}
          </text>
        </view>
        <view class="proposal-info">
          <view class="info-item">
            <text class="label">承办部门：</text>
            <text class="value">{{ item.department }}</text>
          </view>
          <view class="info-item">
            <text class="label">交办日期：</text>
            <text class="value">{{ item.assignDate }}</text>
          </view>
        </view>
        <view class="progress-info" v-if="item.status !== '已完成'">
          <view class="progress-bar">
            <view class="progress-inner" :style="{ width: item.progress + '%' }"></view>
          </view>
          <text class="progress-text">{{ item.progress }}%</text>
        </view>
      </view>
    </view>

    <!-- 新增按钮（仅政府办可见） -->
    <view class="float-btn" v-if="isGovOffice" @tap="createNew">
      <text class="plus">+</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentType: 'renda',
      isGovOffice: true, // 根据用户角色动态设置
      proposalList: [
        {
          title: '关于改善城市交通拥堵的建议',
          status: '处理中',
          department: '市交通局',
          assignDate: '2024-02-18',
          progress: 60
        },
        {
          title: '关于加强环境保护的提案',
          status: '已完成',
          department: '市环保局',
          assignDate: '2024-02-15',
          progress: 100
        }
      ]
    }
  },
  methods: {
    switchType(type) {
      this.currentType = type
      // TODO: 根据类型加载相应数据
    },
    goToDetail(item) {
      uni.navigateTo({
        url: `/pages/proposal/detail?id=${item.id}`
      })
    },
    createNew() {
      uni.navigateTo({
        url: '/pages/proposal/create'
      })
    }
  }
}
</script>

<style scoped>
.proposal-list {
  padding-bottom: 120rpx;
}

.filter-bar {
  display: flex;
  background: #fff;
  padding: 20rpx 40rpx;
  border-bottom: 1rpx solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.filter-item {
  flex: 1;
  text-align: center;
}

.type-text {
  font-size: 32rpx;
  color: #666;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
}

.type-text.active {
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.list-container {
  padding: 20rpx;
}

.proposal-item {
  margin-bottom: 20rpx;
}

.proposal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.proposal-title {
  font-size: 32rpx;
  font-weight: 500;
  flex: 1;
  margin-right: 20rpx;
}

.status-tag {
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

.proposal-info {
  margin-bottom: 20rpx;
}

.info-item {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  color: #999;
  width: 160rpx;
}

.value {
  color: #333;
  flex: 1;
}

.progress-info {
  display: flex;
  align-items: center;
}

.progress-bar {
  flex: 1;
  height: 6rpx;
  background: #f0f0f0;
  border-radius: 3rpx;
  margin-right: 20rpx;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  background: #1890ff;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 24rpx;
  color: #666;
  width: 60rpx;
}

.float-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background: #1890ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.4);
}

.plus {
  color: #fff;
  font-size: 48rpx;
  font-weight: bold;
}
</style>
