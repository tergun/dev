import OSS from 'ali-oss'

export default class StorageService {
  constructor() {
    const config = {
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET
    }

    // Validate required configuration
    const missingVars = Object.entries(config)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    this.client = new OSS(config)
  }

  async uploadFile(file, path) {
    return await this.client.put(path, file)
  }

  async uploadFiles(files, type) {
    const results = []
    for (const file of files) {
      const path = `${type}/${Date.now()}-${file.name}`
      const result = await this.uploadFile(file, path)
      results.push(result)
    }
    return results
  }

  async downloadFile(path) {
    return await this.client.get(path)
  }

  async getPreviewUrl(path) {
    // Generate a URL that expires in 1 hour for preview
    return await this.client.signatureUrl(path, { expires: 3600 })
  }
}
