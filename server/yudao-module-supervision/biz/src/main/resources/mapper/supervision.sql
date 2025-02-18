-- ----------------------------
-- Table structure for supervision_project
-- ----------------------------
DROP TABLE IF EXISTS `supervision_project`;
CREATE TABLE `supervision_project` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '项目编号',
  `name` varchar(100) NOT NULL COMMENT '项目名称',
  `level` varchar(50) NOT NULL COMMENT '调度层级',
  `investor` varchar(100) NOT NULL COMMENT '投资主体',
  `nature` varchar(50) NOT NULL COMMENT '建设性质',
  `total_investment` decimal(20,2) NOT NULL COMMENT '总投资(万元)',
  `plan_investment_2025` decimal(20,2) NOT NULL COMMENT '2025年计划完成投资(万元)',
  `plan_start_time` datetime NOT NULL COMMENT '计划开复工时间',
  `plan_end_time` datetime NOT NULL COMMENT '计划完工时间',
  `leader_user_id` bigint NOT NULL COMMENT '分管领导编号',
  `dept_id` bigint NOT NULL COMMENT '责任单位编号',
  `progress_percentage` int DEFAULT 0 COMMENT '形象进度百分比',
  `progress_description` text COMMENT '进展情况描述',
  `last_update_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `creator` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `tenant_id` bigint NOT NULL DEFAULT 0 COMMENT '租户编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='项目表';

-- ----------------------------
-- Table structure for supervision_approval
-- ----------------------------
DROP TABLE IF EXISTS `supervision_approval`;
CREATE TABLE `supervision_approval` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '审批编号',
  `project_id` bigint NOT NULL COMMENT '项目编号',
  `name` varchar(100) NOT NULL COMMENT '审批环节名称',
  `status` varchar(20) NOT NULL COMMENT '状态(是/否/无需办理)',
  `deadline` varchar(50) DEFAULT NULL COMMENT '办理期限',
  `level` varchar(20) DEFAULT NULL COMMENT '办理层级(旗级/市级/自治区级/国家级)',
  `document_url` varchar(512) DEFAULT NULL COMMENT '审批文件URL',
  `creator` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  `tenant_id` bigint NOT NULL DEFAULT 0 COMMENT '租户编号',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_project_id` (`project_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='审批环节表';

-- ----------------------------
-- Table structure for system_dict_data (Add supervision enums)
-- ----------------------------
INSERT INTO `system_dict_type` (`name`, `type`, `status`, `remark`) VALUES 
('项目审批状态', 'supervision_approval_status', 0, '项目审批状态'),
('审批办理层级', 'supervision_approval_level', 0, '审批办理层级');

INSERT INTO `system_dict_data` (`sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`) VALUES 
(1, '是', 'YES', 'supervision_approval_status', 0, 'success', '', '已完成审批'),
(2, '否', 'NO', 'supervision_approval_status', 0, 'danger', '', '未完成审批'),
(3, '无需办理', 'UNNECESSARY', 'supervision_approval_status', 0, 'info', '', '无需办理审批');

INSERT INTO `system_dict_data` (`sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`) VALUES 
(1, '旗级', 'BANNER', 'supervision_approval_level', 0, 'primary', '', '旗级审批'),
(2, '市级', 'CITY', 'supervision_approval_level', 0, 'success', '', '市级审批'),
(3, '自治区级', 'REGION', 'supervision_approval_level', 0, 'warning', '', '自治区级审批'),
(4, '国家级', 'NATIONAL', 'supervision_approval_level', 0, 'danger', '', '国家级审批');

-- ----------------------------
-- Add supervision roles
-- ----------------------------
INSERT INTO `system_role` (`name`, `code`, `sort`, `data_scope`, `status`, `type`, `remark`) VALUES
('政府办管理员', 'supervision_admin', 1, 1, 0, 2, '项目督办系统超级管理员'),
('发改委管理员', 'supervision_dev_admin', 2, 2, 0, 2, '项目督办系统管理员'),
('项目牵头部门', 'supervision_dept', 3, 5, 0, 2, '项目牵头部门角色');

-- ----------------------------
-- Add supervision menu permissions
-- ----------------------------
INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`) VALUES
('项目督办管理', 'supervision:project:list', 1, 0, 0, 'supervision', 'build', NULL, 0),
('项目列表', 'supervision:project:list', 2, 1, 1, 'project', 'list', 'supervision/project/index', 0),
('项目查看', 'supervision:project:query', 3, 1, 2, '', '', '', 0),
('项目新增', 'supervision:project:create', 3, 2, 2, '', '', '', 0),
('项目修改', 'supervision:project:update', 3, 3, 2, '', '', '', 0),
('项目删除', 'supervision:project:delete', 3, 4, 2, '', '', '', 0),
('审批管理', 'supervision:approval:list', 2, 2, 1, 'approval', 'audit', 'supervision/approval/index', 0),
('审批查看', 'supervision:approval:query', 3, 1, 7, '', '', '', 0),
('审批新增', 'supervision:approval:create', 3, 2, 7, '', '', '', 0),
('审批修改', 'supervision:approval:update', 3, 3, 7, '', '', '', 0),
('审批删除', 'supervision:approval:delete', 3, 4, 7, '', '', '', 0);
