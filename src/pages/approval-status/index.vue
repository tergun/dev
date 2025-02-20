<template>
  <view class="approval-status">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">前期手续办理情况</text>
    </view>

    <!-- 审批列表 -->
    <view class="approval-list">
      <uni-list>
        <uni-list-item v-for="item in approvalItems" :key="item.id">
          <template #body>
            <view class="approval-item">
              <!-- 审批环节名称 -->
              <view class="item-header">
                <text class="item-name">{{ item.name }}</text>
                <view :class="['status-tag', getStatusClass(item.status)]">
                  {{ item.status }}
                </view>
              </view>

              <!-- "否"状态的额外信息 -->
              <template v-if="item.status === '否'">
                <view class="detail-row">
                  <text class="label">办理期限：</text>
                  <text class="value">{{ item.deadline }}个月</text>
                </view>
                <view class="detail-row">
                  <text class="label">办理层级：</text>
                  <text class="value">{{ item.level }}</text>
                </view>
                <view class="detail-buttons">
                  <button class="detail-btn" @click="viewDetails(item, 'document')">
                    组卷情况
                  </button>
                  <button class="detail-btn" @click="viewDetails(item, 'approval')">
                    审批情况
                  </button>
                </view>
              </template>

              <!-- "是"状态的文件展示 -->
              <template v-if="item.status === '是' && item.approvalFile">
                <view class="file-info" @click="viewFile(item.approvalFile)">
                  <uni-icons type="file" size="20" />
                  <text class="file-name">{{ item.approvalFile.name }}</text>
                </view>
              </template>

              <!-- "无需办理"状态的说明材料 -->
              <template v-if="item.status === '无需办理' && item.explanation">
                <view class="explanation-box">
                  <text class="explanation-text">{{ item.explanation }}</text>
                </view>
              </template>

              <!-- 更新时间 -->
              <view class="update-time">
                <text>更新时间：{{ formatDate(item.updatedAt) }}</text>
                <view :class="['activity-tag', isRecentlyActive(item.updatedAt) ? 'active' : 'inactive']">
                  {{ isRecentlyActive(item.updatedAt) ? '近期活跃' : '需要更新' }}
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="detail-popup">
        <view class="popup-header">
          <text class="popup-title">{{ popupTitle }}</text>
          <view class="close-btn" @click="closePopup">
            <uni-icons type="close" size="20" />
          </view>
        </view>
        <view class="popup-content">
          <template v-if="currentDetailType === 'document'">
            <view class="detail-section">
              <text class="section-title">材料清单</text>
              <text class="section-content">{{ currentDetail.materials }}</text>
            </view>
            <view class="detail-section">
              <text class="section-title">完成情况</text>
              <text class="section-content">{{ currentDetail.completion }}</text>
            </view>
          </template>
          <template v-else>
            <view class="detail-section">
              <text class="section-title">审批进度</text>
              <text class="section-content">{{ currentDetail.progress }}</text>
            </view>
            <view class="detail-section">
              <text class="section-title">存在问题</text>
              <text class="section-content">{{ currentDetail.issues }}</text>
            </view>
          </template>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 审批项目数据
const approvalItems = ref([
  {
    id: 1,
    name: '环境影响评估',
    status: '否',
    deadline: 3,
    level: '市级',
    updatedAt: new Date(),
    materials: '1. 环评报告\n2. 专家意见\n3. 公示材料',
    completion: '已完成材料收集，待专家评审',
    progress: '专家评审阶段',
    issues: '需要补充地质勘察报告'
  },
  {
    id: 2,
    name: '建设用地规划许可',
    status: '是',
    approvalFile: {
      name: '建设用地规划许可证.pdf',
      url: 'https://example.com/file.pdf'
    },
    updatedAt: new Date()
  },
  {
    id: 3,
    name: '施工许可',
    status: '无需办理',
    explanation: '根据相关规定，本项目属于小型维修工程，无需办理施工许可。',
    updatedAt: new Date()
  }
])

// 弹窗相关
const detailPopup = ref(null)
const currentDetail = ref({})
const currentDetailType = ref('')
const popupTitle = computed(() => {
  return currentDetailType.value === 'document' ? '组卷情况' : '审批情况'
})

// 查看详情
const viewDetails = (item, type) => {
  currentDetail.value = item
  currentDetailType.value = type
  detailPopup.value.open()
}

// 关闭弹窗
const closePopup = () => {
  detailPopup.value.close()
}

// 查看文件
const viewFile = (file) => {
  // 在移动端打开文件预览
  uni.downloadFile({
    url: file.url,
    success: (res) => {
      uni.openDocument({
        filePath: res.tempFilePath,
        success: () => {
          console.log('文件打开成功')
        }
      })
    }
  })
}

// 状态样式
const getStatusClass = (status) => {
  const statusMap = {
    '是': 'status-yes',
    '否': 'status-no',
    '无需办理': 'status-unnecessary'
  }
  return statusMap[status] || ''
}

// 检查是否近期活跃
const isRecentlyActive = (date) => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return new Date(date) > sevenDaysAgo
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}
</script>

<style lang="scss">
.approval-status {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 20px;

  .page-header {
    padding: 16px;
    background-color: #fff;
    margin-bottom: 10px;
    
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #303133;
    }
  }

  .approval-item {
    padding: 12px;

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .item-name {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }

      .status-tag {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .status-yes {
        background-color: #f0f9eb;
        color: #67c23a;
      }

      .status-no {
        background-color: #fef0f0;
        color: #f56c6c;
      }

      .status-unnecessary {
        background-color: #f4f4f5;
        color: #909399;
      }
    }

    .detail-row {
      display: flex;
      margin-bottom: 8px;
      
      .label {
        color: #606266;
        width: 80px;
      }

      .value {
        color: #303133;
        flex: 1;
      }
    }

    .detail-buttons {
      display: flex;
      gap: 10px;
      margin: 12px 0;

      .detail-btn {
        flex: 1;
        font-size: 14px;
        padding: 6px 0;
        background-color: #ecf5ff;
        color: #409eff;
        border: none;
        border-radius: 4px;
      }
    }

    .file-info {
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: #f5f7fa;
      border-radius: 4px;
      margin: 8px 0;

      .file-name {
        margin-left: 8px;
        color: #409eff;
        font-size: 14px;
      }
    }

    .explanation-box {
      background-color: #fdf6ec;
      padding: 8px;
      border-radius: 4px;
      margin: 8px 0;

      .explanation-text {
        color: #e6a23c;
        font-size: 14px;
      }
    }

    .update-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 12px;
      color: #909399;

      .activity-tag {
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
      }

      .active {
        background-color: #f0f9eb;
        color: #67c23a;
      }

      .inactive {
        background-color: #fef0f0;
        color: #f56c6c;
      }
    }
  }

  .detail-popup {
    background-color: #fff;
    border-radius: 8px;
    width: 80vw;
    max-height: 70vh;
    overflow-y: auto;

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #ebeef5;

      .popup-title {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }

      .close-btn {
        padding: 4px;
      }
    }

    .popup-content {
      padding: 16px;

      .detail-section {
        margin-bottom: 16px;

        .section-title {
          font-size: 14px;
          color: #606266;
          margin-bottom: 8px;
          display: block;
        }

        .section-content {
          font-size: 14px;
          color: #303133;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
