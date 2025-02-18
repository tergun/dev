import request from '@/utils/request'
import { isDesktop } from '@/utils/platform'

// File upload API
export function uploadFile(file) {
  if (!isDesktop()) {
    return Promise.reject(new Error('文件上传仅支持电脑端操作'))
  }
  
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/supervision/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// File download API
export function downloadFile(fileId) {
  if (!isDesktop()) {
    return Promise.reject(new Error('文件下载仅支持电脑端操作'))
  }
  
  return request({
    url: `/supervision/file/download/${fileId}`,
    method: 'get',
    responseType: 'blob'
  })
}

// Get file URL for preview
export function getFileUrl(fileId) {
  return `/supervision/file/download/${fileId}`
}
