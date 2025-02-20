<template>
  <mobile-container>
    <view class="project-list">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <uni-search-bar
          v-model="searchText"
          placeholder="搜索项目"
          @confirm="handleSearch"
          cancelButton="none"
        />
      </view>

      <!-- 项目列表 -->
      <view class="list-container">
        <uni-list>
          <uni-list-item
            v-for="project in filteredProjects"
            :key="project.id"
            clickable
            @click="handleProjectClick(project)"
          >
            <template #header>
              <view class="project-icon">
                <uni-icons type="folder" size="24" color="#409EFF" />
              </view>
            </template>

            <template #body>
              <view class="project-info">
                <text class="project-name">{{ project.name }}</text>
                <view class="project-details">
                  <text class="level-tag">{{ project.level }}</text>
                  <text class="investment"
                    >投资:
                    {{ formatInvestment(project.totalInvestment) }}万</text
                  >
                </view>
                <view class="progress-bar">
                  <progress
                    :percent="project.progress"
                    active
                    stroke-width="3"
                    activeColor="#409EFF"
                  />
                  <text class="progress-text">{{ project.progress }}%</text>
                </view>
              </view>
            </template>

            <template #footer>
              <view class="project-status">
                <text :class="['status-tag', getStatusClass(project.status)]">
                  {{ getStatusText(project.status) }}
                </text>
                <text class="update-time">{{
                  formatDate(project.updatedAt)
                }}</text>
              </view>
            </template>
          </uni-list-item>
        </uni-list>

        <!-- 空状态 -->
        <uni-empty v-if="filteredProjects.length === 0" text="暂无项目" />
      </view>
    </view>
  </mobile-container>
</template>

<script setup>
import { ref, computed } from "vue";
import MobileContainer from "../base/MobileContainer.vue";

const searchText = ref("");
const projects = ref([]);

const filteredProjects = computed(() => {
  if (!searchText.value) return projects.value;
  const keyword = searchText.value.toLowerCase();
  return projects.value.filter(
    (project) =>
      project.name.toLowerCase().includes(keyword) ||
      project.level.toLowerCase().includes(keyword),
  );
});

const handleSearch = () => {
  // 实现搜索功能
};

const handleProjectClick = (project) => {
  uni.navigateTo({
    url: `/pages/project-detail/index?id=${project.id}`,
  });
};

const formatInvestment = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("zh-CN");
};

const getStatusClass = (status) => {
  const statusMap = {
    processing: "status-processing",
    pending: "status-pending",
    completed: "status-completed",
  };
  return statusMap[status] || "";
};

const getStatusText = (status) => {
  const statusMap = {
    processing: "进行中",
    pending: "待开始",
    completed: "已完成",
  };
  return statusMap[status] || status;
};
</script>

<style lang="scss">
.project-list {
  min-height: 100vh;
  background-color: #f5f7fa;

  .search-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .list-container {
    padding: 10px;
  }

  .project-info {
    padding: 10px 0;

    .project-name {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 8px;
    }

    .project-details {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .level-tag {
        background-color: #e1f3ff;
        color: #409eff;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 10px;
      }

      .investment {
        color: #606266;
        font-size: 12px;
      }
    }

    .progress-bar {
      display: flex;
      align-items: center;

      progress {
        flex: 1;
        margin-right: 10px;
      }

      .progress-text {
        font-size: 12px;
        color: #409eff;
        min-width: 40px;
      }
    }
  }

  .project-status {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status-tag {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .status-processing {
      background-color: #e1f3d8;
      color: #67c23a;
    }

    .status-pending {
      background-color: #fdf6ec;
      color: #e6a23c;
    }

    .status-completed {
      background-color: #f0f9eb;
      color: #67c23a;
    }

    .update-time {
      font-size: 12px;
      color: #909399;
    }
  }

  .project-icon {
    margin-right: 10px;
  }
}
</style>
