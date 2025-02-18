# API接口设计文档

## 1. 认证相关接口

### 1.1 用户登录
```
POST /api/auth/login
请求体：
{
    "username": "string",
    "password": "string"
}
响应：
{
    "code": 200,
    "data": {
        "token": "string",
        "userInfo": {
            "id": "string",
            "username": "string",
            "realName": "string",
            "departmentId": "string",
            "roleId": "string"
        }
    }
}
```

### 1.2 获取用户信息
```
GET /api/auth/user/info
响应：
{
    "code": 200,
    "data": {
        "userInfo": {
            "id": "string",
            "username": "string",
            "realName": "string",
            "departmentId": "string",
            "roleId": "string",
            "permissions": ["string"]
        }
    }
}
```

## 2. 项目管理接口

### 2.1 项目列表
```
GET /api/projects
查询参数：
- page: 页码
- pageSize: 每页数量
- keyword: 搜索关键词
- status: 项目状态
响应：
{
    "code": 200,
    "data": {
        "total": "number",
        "records": [{
            "id": "string",
            "projectName": "string",
            "dispatchLevel": "string",
            "investBody": "string",
            "totalInvestment": "number",
            "planInvestment2025": "number",
            "supervisorLeader": "string",
            "responsibleDept": "string",
            "status": "number"
        }]
    }
}
```

### 2.2 项目详情
```
GET /api/projects/{id}
响应：
{
    "code": 200,
    "data": {
        "basicInfo": {
            "id": "string",
            "projectName": "string",
            // ... 其他基本信息字段
        },
        "approvals": [{
            "id": "string",
            "approvalName": "string",
            "status": "number",
            // ... 其他审批信息
        }],
        "progress": {
            "description": "string",
            "percentage": "number",
            "updateTime": "string"
        }
    }
}
```

### 2.3 更新项目基本信息
```
PUT /api/projects/{id}/basic
请求体：
{
    "projectName": "string",
    "dispatchLevel": "string",
    // ... 其他基本信息字段
}
```

## 3. 审批管理接口

### 3.1 更新审批状态
```
PUT /api/approvals/{id}
请求体：
{
    "status": "number",
    "processDeadline": "string",
    "processLevel": "string",
    "filePreparation": "string",
    "approvalDetails": "string"
}
```

### 3.2 上传审批文件
```
POST /api/documents/upload
请求体：
FormData:
- file: 文件
- projectId: "string"
- approvalId: "string"
- docType: "number"
```

## 4. 进展管理接口

### 4.1 更新项目进展
```
POST /api/progress
请求体：
{
    "projectId": "string",
    "description": "string",
    "percentage": "number"
}
```

### 4.2 获取项目进展历史
```
GET /api/progress/{projectId}/history
响应：
{
    "code": 200,
    "data": [{
        "description": "string",
        "percentage": "number",
        "reporter": "string",
        "createTime": "string"
    }]
}
```

## 5. 活跃度监测接口

### 5.1 获取活跃度统计
```
GET /api/activity/stats
查询参数：
- projectId: 项目ID
- startDate: 开始日期
- endDate: 结束日期
响应：
{
    "code": 200,
    "data": {
        "basicInfoUpdates": "number",
        "approvalUpdates": "number",
        "progressUpdates": "number",
        "lastUpdateTime": "string"
    }
}
```

## 6. 系统管理接口

### 6.1 部门权限管理
```
POST /api/admin/departments/{deptId}/permissions
请求体：
{
    "permissions": ["string"],
    "validUntil": "string"
}
```

### 6.2 用户管理
```
POST /api/admin/users
请求体：
{
    "username": "string",
    "password": "string",
    "realName": "string",
    "departmentId": "string",
    "roleId": "string"
}
```

## 7. 通用响应格式
```json
{
    "code": 200,       // 状态码
    "message": "",     // 提示信息
    "data": null,      // 数据载荷
    "timestamp": "",   // 时间戳
    "success": true    // 是否成功
}
```

## 8. 错误码说明
- 200: 成功
- 400: 请求参数错误
- 401: 未授权
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误
