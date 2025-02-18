# 后端实现计划

## 1. 系统架构设计

### 1.1 模块划分
基于JeecgBoot框架的模块结构：
```
jeecg-boot-parent
├── jeecg-boot-base-core          // 核心模块
├── jeecg-module-system           // 系统管理模块
└── jeecg-module-project          // 新增：项目管理模块
    ├── project-biz               // 业务逻辑实现
    ├── project-api               // 对外API接口
    └── project-start             // 启动模块
```

### 1.2 技术选型
- 框架：JeecgBoot 3.7.3
- 数据库：MySQL 5.7+
- 缓存：Redis
- 权限：Shiro + JWT
- 文档存储：MinIO

## 2. 数据模型设计

### 2.1 核心实体
```java
// 项目信息
@Data
@TableName("prj_info")
public class ProjectInfo extends BaseEntity {
    @TableId(type = IdType.ASSIGN_ID)
    private String id;
    private String projectName;        // 项目名称
    private String dispatchLevel;      // 调度层级
    private String investBody;         // 投资主体
    private String constructionNature; // 建设性质
    private BigDecimal totalInvestment;// 总投资
    private BigDecimal planInvestment2025; // 2025年计划完成投资
    private Date planStartTime;        // 计划开复工时间
    private Date planEndTime;          // 计划完工时间
    private String supervisorLeader;   // 分管领导
    private String responsibleDept;    // 责任单位
    private String leadDept;           // 牵头部门
}

// 审批环节
@Data
@TableName("prj_approval")
public class ProjectApproval extends BaseEntity {
    @TableId(type = IdType.ASSIGN_ID)
    private String id;
    private String projectId;
    private String approvalName;
    private Integer approvalStatus;    // 0:否 1:是 2:无需办理
    private Date processDeadline;
    private String processLevel;       // 办理层级
    private String filePreparation;    // 组卷情况
    private String approvalDetails;    // 审批情况
}

// 项目进展
@Data
@TableName("prj_progress")
public class ProjectProgress extends BaseEntity {
    @TableId(type = IdType.ASSIGN_ID)
    private String id;
    private String projectId;
    private String progressDesc;       // 进展描述
    private Integer progressPercentage;// 形象进度百分比
    private String reporterId;         // 填报人
}
```

## 3. API接口设计

### 3.1 认证接口
```java
@RestController
@RequestMapping("/sys/login")
public class LoginController {
    
    @PostMapping("/login")
    public Result<LoginVO> login(@RequestBody LoginDTO loginDTO);
    
    @GetMapping("/getUserInfo")
    public Result<LoginUser> getUserInfo();
}
```

### 3.2 项目管理接口
```java
@RestController
@RequestMapping("/project")
public class ProjectController {
    
    @GetMapping("/list")
    @RequiresPermissions("project:view")
    public Result<IPage<ProjectVO>> getProjectList(ProjectQueryDTO queryDTO);
    
    @GetMapping("/{id}")
    @RequiresPermissions("project:view")
    public Result<ProjectDetailVO> getProjectDetail(@PathVariable String id);
    
    @PostMapping("/save")
    @RequiresPermissions("project:add")
    public Result<String> saveProject(@RequestBody ProjectDTO projectDTO);
    
    @PutMapping("/update")
    @RequiresPermissions("project:edit")
    public Result<String> updateProject(@RequestBody ProjectDTO projectDTO);
}
```

### 3.3 审批管理接口
```java
@RestController
@RequestMapping("/approval")
public class ApprovalController {
    
    @PostMapping("/update")
    @RequiresPermissions("approval:edit")
    public Result<String> updateApproval(@RequestBody ApprovalDTO approvalDTO);
    
    @PostMapping("/upload")
    @RequiresPermissions("approval:edit")
    public Result<String> uploadApprovalFile(MultipartFile file);
}
```

### 3.4 进展管理接口
```java
@RestController
@RequestMapping("/progress")
public class ProgressController {
    
    @PostMapping("/update")
    @RequiresPermissions("progress:edit")
    public Result<String> updateProgress(@RequestBody ProgressDTO progressDTO);
    
    @GetMapping("/history/{projectId}")
    @RequiresPermissions("progress:view")
    public Result<List<ProgressVO>> getProgressHistory(@PathVariable String projectId);
}
```

## 4. 权限设计实现

### 4.1 权限编码定义
```java
public interface PermissionConstants {
    // 超级管理员权限
    String SUPER_ADMIN = "super_admin";
    
    // 项目管理权限
    String PROJECT_VIEW = "project:view";
    String PROJECT_ADD = "project:add";
    String PROJECT_EDIT = "project:edit";
    
    // 审批管理权限
    String APPROVAL_VIEW = "approval:view";
    String APPROVAL_EDIT = "approval:edit";
    
    // 进展管理权限
    String PROGRESS_VIEW = "progress:view";
    String PROGRESS_EDIT = "progress:edit";
}
```

### 4.2 部门年度权限管理
```java
@Service
public class DepartmentPermissionService {
    
    @Autowired
    private RedisTemplate redisTemplate;
    
    // 设置部门年度权限
    public void setDepartmentYearPermission(String deptId, Integer year, 
                                          List<String> permissions);
    
    // 检查部门权限是否有效
    public boolean checkDepartmentPermission(String deptId, String permission);
    
    // 清理过期权限
    @Scheduled(cron = "0 0 0 1 1 ?")
    public void cleanExpiredPermissions();
}
```

## 5. 活跃度监测实现

### 5.1 活跃度记录
```java
@Service
public class ActivityMonitorService {
    
    // 记录操作活跃度
    public void recordActivity(String projectId, String userId, 
                             ActivityType type, String operation);
    
    // 获取7天内活跃度
    public List<ActivityVO> getRecentActivity(String projectId);
    
    // 检查模块是否需要更新
    public boolean checkNeedUpdate(String projectId, ActivityType type);
}
```

## 6. 定时任务

### 6.1 权限检查任务
```java
@Component
public class PermissionCheckJob {
    
    @Scheduled(cron = "0 0 1 * * ?")
    public void checkDepartmentPermissions() {
        // 检查部门权限有效期
        // 发送提醒通知
    }
}
```

### 6.2 活跃度检查任务
```java
@Component
public class ActivityCheckJob {
    
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkActivityStatus() {
        // 检查7天内未更新的项目
        // 发送提醒通知
    }
}
```

## 7. 安全配置

### 7.1 Shiro配置
```java
@Configuration
public class ShiroConfig {
    
    @Bean
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
        // 配置登录、权限等安全规则
    }
    
    @Bean
    public SecurityManager securityManager() {
        // 配置安全管理器
    }
}
```

## 8. 部署说明

### 8.1 环境要求
- JDK 1.8+
- MySQL 5.7+
- Redis 5.0+
- Maven 3.6+

### 8.2 配置文件
```yaml
# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/project_supervision
    username: root
    password: root
    
  redis:
    host: localhost
    port: 6379
    
jeecg:
  # JWT配置
  jwt:
    secret: your-secret-key
    expire: 7200
    
  # 文件上传配置
  upload:
    path: /data/upload
    
  # 权限配置
  permission:
    skip-auth-urls:
      - /sys/login
      - /sys/logout
```
