# 前端实现计划

## 1. 技术栈选型

### 1.1 框架和库
- 基础框架：Vue 3.0
- UI组件库：Ant-Design-Vue4
- 构建工具：Vite
- 状态管理：Pinia
- 类型系统：TypeScript
- 表格组件：VxeTable (用于复杂表格展示)

### 1.2 项目结构
基于JeecgBoot-Vue3的目录结构：
```
src/
├── api/                # API接口定义
│   ├── project/       # 项目管理相关接口
│   ├── approval/      # 审批管理相关接口
│   └── progress/      # 进展管理相关接口
├── components/         # 公共组件
│   ├── Project/       # 项目相关组件
│   ├── Approval/      # 审批相关组件
│   └── Progress/      # 进展相关组件
├── views/             # 页面
│   ├── project/       # 项目管理
│   ├── approval/      # 审批管理
│   └── progress/      # 进展管理
├── store/             # 状态管理
├── utils/             # 工具函数
└── router/            # 路由配置
```

## 2. 页面设计

### 2.1 项目列表页 (ProjectList.vue)
```vue
<template>
  <div class="project-list">
    <a-card>
      <!-- 搜索表单 -->
      <a-form layout="inline">
        <a-form-item label="项目名称">
          <a-input v-model:value="queryParams.projectName" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
        </a-form-item>
      </a-form>
      
      <!-- 项目列表表格 -->
      <vxe-table
        :data="projectList"
        :columns="columns">
        <template #action="{ row }">
          <a-button @click="viewDetail(row)">查看</a-button>
        </template>
      </vxe-table>
    </a-card>
  </div>
</template>
```

### 2.2 项目详情页 (ProjectDetail.vue)
```vue
<template>
  <div class="project-detail">
    <!-- 基本信息卡片 -->
    <a-card title="基本信息" v-permission="['project:view']">
      <a-descriptions>
        <a-descriptions-item label="调度层级">
          {{ projectInfo.dispatchLevel }}
        </a-descriptions-item>
        <!-- 其他基本信息字段 -->
      </a-descriptions>
      <a-button 
        v-permission="['project:edit']"
        @click="handleEdit">
        编辑
      </a-button>
    </a-card>

    <!-- 审批进度卡片 -->
    <a-card title="前期手续办理情况">
      <approval-steps 
        :approvals="approvalList"
        @update="handleApprovalUpdate"
      />
    </a-card>

    <!-- 项目进展卡片 -->
    <a-card title="项目进展">
      <a-form>
        <a-form-item label="进展情况">
          <a-textarea 
            v-model:value="progress.description"
            :rows="4"
          />
        </a-form-item>
        <a-form-item label="形象进度">
          <a-select
            v-model:value="progress.percentage"
            :options="percentageOptions"
          />
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 活跃度监测卡片 -->
    <a-card title="活跃度监测">
      <activity-timeline :activities="activityList" />
    </a-card>
  </div>
</template>
```

### 2.3 自定义组件

#### 2.3.1 审批步骤组件 (ApprovalSteps.vue)
```vue
<template>
  <div class="approval-steps">
    <a-steps>
      <a-step 
        v-for="approval in approvals"
        :key="approval.id"
        :status="getStepStatus(approval)">
        <template #title>
          {{ approval.name }}
        </template>
        <template #description>
          <approval-detail
            :approval="approval"
            @update="handleUpdate"
          />
        </template>
      </a-step>
    </a-steps>
  </div>
</template>
```

#### 2.3.2 活跃度时间线组件 (ActivityTimeline.vue)
```vue
<template>
  <div class="activity-timeline">
    <a-timeline>
      <a-timeline-item 
        v-for="activity in activities"
        :key="activity.id"
        :color="getActivityColor(activity)">
        {{ activity.content }}
        <span class="activity-time">
          {{ formatTime(activity.time) }}
        </span>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
```

## 3. 权限控制

### 3.1 权限指令
```typescript
// directives/permission.ts
import type { Directive } from 'vue'
import { useUserStore } from '@/store/modules/user'

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const userStore = useUserStore()
    const hasPermission = userStore.hasPermission(value)
    
    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  }
}
```

### 3.2 路由权限
```typescript
// router/guard.ts
import { usePermissionStore } from '@/store/modules/permission'

export function createPermissionGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const permissionStore = usePermissionStore()
    
    if (to.meta.roles && !permissionStore.hasRole(to.meta.roles)) {
      next('/403')
      return
    }
    
    next()
  })
}
```

## 4. 状态管理

### 4.1 项目状态
```typescript
// store/modules/project.ts
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projectList: [],
    currentProject: null,
    loading: false
  }),
  
  actions: {
    async fetchProjects(params) {
      this.loading = true
      try {
        const res = await getProjectList(params)
        this.projectList = res.data
      } finally {
        this.loading = false
      }
    }
  }
})
```

### 4.2 活跃度状态
```typescript
// store/modules/activity.ts
import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    lastUpdateTime: null
  }),
  
  getters: {
    needUpdate: (state) => {
      if (!state.lastUpdateTime) return true
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return state.lastUpdateTime < sevenDaysAgo
    }
  }
})
```

## 5. API集成

### 5.1 项目API
```typescript
// api/project.ts
import { http } from '@/utils/http'

export function getProjectList(params) {
  return http.get('/project/list', { params })
}

export function getProjectDetail(id) {
  return http.get(`/project/${id}`)
}

export function updateProject(data) {
  return http.put('/project/update', data)
}
```

### 5.2 审批API
```typescript
// api/approval.ts
import { http } from '@/utils/http'

export function updateApproval(data) {
  return http.post('/approval/update', data)
}

export function uploadApprovalFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  return http.post('/approval/upload', formData)
}
```

## 6. 部署配置

### 6.1 环境配置
```
# .env.development
VITE_API_URL=http://localhost:8080/jeecg-boot
VITE_UPLOAD_URL=/upload

# .env.production
VITE_API_URL=/jeecg-boot
VITE_UPLOAD_URL=/upload
```

### 6.2 构建配置
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/jeecg-boot': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```
