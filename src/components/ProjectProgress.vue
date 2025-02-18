<template>
  <div class="project-progress">
    <div class="progress-header">
      <h3>项目进展</h3>
      <span class="last-update">
        最近更新: {{ formatDate(lastUpdateTime) }}
        <el-tag 
          :type="isRecentlyActive ? 'success' : 'warning'"
          size="small"
        >
          {{ isRecentlyActive ? '近期活跃' : '需要更新' }}
        </el-tag>
      </span>
    </div>

    <el-form ref="form" :model="formData" label-width="120px">
      <el-form-item label="进展情况">
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="4"
          :disabled="!isDesktop"
          placeholder="请输入项目进展情况描述"
        />
      </el-form-item>

      <el-form-item label="形象进度">
        <el-slider
          v-model="formData.percentage"
          :min="0"
          :max="100"
          :disabled="!isDesktop"
        />
        <span class="percentage-text">{{ formData.percentage }}%</span>
      </el-form-item>

      <el-form-item v-if="isDesktop">
        <el-button type="primary" @click="submitProgress">
          更新进度
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { isDesktop } from '@/utils/platform'
import { updateProjectProgress } from '@/api/project'

export default {
  name: 'ProjectProgress',
  props: {
    projectId: {
      type: [String, Number],
      required: true
    },
    initialProgress: {
      type: Object,
      default: () => ({
        description: '',
        percentage: 0,
        lastUpdateTime: null
      })
    }
  },
  setup(props, { emit }) {
    const formData = ref({
      description: props.initialProgress.description,
      percentage: props.initialProgress.percentage
    })

    const lastUpdateTime = ref(props.initialProgress.lastUpdateTime)

    const isRecentlyActive = computed(() => {
      if (!lastUpdateTime.value) return false
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return new Date(lastUpdateTime.value) > sevenDaysAgo
    })

    const submitProgress = async () => {
      try {
        await updateProjectProgress(props.projectId, formData.value)
        lastUpdateTime.value = new Date().toISOString()
        emit('update-success')
      } catch (error) {
        console.error('Failed to update progress:', error)
      }
    }

    const formatDate = (date) => {
      if (!date) return '暂无更新'
      return new Date(date).toLocaleString('zh-CN')
    }

    return {
      formData,
      lastUpdateTime,
      isRecentlyActive,
      isDesktop,
      submitProgress,
      formatDate
    }
  }
}
</script>

<style scoped>
.project-progress {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.progress-header h3 {
  margin: 0;
}

.last-update {
  font-size: 14px;
  color: #909399;
}

.percentage-text {
  margin-left: 10px;
  color: #409EFF;
  font-weight: bold;
}
</style>
