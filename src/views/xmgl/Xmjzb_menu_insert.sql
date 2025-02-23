-- 注意：该页面对应的前台目录为views/cs文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025022305069810040', NULL, '重点项目管理表', '/cs/xmjzbList', 'cs/XmjzbList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810041', '2025022305069810040', '添加重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810042', '2025022305069810040', '编辑重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810043', '2025022305069810040', '删除重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810044', '2025022305069810040', '批量删除重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810045', '2025022305069810040', '导出excel_重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025022305069810046', '2025022305069810040', '导入excel_重点项目管理表', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:xmjzb:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-02-23 17:06:04', NULL, NULL, 0, 0, '1', 0);