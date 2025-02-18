<template>
  <div class="approval-workflow">
    <h3>前期手续办理情况</h3>
    
    <el-table :data="approvals" border>
      <el-table-column prop="name" label="审批环节" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-select 
            v-model="row.status" 
            :disabled="!canEdit"
            @change="handleStatusChange(row)"
          >
            <el-option label="是" value="YES" />
            <el-option label="否" value="NO" />
            <el-option label="无需办理" value="UNNECESSARY" />
          </el-select>
        </template>
      </el-table-column>
      
      <!-- 否状态的额外字段 -->
      <el-table-column v-if="hasNoStatus" label="办理期限" width="150">
        <template #default="{ row }">
          <el-select
            v-if="row.status === 'NO'"
            v-model="row.deadline"
            :disabled="!canEdit"
          >
            <el-option label="1个月" value="1" />
            <el-option label="3个月" value="3" />
            <el-option label="6个月" value="6" />
            <el-option label="12个月" value="12" />
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column v-if="hasNoStatus" label="办理层级" width="150">
        <template #default="{ row }">
          <el-select
            v-if="row.status === 'NO'"
            v-model="row.level"
            :disabled="!canEdit"
          >
            <el-option label="旗级" value="BANNER" />
            <el-option label="市级" value="CITY" />
            <el-option label="自治区级" value="REGION" />
            <el-option label="国家级" value="NATIONAL" />
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column v-if="hasNoStatus" label="组卷情况" width="120">
        <template #default="{ row }">
          <el-button 
            v-if="row.status === 'NO'"
            size="small"
            @click="showDocumentDetails(row, 'document')"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
      
      <el-table-column v-if="hasNoStatus" label="审批情况" width="120">
        <template #default="{ row }">
          <el-button 
            v-if="row.status === 'NO'"
            size="small"
            @click="showDocumentDetails(row, 'approval')"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
      
      <!-- 是/无需办理状态的文件上传 -->
      <el-table-column label="相关文件" width="200">
        <template #default="{ row }">
          <template v-if="row.status === 'YES'">
            <el-upload
              v-if="canEdit"
              :action="uploadUrl"
              :headers="headers"
              :on-success="(res) => handleUploadSuccess(res, row)"
              :disabled="!canEdit"
            >
              <el-button size="small" type="primary">
                上传审批文件
              </el-button>
            </el-upload>
            <el-link 
              v-else-if="row.documentUrl"
              :href="row.documentUrl"
              target="_blank"
            >
              查看文件
            </el-link>
          </template>
          
          <template v-if="row.status === 'UNNECESSARY'">
            <el-upload
              v-if="canEdit"
              :action="uploadUrl"
              :headers="headers"
              :on-success="(res) => handleUploadSuccess(res, row)"
              :disabled="!canEdit"
            >
              <el-button size="small" type="primary">
                上传说明材料
              </el-button>
            </el-upload>
            <el-link 
              v-else-if="row.documentUrl"
              :href="row.documentUrl"
              target="_blank"
            >
              查看说明
            </el-link>
          </template>
        </template>
      </el-table-column>
      
      <el-table-column label="最后更新" width="160">
        <template #default="{ row }">
          <span>{{ formatDate(row.updatedAt) }}</span>
          <el-tag 
            :type="isRecentlyActive(row.updatedAt) ? 'success' : 'warning'"
            size="small"
            style="margin-left: 5px"
          >
            {{ isRecentlyActive(row.updatedAt) ? '近期活跃' : '需要更新' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情对话框 -->
    <el-dialog 
      v-model="detailsVisible"
      :title="detailsType === 'document' ? '组卷详情' : '审批详情'"
      width="600px"
    >
      <el-form :model="detailsForm" label-width="100px">
        <template v-if="detailsType === 'document'">
          <el-form-item label="材料清单">
            <el-input
              v-model="detailsForm.materials"
              type="textarea"
              :rows="4"
              :disabled="!canEdit"
            />
          </el-form-item>
          <el-form-item label="完成情况">
            <el-input
              v-model="detailsForm.completion"
              type="textarea"
              :rows="4"
              :disabled="!canEdit"
            />
          </el-form-item>
        </template>
        
        <template v-else>
          <el-form-item label="审批进度">
            <el-input
              v-model="detailsForm.progress"
              type="textarea"
              :rows="4"
              :disabled="!canEdit"
            />
          </el-form-item>
          <el-form-item label="存在问题">
            <el-input
              v-model="detailsForm.issues"
              type="textarea"
              :rows="4"
              :disabled="!canEdit"
            />
          </el-form-item>
        </template>
      </el-form>
      
      <template #footer>
        <el-button @click="detailsVisible = false">关闭</el-button>
        <el-button 
          v-if="canEdit"
          type="primary" 
          @click="saveDetails"
        >
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { isDesktop } from '@/utils/platform'
import { useStore } from 'vuex'

export default {
  name: 'ApprovalWorkflow',
  props: {
    projectId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const approvals = ref([
      // Mock data, should be fetched from API
      {
        id: 1,
        name: '环境影响评估',
        status: 'NO',
        deadline: '3',
        level: 'CITY',
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: '建设用地规划许可',
        status: 'YES',
        documentUrl: '#',
        updatedAt: new Date().toISOString()
      }
    ])

    const detailsVisible = ref(false)
    const detailsType = ref('')
    const detailsForm = ref({
      materials: '',
      completion: '',
      progress: '',
      issues: ''
    })
    const currentApproval = ref(null)

    const canEdit = computed(() => {
      return isDesktop()
    })

    const hasNoStatus = computed(() => {
      return approvals.value.some(a => a.status === 'NO')
    })

    const handleStatusChange = (row) => {
      // Reset fields when status changes
      row.deadline = null
      row.level = null
      row.documentUrl = null
    }

    const showDocumentDetails = (row, type) => {
      currentApproval.value = row
      detailsType.value = type
      detailsVisible.value = true
      
      // TODO: Fetch details from API
      detailsForm.value = {
        materials: '1. 环评报告\n2. 专家意见\n3. 公示材料',
        completion: '已完成材料收集，待专家评审',
        progress: '专家评审阶段',
        issues: '需要补充地质勘察报告'
      }
    }

    const saveDetails = async () => {
      try {
        // TODO: Call API to save details
        detailsVisible.value = false
      } catch (error) {
        console.error('Failed to save details:', error)
      }
    }

    const handleUploadSuccess = (response, row) => {
      row.documentUrl = response.url
      row.updatedAt = new Date().toISOString()
    }

    const isRecentlyActive = (date) => {
      if (!date) return false
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return new Date(date) > sevenDaysAgo
    }

    const formatDate = (date) => {
      if (!date) return '暂无更新'
      return new Date(date).toLocaleString('zh-CN')
    }

    return {
      approvals,
      detailsVisible,
      detailsType,
      detailsForm,
      canEdit,
      hasNoStatus,
      uploadUrl: '/api/supervision/file/upload', // TODO: Configure proper URL
      headers: {}, // TODO: Add auth headers
      handleStatusChange,
      showDocumentDetails,
      saveDetails,
      handleUploadSuccess,
      isRecentlyActive,
      formatDate
    }
  }
}
</script>

<style scoped>
.approval-workflow {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

h3 {
  margin-bottom: 20px;
}

.el-upload {
  width: 100%;
}
</style>
