# 小程序实现计划

## 1. 技术架构

### 1.1 框架选型
- 基础框架：uni-app
- UI组件：uni-ui
- 状态管理：Vuex
- 请求库：uni-request
- 基于：jeecg-uniapp框架

### 1.2 项目结构
```
src/
├── api/                    # API接口
│   ├── login.js           # 登录相关
│   ├── project.js         # 项目相关
│   └── approval.js        # 审批相关
├── pages/                  # 页面
│   ├── login/             # 登录页面
│   ├── project/           # 项目列表
│   └── detail/            # 项目详情
├── components/            # 公共组件
│   ├── project-card/      # 项目卡片
│   ├── approval-status/   # 审批状态
│   └── progress-input/    # 进度输入
├── store/                 # 状态管理
└── utils/                 # 工具函数
```

## 2. 页面设计

### 2.1 登录页面 (pages/login/index.vue)
```vue
<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/logo.png" />
    </view>
    
    <uni-forms :model="formData">
      <uni-forms-item label="账号">
        <uni-easyinput
          v-model="formData.username"
          placeholder="请输入账号"
        />
      </uni-forms-item>
      
      <uni-forms-item label="密码">
        <uni-easyinput
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
      
      <button @click="handleLogin" type="primary">
        登录
      </button>
    </uni-forms>
  </view>
</template>
```

### 2.2 项目列表页面 (pages/project/index.vue)
```vue
<template>
  <view class="project-list">
    <uni-search-bar
      v-model="searchKey"
      @confirm="handleSearch"
      placeholder="搜索项目"
    />
    
    <view class="project-items">
      <project-card
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="goToDetail(project.id)"
      />
    </view>
  </view>
</template>
```

### 2.3 项目详情页面 (pages/detail/index.vue)
```vue
<template>
  <view class="project-detail">
    <!-- 基本信息展示 -->
    <uni-card title="基本信息">
      <uni-list>
        <uni-list-item title="调度层级" :rightText="project.dispatchLevel" />
        <uni-list-item title="项目名称" :rightText="project.projectName" />
        <uni-list-item title="投资主体" :rightText="project.investBody" />
        <!-- 其他基本信息字段 -->
      </uni-list>
    </uni-card>
    
    <!-- 审批状态展示 -->
    <uni-card title="前期手续办理情况">
      <approval-status
        v-for="approval in approvals"
        :key="approval.id"
        :approval="approval"
      />
    </uni-card>
    
    <!-- 项目进展 -->
    <uni-card title="项目进展">
      <view v-if="hasProgressPermission">
        <uni-easyinput
          type="textarea"
          v-model="progress.description"
          placeholder="请输入项目进展情况"
        />
        
        <uni-data-select
          v-model="progress.percentage"
          :localdata="percentageOptions"
          placeholder="请选择形象进度"
        />
        
        <button @click="saveProgress" type="primary">
          保存进展
        </button>
      </view>
      <view v-else>
        <text>{{progress.description}}</text>
        <text>形象进度：{{progress.percentage}}%</text>
      </view>
    </uni-card>
    
    <!-- 活跃度展示 -->
    <uni-card title="活跃度监测">
      <uni-list>
        <uni-list-item 
          v-for="activity in activities"
          :key="activity.id"
          :title="activity.module"
          :note="activity.updateTime"
          :rightText="activity.needUpdate ? '需要更新' : '已更新'"
        />
      </uni-list>
    </uni-card>
  </view>
</template>
```

## 3. 组件设计

### 3.1 项目卡片组件 (components/project-card/index.vue)
```vue
<template>
  <view class="project-card" @click="$emit('click')">
    <text class="project-name">{{project.projectName}}</text>
    <view class="project-info">
      <text>投资：{{project.totalInvestment}}</text>
      <text>进度：{{project.progress}}%</text>
    </view>
    <view class="update-status" v-if="needUpdate">
      <uni-icons type="notification-filled" color="red" />
    </view>
  </view>
</template>
```

### 3.2 审批状态组件 (components/approval-status/index.vue)
```vue
<template>
  <view class="approval-status">
    <uni-steps :options="approvalSteps" :active="currentStep" />
    <view class="status-details">
      <template v-if="approval.status === 0">
        <text>办理期限：{{approval.deadline}}</text>
        <text>办理层级：{{approval.level}}</text>
        <text>组卷情况：{{approval.fileStatus}}</text>
        <text>审批情况：{{approval.approvalStatus}}</text>
      </template>
      <template v-else-if="approval.status === 1">
        <text>已完成审批</text>
      </template>
      <template v-else>
        <text>无需办理</text>
      </template>
    </view>
  </view>
</template>
```

## 4. 状态管理

### 4.1 项目状态
```javascript
// store/modules/project.js
export default {
  state: {
    projectList: [],
    currentProject: null,
    activities: []
  },
  
  mutations: {
    SET_PROJECT_LIST(state, list) {
      state.projectList = list
    },
    SET_CURRENT_PROJECT(state, project) {
      state.currentProject = project
    }
  },
  
  actions: {
    async fetchProjects({ commit }) {
      const res = await getProjectList()
      commit('SET_PROJECT_LIST', res.data)
    }
  }
}
```

### 4.2 权限状态
```javascript
// store/modules/permission.js
export default {
  state: {
    userRole: '',
    permissions: []
  },
  
  getters: {
    canEditProgress: state => {
      return state.userRole === 'PROJECT_LEAD_DEPT'
    },
    canViewBasicInfo: state => {
      return ['SUPER_ADMIN', 'REFORM_COMMISSION'].includes(state.userRole)
    }
  }
}
```

## 5. API集成

### 5.1 登录接口
```javascript
// api/login.js
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
```

### 5.2 项目接口
```javascript
// api/project.js
export function getProjectList(params) {
  return request({
    url: '/project/list',
    method: 'get',
    params
  })
}

export function getProjectDetail(id) {
  return request({
    url: `/project/${id}`,
    method: 'get'
  })
}
```

## 6. 权限控制

### 6.1 路由权限
```javascript
// permission.js
const whiteList = ['/pages/login/index']

async function checkPermission(to) {
  const token = uni.getStorageSync('token')
  
  if (!token && !whiteList.includes(to)) {
    uni.redirectTo({
      url: '/pages/login/index'
    })
    return false
  }
  
  return true
}
```

### 6.2 功能权限
```javascript
// mixins/permission.js
export default {
  computed: {
    hasProgressPermission() {
      return this.$store.getters.canEditProgress
    },
    hasBasicInfoPermission() {
      return this.$store.getters.canViewBasicInfo
    }
  }
}
```

## 7. 活跃度监测

### 7.1 活跃度检查
```javascript
// utils/activity.js
export function checkNeedUpdate(lastUpdateTime) {
  if (!lastUpdateTime) return true
  
  const now = new Date()
  const lastUpdate = new Date(lastUpdateTime)
  const diffDays = (now - lastUpdate) / (1000 * 60 * 60 * 24)
  
  return diffDays >= 7
}
```

### 7.2 活跃度记录
```javascript
// api/activity.js
export function recordActivity(data) {
  return request({
    url: '/activity/record',
    method: 'post',
    data
  })
}
```

## 8. 配置说明

### 8.1 项目配置
```javascript
// manifest.json
{
  "name": "重点项目督办",
  "appid": "your_appid",
  "description": "重点项目督办情况管理平台",
  "versionName": "1.0.0",
  "versionCode": "100",
  "transformPx": false,
  "app-plus": {
    "usingComponents": true,
    "nvueCompiler": "uni-app",
    "compilerVersion": 3
  },
  "mp-weixin": {
    "appid": "wx_appid",
    "setting": {
      "urlCheck": false
    },
    "usingComponents": true
  }
}
```

### 8.2 页面配置
```javascript
// pages.json
{
  "pages": [
    {
      "path": "pages/login/index",
      "style": {
        "navigationBarTitleText": "登录"
      }
    },
    {
      "path": "pages/project/index",
      "style": {
        "navigationBarTitleText": "项目列表"
      }
    },
    {
      "path": "pages/detail/index",
      "style": {
        "navigationBarTitleText": "项目详情"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "重点项目督办",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  }
}
```
