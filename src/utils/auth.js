import { isDesktop } from './platform'

// Platform-specific permission checks
export const checkPlatformPermissions = () => {
  // Desktop has full permissions
  if (isDesktop()) {
    return {
      canView: true,
      canEdit: true,
      canUpload: true,
      canDownload: true
    }
  }
  
  // Mobile only has view permission
  return {
    canView: true,
    canEdit: false,
    canUpload: false,
    canDownload: false
  }
}

// Role-based permission checks
export const checkRolePermissions = (userRoles) => {
  const isAdmin = userRoles.includes('supervision_admin')
  const isDevAdmin = userRoles.includes('supervision_dev_admin')
  const isDeptUser = userRoles.includes('supervision_dept')
  
  return {
    canGrantPermissions: isAdmin,
    canManageProjects: isAdmin || isDevAdmin,
    canUpdateProgress: isDeptUser || isAdmin || isDevAdmin
  }
}
