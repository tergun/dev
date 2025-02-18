<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="formData.name" :disabled="!isDesktop" />
    </el-form-item>
    
    <el-form-item label="调度层级" prop="level">
      <el-select v-model="formData.level" :disabled="!isDesktop">
        <el-option label="市级" value="市级" />
        <el-option label="区级" value="区级" />
        <el-option label="县级" value="县级" />
      </el-select>
    </el-form-item>
    
    <el-form-item label="投资主体" prop="investor">
      <el-input v-model="formData.investor" :disabled="!isDesktop" />
    </el-form-item>
    
    <el-form-item label="建设性质" prop="nature">
      <el-input v-model="formData.nature" :disabled="!isDesktop" />
    </el-form-item>
    
    <el-form-item label="总投资(万元)" prop="totalInvestment">
      <el-input-number 
        v-model="formData.totalInvestment" 
        :min="0" 
        :disabled="!isDesktop" 
      />
    </el-form-item>
    
    <el-form-item label="2025年计划完成投资" prop="planInvestment2025">
      <el-input-number 
        v-model="formData.planInvestment2025" 
        :min="0" 
        :disabled="!isDesktop" 
      />
    </el-form-item>
    
    <el-form-item label="计划开复工时间" prop="planStartTime">
      <el-date-picker
        v-model="formData.planStartTime"
        type="date"
        :disabled="!isDesktop"
      />
    </el-form-item>
    
    <el-form-item label="计划完工时间" prop="planEndTime">
      <el-date-picker
        v-model="formData.planEndTime"
        type="date"
        :disabled="!isDesktop"
      />
    </el-form-item>
    
    <el-form-item label="分管领导" prop="leaderUserId">
      <el-select v-model="formData.leaderUserId" :disabled="!isDesktop">
        <el-option 
          v-for="leader in leaders" 
          :key="leader.id" 
          :label="leader.name" 
          :value="leader.id" 
        />
      </el-select>
    </el-form-item>
    
    <el-form-item label="责任单位" prop="deptId">
      <el-select v-model="formData.deptId" :disabled="!isDesktop">
        <el-option 
          v-for="dept in departments" 
          :key="dept.id" 
          :label="dept.name" 
          :value="dept.id" 
        />
      </el-select>
    </el-form-item>
    
    <el-form-item v-if="isDesktop">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive } from 'vue'
import { isDesktop } from '@/utils/platform'
import { updateProjectInfo, createProject } from '@/api/project'

export default {
  name: 'ProjectForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const form = ref(null)
    const formData = reactive({
      name: '',
      level: '',
      investor: '',
      nature: '',
      totalInvestment: 0,
      planInvestment2025: 0,
      planStartTime: '',
      planEndTime: '',
      leaderUserId: '',
      deptId: '',
      ...props.initialData
    })

    const rules = {
      name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
      level: [{ required: true, message: '请选择调度层级', trigger: 'change' }],
      investor: [{ required: true, message: '请输入投资主体', trigger: 'blur' }],
      nature: [{ required: true, message: '请输入建设性质', trigger: 'blur' }],
      totalInvestment: [{ required: true, message: '请输入总投资', trigger: 'blur' }],
      planInvestment2025: [{ required: true, message: '请输入2025年计划完成投资', trigger: 'blur' }],
      planStartTime: [{ required: true, message: '请选择计划开复工时间', trigger: 'change' }],
      planEndTime: [{ required: true, message: '请选择计划完工时间', trigger: 'change' }],
      leaderUserId: [{ required: true, message: '请选择分管领导', trigger: 'change' }],
      deptId: [{ required: true, message: '请选择责任单位', trigger: 'change' }]
    }

    const submitForm = async () => {
      if (!form.value) return
      
      try {
        await form.value.validate()
        if (props.initialData.id) {
          await updateProjectInfo(props.initialData.id, formData)
        } else {
          await createProject(formData)
        }
        emit('submit-success')
      } catch (error) {
        console.error('Form validation failed:', error)
      }
    }

    const resetForm = () => {
      if (form.value) {
        form.value.resetFields()
      }
    }

    return {
      form,
      formData,
      rules,
      isDesktop,
      submitForm,
      resetForm,
      leaders: [], // TODO: Fetch from API
      departments: [] // TODO: Fetch from API
    }
  }
}
</script>
