export const isH5 = process.env.VUE_APP_PLATFORM === 'h5'
export const isApp = process.env.VUE_APP_PLATFORM === 'app-plus'
export const isWeixin = process.env.VUE_APP_PLATFORM === 'mp-weixin'

// Check if current platform is desktop
export const isDesktop = () => {
  return isH5 && !/mobile|android|iphone|ipad|phone/i.test(window.navigator.userAgent)
}

// Check if current platform is mobile
export const isMobile = () => {
  return !isDesktop()
}
