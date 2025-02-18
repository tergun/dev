// 模拟API调用，实际项目中替换为真实接口
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  async getProposals(type) {
    await delay(500)
    return {
      code: 0,
      data: [
        {
          id: 1,
          title: '关于改善城市交通拥堵的建议',
          type: 'renda',
          status: '处理中',
          department: '市交通局',
          assignDate: '2024-02-18',
          deadline: '2024-04-18',
          progress: 60,
          files: []
        }
      ]
    }
  },

  async getProposalDetail(id) {
    await delay(500)
    return {
      code: 0,
      data: {
        id,
        title: '关于改善城市交通拥堵的建议',
        type: 'renda',
        status: '处理中',
        department: '市交通局',
        assignDate: '2024-02-18',
        deadline: '2024-04-18',
        progress: 60,
        files: [],
        timeline: [
          {
            title: '文件上传',
            date: '2024-02-18',
            status: 'completed'
          }
        ]
      }
    }
  },

  async updateProposalStatus(id, status, comment) {
    await delay(500)
    return {
      code: 0,
      message: '更新成功'
    }
  },

  async confirmResponsibility(id, isResponsible, reason) {
    await delay(500)
    return {
      code: 0,
      message: '确认成功'
    }
  }
}
