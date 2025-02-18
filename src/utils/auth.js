// 用户角色常量
export const USER_ROLES = {
  GOV_OFFICE: 'govOffice',
  PEOPLE_OFFICE: 'peopleOffice',
  CONSULT_OFFICE: 'consultOffice',
  DEPARTMENT: 'department'
}

// 权限检查函数
export const checkPermission = (userRole, requiredRole) => {
  if (!userRole) return false
  
  // 政府办拥有所有权限
  if (userRole === USER_ROLES.GOV_OFFICE) return true
  
  // 其他角色只能访问指定权限
  return userRole === requiredRole
}

// 文件类型验证
export const validateFileType = (file) => {
  const allowedTypes = [
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/pdf' // .pdf
  ]
  
  return allowedTypes.includes(file.type)
}

// 检查是否需要更新（7天规则）
export const needsUpdate = (lastUpdateTime) => {
  if (!lastUpdateTime) return true
  
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  return new Date(lastUpdateTime) < sevenDaysAgo
}
