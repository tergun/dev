import StorageService from '@/services/storage'
import { FILE_TYPES, MAX_FILE_SIZE } from '@/utils/constants'
import { checkFileAccess } from '@/middleware/fileAccess'
import store from '@/store'

const storage = new StorageService()

const validateFileType = (file) => {
  const ext = file.name.split('.').pop().toLowerCase()
  return Object.values(FILE_TYPES).some(types => types.includes(ext))
}

const validateAccess = (type, departmentId = null) => {
  const userRole = store.state.user.role
  if (!checkFileAccess(userRole, type, departmentId)) {
    throw new Error('无权访问该文件')
  }
}

export default {
  async uploadFiles(files, type, departmentId = null) {
    validateAccess(type, departmentId)

    const results = []
    for (const file of files) {
      if (!validateFileType(file)) {
        throw new Error('不支持的文件格式')
      }
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('文件大小超过限制')
      }
      const path = `${type}/${Date.now()}-${file.name}`
      const result = await storage.uploadFile(file, path)
      results.push(result)
    }
    return results
  },

  async downloadFile(path, type, departmentId = null) {
    validateAccess(type, departmentId)
    return await storage.downloadFile(path)
  },

  async getPreviewUrl(path, type, departmentId = null) {
    validateAccess(type, departmentId)
    return await storage.getPreviewUrl(path)
  }
}
