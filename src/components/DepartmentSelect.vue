<template>
  <view class="department-select">
    <view class="select-header" @tap="showOptions">
      <text class="selected-text">{{ selected ? selected.name : placeholder }}</text>
      <text class="arrow-icon">{{ isOpen ? '▲' : '▼' }}</text>
    </view>
    
    <view class="options-wrapper" v-if="isOpen">
      <view class="option-list">
        <view class="option-item" 
              v-for="dept in departments" 
              :key="dept.id"
              @tap="selectDepartment(dept)">
          <text class="option-text">{{ dept.name }}</text>
          <text class="check-icon" v-if="selected && selected.id === dept.id">✓</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择部门'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      isOpen: false,
      selected: null,
      departments: [
        { id: 1, name: '市建设局' },
        { id: 2, name: '市交通局' },
        { id: 3, name: '市环保局' },
        { id: 4, name: '市信息化局' }
      ]
    }
  },
  methods: {
    showOptions() {
      this.isOpen = !this.isOpen
    },
    selectDepartment(dept) {
      this.selected = dept
      this.isOpen = false
      this.$emit('input', dept.id)
      this.$emit('change', dept)
    }
  },
  created() {
    if (this.value) {
      this.selected = this.departments.find(dept => dept.id === this.value)
    }
  }
}
</script>

<style>
.department-select {
  position: relative;
  width: 100%;
}

.select-header {
  height: 80rpx;
  background: #fff;
  border: 2rpx solid #e8e8e8;
  border-radius: 8rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-text {
  font-size: 28rpx;
  color: #333;
}

.arrow-icon {
  font-size: 24rpx;
  color: #999;
}

.options-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  border: 2rpx solid #e8e8e8;
  border-top: none;
  border-radius: 0 0 8rpx 8rpx;
  max-height: 400rpx;
  overflow-y: auto;
}

.option-item {
  height: 80rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option-item:active {
  background: #f5f5f5;
}

.option-text {
  font-size: 28rpx;
  color: #333;
}

.check-icon {
  color: #1890ff;
  font-size: 32rpx;
}
</style>
