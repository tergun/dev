import { USER_ROLES } from '@/utils/auth'

import { USER_ROLES } from '@/utils/auth'

const FILE_ACCESS_MAP = {
  [USER_ROLES.GOV_OFFICE]: ['renda', 'zhengxie', 'project', 'response', 'approval', 'meeting'],
  [USER_ROLES.PEOPLE_OFFICE]: ['renda', 'meeting'],
  [USER_ROLES.CONSULT_OFFICE]: ['zhengxie', 'meeting'],
  [USER_ROLES.DEPARTMENT]: ['response', 'approval']
}

export const checkFileAccess = (userRole, fileType, departmentId = null) => {
  // 政府办有所有权限
  if (userRole === USER_ROLES.GOV_OFFICE) {
    return true
  }

  // 检查角色是否有权限访问该类型文件
  const allowedTypes = FILE_ACCESS_MAP[userRole] || []
  if (!allowedTypes.includes(fileType)) {
    return false
  }

  // 部门需要额外检查文件是否属于自己
  if (userRole === USER_ROLES.DEPARTMENT && departmentId) {
    return true // 具体部门权限检查在业务逻辑中实现
  }

  return true
}

export const getAccessibleFileTypes = (userRole) => {
  return FILE_ACCESS_MAP[userRole] || []
}
