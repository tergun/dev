/// <reference path="../../../typings/index.d.ts" />

interface IPageData {
  searchKey: string;
  projectList: Array<{
    id: number;
    name: string;
    investor: string;
    image: string;
  }>;
  loading: boolean;
}

Page<IPageData>({
  data: {
    searchKey: '',
    projectList: [
      {
        id: 1,
        name: '智慧城市建设项目',
        investor: '城市发展投资有限公司',
        image: '/static/projects/smart-city.png'
      },
      {
        id: 2,
        name: '绿色能源产业园',
        investor: '新能源科技集团',
        image: '/static/projects/green-energy.png'
      },
      {
        id: 3,
        name: '智能制造产业基地',
        investor: '工业发展有限公司',
        image: '/static/projects/smart-manufacturing.png'
      },
      {
        id: 4,
        name: '文化创意产业园',
        investor: '文化传媒投资集团',
        image: '/static/projects/cultural-creative.png'
      }
    ],
    loading: false
  },

  onLoad() {
    this.fetchProjects()
  },

  fetchProjects() {
    const that = this
    that.setData({ loading: true })
    
    // 模拟API调用
    setTimeout(() => {
      that.setData({ loading: false })
    }, 500)
  },

  handleProjectClick(e) {
    const project = e.currentTarget.dataset.project
    wx.navigateTo({
      url: `/pages/project/detail/index?id=${project.id}`,
      fail: () => {
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }
})
