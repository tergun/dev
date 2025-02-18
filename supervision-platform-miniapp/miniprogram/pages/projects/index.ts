/// <reference path="../../../typings/index.d.ts" />

// No type imports needed
import { ProjectStatus as PS } from '../../miniprogram_npm/constants/project';

Page({
  data: {
    projects: [] as any[],
    statusOptions: ['全部', '未开始', '进行中', '已完成', '已暂停'],
    currentStatus: '',
    loading: true
  },

  onLoad() {
    this.loadProjects();
  },

  loadProjects() {
    // 模拟加载项目数据
    const mockProjects = [
      {
        id: '1',
        name: '城市道路改造工程',
        status: PS.IN_PROGRESS,
        supervisor: '张三',
        responsibleUnit: '市政工程局',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        visualPercentage: 45,
        needsUpdate: true
      },
      {
        id: '2',
        name: '公共文化中心建设',
        status: PS.NOT_STARTED,
        supervisor: '李四',
        responsibleUnit: '文化旅游局',
        startDate: '2025-03-01',
        endDate: '2026-06-30',
        visualPercentage: 0,
        needsUpdate: false
      }
    ];

    this.setData({
      projects: mockProjects,
      loading: false
    });
  },

  onStatusChange(e: any) {
    const index = e.detail.value;
    const status = this.data.statusOptions[index];
    this.setData({ currentStatus: status });
    // TODO: 根据状态筛选项目
  },

  onProjectTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/projects/detail/index?id=${id}`
    });
  }
});
