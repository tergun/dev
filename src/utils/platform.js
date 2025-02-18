// Platform detection utilities
export const isDesktop = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return userAgent.includes('windows') || userAgent.includes('macintosh')
}

export const isMobile = () => {
  return !isDesktop()
}

// Mock window for testing
if (typeof window === 'undefined') {
  global.window = {
    navigator: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  }
}
