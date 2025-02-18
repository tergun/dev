import fileApi from '../src/api/file'
import { USER_ROLES } from '../src/utils/auth'
import { MAX_FILE_SIZE } from '../src/utils/constants'

describe('File API Tests', () => {
  // Test file size validation
  test('rejects files over 500KB', async () => {
    const largeFile = new File(['x'.repeat(600 * 1024)], 'large.pdf', { type: 'application/pdf' })
    await expect(fileApi.uploadFiles([largeFile], 'proposal')).rejects.toThrow('文件大小超过限制')
  })

  // Test file type validation
  test('rejects unsupported file types', async () => {
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    await expect(fileApi.uploadFiles([invalidFile], 'proposal')).rejects.toThrow('不支持的文件格式')
  })

  // Test role-based access
  test('enforces role-based access control', async () => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    
    // Test government office access (should have full access)
    store.state.user.role = USER_ROLES.GOV_OFFICE
    await expect(fileApi.uploadFiles([file], 'proposal')).resolves.toBeDefined()
    await expect(fileApi.uploadFiles([file], 'meeting')).resolves.toBeDefined()
    
    // Test people's office access (limited access)
    store.state.user.role = USER_ROLES.PEOPLE_OFFICE
    await expect(fileApi.uploadFiles([file], 'renda')).resolves.toBeDefined()
    await expect(fileApi.uploadFiles([file], 'zhengxie')).rejects.toThrow('无权访问该文件')
  })

  // Test batch upload
  test('supports batch upload', async () => {
    const files = [
      new File(['test1'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['test2'], 'test2.pdf', { type: 'application/pdf' })
    ]
    store.state.user.role = USER_ROLES.GOV_OFFICE
    const result = await fileApi.uploadFiles(files, 'proposal')
    expect(result).toHaveLength(2)
  })
})
