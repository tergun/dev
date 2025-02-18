export enum ProjectStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  NOT_REQUIRED = 'NOT_REQUIRED'
}

export interface ProjectBasicInfo {
  id: string;
  name: string;
  supervisor: string;
  responsibleUnit: string;
  startDate: string;
  endDate: string;
  description: string;
  status: ProjectStatus;
  lastUpdated: string;
}

export interface ApprovalStage {
  id: string;
  name: string;
  status: ApprovalStatus;
  deadline?: string;
  level?: string;
  caseDetails?: string;
  approvalDetails?: string;
  approvalFile?: string;
  noProcessingReason?: string;
  lastUpdated: string;
}

export interface ProjectProgress {
  id: string;
  projectId: string;
  content: string;
  date: string;
  visualPercentage: number;
  lastUpdated: string;
  needsUpdate: boolean;
  departmentUpdated: boolean;
}
