<template>
  <div class="project-list">
    <h2 class="page-title">项目列表</h2>
    <div class="project-grid">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="project-card"
        @click="goToDetail(project.id)"
      >
        <div class="project-header">
          <h3 class="project-name">{{ project.name }}</h3>
          <span :class="['status-tag', project.is_recently_active ? 'active' : 'inactive']">
            {{ project.is_recently_active ? '近期活跃' : '需要更新' }}
          </span>
        </div>
        <div class="project-info">
          <p><span>投资主体：</span>{{ project.investor }}</p>
          <p><span>总投资：</span>{{ project.total_investment }}万元</p>
          <p><span>责任单位：</span>{{ project.responsible_unit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  computed: {
    projects() {
      return this.$store.state.projects
    }
  },
  created() {
    this.loadProjects()
  },
  methods: {
    async loadProjects() {
      try {
        await this.$store.dispatch('fetchProjects')
      } catch (error) {
        alert(error.message)
      }
    },
    goToDetail(id) {
      this.$router.push(`/projects/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  color: #333;
}

.project-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .project-name {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
}

.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;

  &.active {
    background: rgba(#52c41a, 0.1);
    color: #52c41a;
  }

  &.inactive {
    background: rgba(#faad14, 0.1);
    color: #faad14;
  }
}

.project-info {
  p {
    margin: 8px 0;
    color: #666;
    font-size: 14px;

    span {
      color: #999;
    }
  }
}
</style>
