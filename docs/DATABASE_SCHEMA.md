# 数据库设计文档

## 1. 用户和权限相关表

### 1.1 sys_user (用户表)
```sql
CREATE TABLE sys_user (
    id VARCHAR(32) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    real_name VARCHAR(100),
    department_id VARCHAR(32),
    role_id VARCHAR(32),
    status TINYINT DEFAULT 1,
    create_time DATETIME,
    update_time DATETIME,
    last_login_time DATETIME
);
```

### 1.2 sys_role (角色表)
```sql
CREATE TABLE sys_role (
    id VARCHAR(32) PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    role_code VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    create_time DATETIME,
    update_time DATETIME
);
```

### 1.3 sys_permission (权限表)
```sql
CREATE TABLE sys_permission (
    id VARCHAR(32) PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL,
    permission_code VARCHAR(100) NOT NULL,
    menu_type TINYINT, -- 0:一级菜单 1:子菜单 2:按钮权限
    parent_id VARCHAR(32),
    sort_no INT,
    create_time DATETIME,
    update_time DATETIME
);
```

### 1.4 sys_department (部门表)
```sql
CREATE TABLE sys_department (
    id VARCHAR(32) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    parent_id VARCHAR(32),
    dept_code VARCHAR(100),
    status TINYINT DEFAULT 1,
    create_time DATETIME,
    update_time DATETIME
);
```

## 2. 项目相关表

### 2.1 prj_info (项目基本信息表)
```sql
CREATE TABLE prj_info (
    id VARCHAR(32) PRIMARY KEY,
    project_name VARCHAR(200) NOT NULL,
    dispatch_level VARCHAR(50), -- 调度层级
    invest_body VARCHAR(200), -- 投资主体
    construction_nature VARCHAR(100), -- 建设性质
    total_investment DECIMAL(20,2), -- 总投资
    plan_investment_2025 DECIMAL(20,2), -- 2025年计划完成投资
    plan_start_time DATE, -- 计划开复工时间
    plan_end_time DATE, -- 计划完工时间
    supervisor_leader VARCHAR(100), -- 分管领导
    responsible_dept VARCHAR(32), -- 责任单位
    lead_dept VARCHAR(32), -- 牵头部门
    create_time DATETIME,
    update_time DATETIME,
    status TINYINT DEFAULT 1
);
```

### 2.2 prj_approval (项目审批环节表)
```sql
CREATE TABLE prj_approval (
    id VARCHAR(32) PRIMARY KEY,
    project_id VARCHAR(32) NOT NULL,
    approval_name VARCHAR(200) NOT NULL, -- 审批环节名称
    approval_status TINYINT, -- 0:否 1:是 2:无需办理
    process_deadline DATE, -- 办理期限
    process_level VARCHAR(50), -- 办理层级
    file_preparation TEXT, -- 组卷情况
    approval_details TEXT, -- 审批情况
    create_time DATETIME,
    update_time DATETIME
);
```

### 2.3 prj_document (项目文档表)
```sql
CREATE TABLE prj_document (
    id VARCHAR(32) PRIMARY KEY,
    project_id VARCHAR(32) NOT NULL,
    approval_id VARCHAR(32),
    doc_type TINYINT, -- 1:审批文件 2:说明材料 3:证明材料
    doc_name VARCHAR(200),
    doc_path VARCHAR(500),
    upload_user VARCHAR(32),
    create_time DATETIME,
    update_time DATETIME
);
```

### 2.4 prj_progress (项目进展表)
```sql
CREATE TABLE prj_progress (
    id VARCHAR(32) PRIMARY KEY,
    project_id VARCHAR(32) NOT NULL,
    progress_desc TEXT, -- 进展情况描述
    progress_percentage INT, -- 形象进度百分比
    reporter VARCHAR(32), -- 填报人
    create_time DATETIME,
    update_time DATETIME
);
```

### 2.5 prj_activity_log (活跃度日志表)
```sql
CREATE TABLE prj_activity_log (
    id VARCHAR(32) PRIMARY KEY,
    project_id VARCHAR(32) NOT NULL,
    user_id VARCHAR(32),
    module_type TINYINT, -- 1:基础信息 2:前期手续 3:进展情况 4:形象进度
    operation_type VARCHAR(50),
    operation_desc TEXT,
    create_time DATETIME
);
```

## 3. 索引设计

```sql
-- 用户表索引
CREATE INDEX idx_user_username ON sys_user(username);
CREATE INDEX idx_user_department ON sys_user(department_id);

-- 项目表索引
CREATE INDEX idx_project_name ON prj_info(project_name);
CREATE INDEX idx_responsible_dept ON prj_info(responsible_dept);
CREATE INDEX idx_lead_dept ON prj_info(lead_dept);

-- 审批环节表索引
CREATE INDEX idx_approval_project ON prj_approval(project_id);
CREATE INDEX idx_approval_status ON prj_approval(approval_status);

-- 项目文档表索引
CREATE INDEX idx_document_project ON prj_document(project_id);
CREATE INDEX idx_document_approval ON prj_document(approval_id);

-- 项目进展表索引
CREATE INDEX idx_progress_project ON prj_progress(project_id);

-- 活跃度日志表索引
CREATE INDEX idx_activity_project ON prj_activity_log(project_id);
CREATE INDEX idx_activity_user ON prj_activity_log(user_id);
CREATE INDEX idx_activity_time ON prj_activity_log(create_time);
```

## 4. 注意事项

1. 所有表使用UTF8MB4字符集，支持完整的Unicode字符
2. 所有表主键使用UUID格式
3. 时间字段统一使用DATETIME类型
4. 所有表包含create_time和update_time字段用于审计
5. 关键字段添加了合适的索引以提升查询性能
