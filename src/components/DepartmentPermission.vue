<template>
  <div class="department-permission">
    <h3>部门权限管理</h3>
    
    <el-table :data="permissions" border>
      <el-table-column prop="deptName" label="部门名称" />
      <el-table-column prop="year" label="年度" width="100" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'info'">
            {{ row.status ? '有效' : '无效' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="isAdmin">
        <template #default="{ row }">
          <el-button 
            type="primary" 
            size="small" 
            @click="updatePermission(row)"
            :disabled="!isDesktop"
          >
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog 
      v-model="dialogVisible" 
      title="修改部门权限"
      width="500px"
    >
      <el-form 
        ref="form"
        :model="formData"
        label-width="100px"
      >
        <el-form-item label="部门">
          <span>{{ currentDept?.name }}</span>
        </el-form-item>
        
        <el-form-item label="年度">
          <el-input-number 
            v-model="formData.year"
            :min="2024"
            :max="2030"
          />
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch
            v-model="formData.status"
            active-text="有效"
            inactive-text="无效"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPermission">
          确认
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
  name: 'DepartmentPermission',
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)
    const currentDept = ref(null)
    const formData = ref({
      year: new Date().getFullYear(),
      status: true
    })

    const isAdmin = computed(() => {
      const userRole = store.state.user?.role
      return userRole === 'supervision_admin'
    })

    const permissions = ref([
      // Mock data, should be fetched from API
      { deptId: 1, deptName: '发改委', year: 2025, status: true },
      { deptId: 2, deptName: '建设局', year: 2025, status: true }
    ])

    const updatePermission = (dept) => {
      currentDept.value = dept
      formData.value = {
        year: dept.year,
        status: dept.status
      }
      dialogVisible.value = true
    }

    const submitPermission = async () => {
      try {
        // TODO: Call API to update permission
        const index = permissions.value.findIndex(
          p => p.deptId === currentDept.value.deptId
        )
        if (index > -1) {
          permissions.value[index] = {
            ...permissions.value[index],
            ...formData.value
          }
        }
        dialogVisible.value = false
      } catch (error) {
        console.error('Failed to update permission:', error)
      }
    }

    return {
      permissions,
      dialogVisible,
      formData,
      currentDept,
      isAdmin,
      isDesktop,
      updatePermission,
      submitPermission
    }
  }
}
</script>

<style scoped>
.department-permission {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

h3 {
  margin-bottom: 20px;
}
</style>
