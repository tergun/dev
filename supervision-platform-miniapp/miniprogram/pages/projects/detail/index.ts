/// <reference path="../../../../typings/index.d.ts" />

// No type imports needed
import { ProjectStatus as PS, ApprovalStatus as AS } from '../../../miniprogram_npm/constants/project';

Page({
  data: {
    project: {} as any,
    stages: [] as any[],
    statusText: '',
    loading: true
  },

  onLoad(options: any) {
    const { id } = options;
    this.loadProjectDetails(id);
  },

  loadProjectDetails(id: string) {
    // 模拟加载项目详情数据
    const mockProject = {
      id,
      name: '城市道路改造工程',
      status: PS.IN_PROGRESS,
      supervisor: '张三',
      responsibleUnit: '市政工程局',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      visualPercentage: 45,
      needsUpdate: true,
      lastUpdated: '2025-02-18'
    };

    const mockStages = [
      {
        id: '1',
        name: '环境影响评估',
        status: AS.IN_PROGRESS,
        deadline: '2025-03-31',
        level: '市级',
        lastUpdated: '2025-02-15'
      },
      {
        id: '2',
        name: '土地使用审批',
        status: AS.PENDING,
        lastUpdated: '2025-02-18'
      }
    ];

    this.setData({
      project: mockProject,
      stages: mockStages.map(stage => ({
        ...stage,
        statusText: this.getStatusText(stage.status)
      })),
      statusText: this.getStatusText(mockProject.status),
      loading: false
    });
  },

  getStatusText(status: string) {
    const projectStatusMap: Record<string, string> = {
      [PS.NOT_STARTED]: '未开始',
      [PS.IN_PROGRESS]: '进行中',
      [PS.COMPLETED]: '已完成',
      [PS.SUSPENDED]: '已暂停'
    };
    const approvalStatusMap: Record<string, string> = {
      [AS.PENDING]: '待办理',
      [AS.IN_PROGRESS]: '办理中',
      [AS.APPROVED]: '已批准',
      [AS.REJECTED]: '已拒绝',
      [AS.NOT_REQUIRED]: '无需办理'
    };
    return projectStatusMap[status] || approvalStatusMap[status] || '';
  }
});
