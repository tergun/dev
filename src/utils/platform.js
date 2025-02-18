// Platform detection utilities
export const isDesktop = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return userAgent.includes('windows') || userAgent.includes('macintosh')
}

export const isMobile = () => {
  return !isDesktop()
}

// Feature access control
export const canModify = () => {
  return isDesktop()
}

export const canUpload = () => {
  return isDesktop()
}

export const canDownload = () => {
  return isDesktop()
}

// Platform-specific styles
export const getPlatformClass = () => {
  return isDesktop() ? 'desktop-platform' : 'mobile-platform'
}
