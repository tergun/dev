import request from '@/utils/request'

// Project list API
export function getProjectList() {
  return request({
    url: '/supervision/project/list',
    method: 'get'
  })
}

// Project detail API
export function getProjectDetail(id) {
  return request({
    url: `/supervision/project/${id}`,
    method: 'get'
  })
}

// Update project progress
export function updateProjectProgress(id, data) {
  return request({
    url: `/supervision/project/${id}/progress`,
    method: 'put',
    data
  })
}

// Update project basic info
export function updateProjectInfo(id, data) {
  return request({
    url: `/supervision/project/${id}`,
    method: 'put',
    data
  })
}

// Create new project
export function createProject(data) {
  return request({
    url: '/supervision/project',
    method: 'post',
    data
  })
}
