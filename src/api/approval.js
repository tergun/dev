import request from '@/utils/request'

// Get approval list
export function getApprovals(projectId) {
  return request({
    url: `/supervision/project/${projectId}/approvals`,
    method: 'get'
  })
}

// Update approval status
export function updateApprovalStatus(projectId, approvalId, data) {
  return request({
    url: `/supervision/project/${projectId}/approval/${approvalId}/status`,
    method: 'put',
    data
  })
}

// Update approval details
export function updateApprovalDetails(projectId, approvalId, data) {
  return request({
    url: `/supervision/project/${projectId}/approval/${approvalId}/details`,
    method: 'put',
    data
  })
}

// Upload approval document
export function uploadApprovalDocument(projectId, approvalId, file) {
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: `/supervision/project/${projectId}/approval/${approvalId}/document`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
