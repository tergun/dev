/// <reference path="../../../../typings/index.d.ts" />

interface UpdateHistory {
  date: string;
  content: string;
  visualPercentage: number;
}

type Query = {
  id?: string;
}

type PageDataType = {
  projectId: string;
  content: string;
  visualPercentage: number;
  lastUpdateDate: string;
  updateHistory: UpdateHistory[];
  loading: boolean;
}

type PageInstanceType = WechatMiniprogram.Page.Instance<
  PageDataType,
  WechatMiniprogram.IAnyObject
>

Page({
  data: {
    projectId: '',
    content: '',
    visualPercentage: 0,
    lastUpdateDate: '',
    updateHistory: [] as UpdateHistory[],
    loading: true
  },

  onLoad(options?: Query) {
    const id = options?.id;
    if (id) {
      this.setData({
        projectId: id,
        lastUpdateDate: new Date().toLocaleDateString()
      });
      this.loadUpdateHistory();
    }
  },

  loadUpdateHistory() {
    // 模拟加载更新历史数据
    const mockHistory: UpdateHistory[] = [
      {
        date: '2025-02-18',
        content: '完成项目前期调研工作，正在进行环评报告编制。',
        visualPercentage: 35
      },
      {
        date: '2025-02-11',
        content: '项目立项获批，开始组建项目团队。',
        visualPercentage: 20
      }
    ];

    this.setData({
      updateHistory: mockHistory,
      loading: false
    });
  },

  onContentInput(e: any) {
    this.setData({
      content: e.detail.value
    });
  },

  onPercentageChange(e: any) {
    this.setData({
      visualPercentage: e.detail.value as number
    });
  },

  submitUpdate() {
    const { content, visualPercentage } = this.data;
    if (!content) {
      wx.showToast({
        title: '请输入项目进展',
        icon: 'none'
      });
      return;
    }

    // 创建新的更新记录
    const newUpdate: UpdateHistory = {
      date: new Date().toLocaleDateString(),
      content,
      visualPercentage
    };

    // TODO: 实现更新提交逻辑
    this.setData({
      updateHistory: [newUpdate, ...this.data.updateHistory]
    });
    
    wx.showToast({
      title: '更新成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
