<template>
  <mobile-container>
    <view class="project-detail">
      <!-- 基础信息 -->
      <uni-section title="基础信息" type="line">
        <view class="info-section">
          <view class="info-item">
            <text class="label">调度层级：</text>
            <text class="value">{{ project.level }}</text>
          </view>
          <view class="info-item">
            <text class="label">项目名称：</text>
            <text class="value">{{ project.name }}</text>
          </view>
          <view class="info-item">
            <text class="label">投资主体：</text>
            <text class="value">{{ project.investor }}</text>
          </view>
          <view class="info-item">
            <text class="label">建设性质：</text>
            <text class="value">{{ project.nature }}</text>
          </view>
          <view class="info-item">
            <text class="label">总投资：</text>
            <text class="value"
              >{{ formatInvestment(project.totalInvestment) }}万</text
            >
          </view>
          <view class="info-item">
            <text class="label">2025年计划完成投资：</text>
            <text class="value"
              >{{ formatInvestment(project.plannedInvestment2025) }}万</text
            >
          </view>
          <view class="info-item">
            <text class="label">计划开复工时间：</text>
            <text class="value">{{
              formatDate(project.plannedStartDate)
            }}</text>
          </view>
          <view class="info-item">
            <text class="label">计划完工时间：</text>
            <text class="value">{{ formatDate(project.plannedEndDate) }}</text>
          </view>
          <view class="info-item">
            <text class="label">分管领导：</text>
            <text class="value">{{ project.supervisor }}</text>
          </view>
          <view class="info-item">
            <text class="label">责任单位：</text>
            <text class="value">{{ project.responsibleUnit }}</text>
          </view>
        </view>
      </uni-section>

      <!-- 进展情况 -->
      <uni-section title="项目进展" type="line">
        <view class="progress-section">
          <view class="progress-bar">
            <progress
              :percent="project.progress"
              active
              stroke-width="3"
              activeColor="#409EFF"
            />
            <text class="progress-text">{{ project.progress }}%</text>
          </view>
          <view class="progress-desc">
            <text>{{ project.progressDescription }}</text>
          </view>
          <view class="last-update" v-if="isRecentlyUpdated(project.updatedAt)">
            <uni-icons type="info" size="14" color="#409EFF" />
            <text class="update-text">7天内更新</text>
          </view>
        </view>
      </uni-section>
    </view>
  </mobile-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MobileContainer from "@/components/base/MobileContainer.vue";

const project = ref({
  level: "市级",
  name: "城市基础设施改造项目",
  investor: "市政府",
  nature: "改造",
  totalInvestment: 50000,
  plannedInvestment2025: 20000,
  plannedStartDate: "2025-03-01",
  plannedEndDate: "2025-12-31",
  supervisor: "张三",
  responsibleUnit: "市建设局",
  progress: 15,
  progressDescription: "项目前期准备工作进行中，环评报告已完成初稿。",
  updatedAt: new Date(),
});

const formatInvestment = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("zh-CN") : "--";
};

const isRecentlyUpdated = (date) => {
  if (!date) return false;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return new Date(date) > sevenDaysAgo;
};

onMounted(async () => {
  // TODO: Fetch project details from API
});
</script>

<style lang="scss">
.project-detail {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 10px;

  .info-section {
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;

    .info-item {
      display: flex;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        width: 140px;
        color: #606266;
        font-size: 14px;
      }

      .value {
        flex: 1;
        color: #303133;
        font-size: 14px;
      }
    }
  }

  .progress-section {
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;

    .progress-bar {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      progress {
        flex: 1;
        margin-right: 10px;
      }

      .progress-text {
        font-size: 14px;
        color: #409eff;
        min-width: 40px;
      }
    }

    .progress-desc {
      color: #606266;
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .last-update {
      display: flex;
      align-items: center;

      .update-text {
        margin-left: 4px;
        font-size: 12px;
        color: #409eff;
      }
    }
  }
}
</style>
