<template>
  <div class="file-upload">
    <template v-if="isDesktop">
      <el-upload
        :action="uploadUrl"
        :headers="headers"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
      >
        <el-button type="primary">上传文件</el-button>
      </el-upload>
    </template>
    <template v-else>
      <div class="mobile-notice">
        文件上传仅支持电脑端操作
      </div>
    </template>
  </div>
</template>

<script>
import { isDesktop } from '@/utils/platform'
import { uploadFile } from '@/api/file'

export default {
  name: 'FileUpload',
  data() {
    return {
      isDesktop: isDesktop(),
      uploadUrl: '/supervision/file/upload',
      headers: {
        // Add any required headers
      }
    }
  },
  methods: {
    beforeUpload(file) {
      if (!this.isDesktop) {
        this.$message.error('文件上传仅支持电脑端操作')
        return false
      }
      return true
    },
    handleSuccess(response) {
      this.$emit('upload-success', response)
    },
    handleError(error) {
      this.$message.error('文件上传失败：' + error.message)
    }
  }
}
</script>

<style scoped>
.file-upload {
  margin: 20px 0;
}
.mobile-notice {
  color: #909399;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background: #f4f4f5;
  border-radius: 4px;
}
</style>
