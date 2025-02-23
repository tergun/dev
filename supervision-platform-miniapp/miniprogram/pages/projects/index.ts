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
    this.setData({ loading: true });
    wx.request({
      url: 'http://df7vqc.natappfree.cc/jeecg-boot/xmgl/xmjzb/list/',
      method: 'GET',
      data: {
        pageNo: 1,
        pageSize: 10
      },
      success: (res: any) => {
        if (res.data && res.data.result && res.data.result.records) {
          const projects = res.data.result.records.map((item: any) => ({
            id: item.id,
            name: item.xmmc || '未命名项目', // 项目名称
            status: this.getProjectStatus(item.xmjd || 0),
            supervisor: item.tzzt || '未知投资主体', // 使用投资主体作为supervisor
            responsibleUnit: item.tzzt || '未知投资主体', // 投资主体
            startDate: item.startTime || '未设置',
            endDate: item.endTime || '未设置',
            visualPercentage: parseInt(item.xmjd || '0'), // 项目进度
            needsUpdate: false
          }));
          this.setData({
            projects,
            loading: false
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取项目列表失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    });
  },

  getProjectStatus(progress: number): string {
    if (progress === 0) return PS.NOT_STARTED;
    if (progress === 100) return PS.COMPLETED;
    return PS.IN_PROGRESS;
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
