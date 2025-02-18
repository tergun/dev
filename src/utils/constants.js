export const PROPOSAL_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  REVIEWING: 'reviewing',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
}

export const PROJECT_STATUS = {
  NOT_STARTED: 'notStarted',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed'
}

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed'
}

export const FILE_TYPES = {
  WORD: ['doc', 'docx'],
  EXCEL: ['xls', 'xlsx'],
  PDF: ['pdf']
}

export const MAX_FILE_SIZE = 500 * 1024 // 500KB

export const RESPONSE_DEADLINE_DAYS = 60 // 2个月办结
export const PHOTO_UPLOAD_DEADLINE_DAYS = 10 // 10个工作日内上传照片
