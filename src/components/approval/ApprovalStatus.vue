<template>
  <mobile-container>
    <view class="approval-status">
      <!-- 审批状态列表 -->
      <uni-list>
        <uni-list-item v-for="(item, index) in approvalItems" :key="index">
          <template #header>
            <view class="approval-icon">
              <uni-icons
                :type="getStatusIcon(item.status)"
                size="24"
                :color="getStatusColor(item.status)"
              />
            </view>
          </template>

          <template #body>
            <view class="approval-info">
              <text class="approval-title">{{ item.title }}</text>

              <!-- 状态为"否"时显示的内容 -->
              <template v-if="item.status === 'no'">
                <view class="approval-details">
                  <view class="detail-item">
                    <text class="label">办理期限：</text>
                    <uni-data-select
                      v-model="item.deadline"
                      :localdata="deadlineOptions"
                      disabled
                    />
                  </view>
                  <view class="detail-item">
                    <text class="label">办理层级：</text>
                    <uni-data-select
                      v-model="item.level"
                      :localdata="levelOptions"
                      disabled
                    />
                  </view>
                  <view class="detail-buttons">
                    <button
                      class="detail-btn"
                      @click="viewDetails(item, 'filing')"
                    >
                      组卷情况
                    </button>
                    <button
                      class="detail-btn"
                      @click="viewDetails(item, 'approval')"
                    >
                      审批情况
                    </button>
                  </view>
                </view>
              </template>

              <!-- 状态为"是"时显示的内容 -->
              <template v-if="item.status === 'yes'">
                <view class="approval-files">
                  <text class="file-label">审批文件：</text>
                  <view class="file-list">
                    <view
                      v-for="(file, fileIndex) in item.files"
                      :key="fileIndex"
                      class="file-item"
                    >
                      <uni-icons type="file" size="20" />
                      <text class="file-name">{{ file.name }}</text>
                    </view>
                  </view>
                </view>
              </template>

              <!-- 状态为"无需办理"时显示的内容 -->
              <template v-if="item.status === 'unnecessary'">
                <view class="approval-note">
                  <text class="note-label">说明材料：</text>
                  <text class="note-content">{{ item.note }}</text>
                </view>
              </template>
            </view>
          </template>

          <template #footer>
            <view class="approval-status-footer">
              <text :class="['status-tag', getStatusClass(item.status)]">
                {{ getStatusText(item.status) }}
              </text>
              <text
                class="update-time"
                v-if="isRecentlyUpdated(item.updatedAt)"
              >
                最近7天内更新
              </text>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </mobile-container>
</template>

<script setup>
import { ref } from "vue";
import MobileContainer from "../base/MobileContainer.vue";

const deadlineOptions = [
  { value: "1month", text: "1个月" },
  { value: "3months", text: "3个月" },
  { value: "6months", text: "6个月" },
  { value: "1year", text: "1年" },
];

const levelOptions = [
  { value: "banner", text: "旗级" },
  { value: "city", text: "市级" },
  { value: "region", text: "自治区级" },
  { value: "national", text: "国家级" },
];

const approvalItems = ref([
  {
    title: "环境影响评估",
    status: "no",
    deadline: "3months",
    level: "city",
    updatedAt: new Date(),
  },
  {
    title: "建设用地规划许可证",
    status: "yes",
    files: [{ name: "许可证.pdf", url: "#" }],
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    title: "临时用地许可",
    status: "unnecessary",
    note: "项目用地为永久性建设用地，无需办理临时用地许可",
    updatedAt: new Date(),
  },
]);

const getStatusIcon = (status) => {
  const icons = {
    yes: "checkbox-filled",
    no: "closeempty",
    unnecessary: "info-filled",
  };
  return icons[status] || "help";
};

const getStatusColor = (status) => {
  const colors = {
    yes: "#67c23a",
    no: "#f56c6c",
    unnecessary: "#909399",
  };
  return colors[status] || "#909399";
};

const getStatusClass = (status) => {
  const classes = {
    yes: "status-yes",
    no: "status-no",
    unnecessary: "status-unnecessary",
  };
  return classes[status] || "";
};

const getStatusText = (status) => {
  const texts = {
    yes: "已完成",
    no: "未完成",
    unnecessary: "无需办理",
  };
  return texts[status] || status;
};

const isRecentlyUpdated = (date) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return new Date(date) > sevenDaysAgo;
};

const viewDetails = () => {
  uni.showToast({
    title: "请在电脑端查看详细信息",
    icon: "none",
  });
};
</script>

<style lang="scss">
.approval-status {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 10px;

  .approval-info {
    padding: 10px 0;

    .approval-title {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 12px;
    }

    .approval-details {
      .detail-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .label {
          width: 80px;
          font-size: 14px;
          color: #606266;
        }
      }

      .detail-buttons {
        display: flex;
        gap: 10px;
        margin-top: 12px;

        .detail-btn {
          flex: 1;
          font-size: 14px;
          padding: 6px 12px;
          background-color: #f4f4f5;
          color: #606266;
          border: none;
          border-radius: 4px;

          &:active {
            opacity: 0.8;
          }
        }
      }
    }

    .approval-files {
      .file-label {
        font-size: 14px;
        color: #606266;
        margin-bottom: 8px;
        display: block;
      }

      .file-list {
        .file-item {
          display: flex;
          align-items: center;
          padding: 6px 0;

          .file-name {
            margin-left: 8px;
            font-size: 14px;
            color: #409eff;
          }
        }
      }
    }

    .approval-note {
      .note-label {
        font-size: 14px;
        color: #606266;
        margin-bottom: 8px;
        display: block;
      }

      .note-content {
        font-size: 14px;
        color: #606266;
        line-height: 1.4;
      }
    }
  }

  .approval-status-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status-tag {
      padding: 2px 8px;
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

    .update-time {
      font-size: 12px;
      color: #409eff;
    }
  }

  .approval-icon {
    margin-right: 10px;
  }
}
</style>
