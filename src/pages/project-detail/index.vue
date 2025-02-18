<template>
  <div class="project-detail">
    <div class="section">
      <h2 class="section-title">基本信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">调度层级</span>
          <span class="value">{{ project.level }}</span>
        </div>
        <div class="info-item">
          <span class="label">项目名称</span>
          <span class="value">{{ project.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">投资主体</span>
          <span class="value">{{ project.investor }}</span>
        </div>
        <div class="info-item">
          <span class="label">建设性质</span>
          <span class="value">{{ project.nature }}</span>
        </div>
        <div class="info-item">
          <span class="label">总投资</span>
          <span class="value">{{ project.total_investment }}万元</span>
        </div>
        <div class="info-item">
          <span class="label">2025年计划完成投资</span>
          <span class="value">{{ project.plan_investment_2025 }}万元</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">项目进展</h2>
      <div class="progress-section">
        <div class="progress-info">
          <span class="label">形象进度</span>
          <span class="value">{{ project.progress_percentage || 0 }}%</span>
        </div>
        <p class="progress-description">{{ project.progress_description || '暂无进展描述' }}</p>
      </div>
    </div>

    <div v-if="!project.is_recently_active" class="activity-warning">
      请注意：该项目7天内未更新内容
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      projectId: null
    }
  },
  computed: {
    project() {
      return this.$store.state.currentProject || {}
    }
  },
  created() {
    this.projectId = this.$route.params.id
    this.loadProjectDetail()
  },
  methods: {
    async loadProjectDetail() {
      try {
        await this.$store.dispatch('fetchProjectDetail', this.projectId)
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project-detail {
  padding: 20px;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  margin: 0 0 20px;
  color: #333;
  font-size: 18px;
}

.info-grid {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.info-item {
  .label {
    display: block;
    color: #999;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .value {
    color: #333;
    font-size: 16px;
  }
}

.progress-section {
  .progress-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .label {
      color: #999;
      font-size: 14px;
      margin-right: 10px;
    }

    .value {
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .progress-description {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
}

.activity-warning {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#faad14, 0.1);
  color: #faad14;
  text-align: center;
  padding: 10px;
  font-size: 14px;
}
</style>
