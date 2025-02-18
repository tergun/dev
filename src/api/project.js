// 模拟API调用，实际项目中替换为真实接口
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  async getProjects() {
    await delay(500)
    return {
      code: 0,
      data: [
        {
          id: 1,
          title: '城市轨道交通建设工程',
          department: '市建设局',
          leader: '张三',
          investment: '50亿元',
          progress: 75,
          isUpdated: true,
          lastUpdateTime: '2024-02-18',
          approvals: [
            {
              title: '立项批复',
              status: 'completed',
              deadline: '2024-03-01',
              level: '市级'
            }
          ]
        }
      ]
    }
  },

  async getProjectDetail(id) {
    await delay(500)
    return {
      code: 0,
      data: {
        id,
        title: '城市轨道交通建设工程',
        department: '市建设局',
        leader: '张三',
        investment: '50亿元',
        progress: 75,
        isUpdated: true,
        lastUpdateTime: '2024-02-18',
        approvals: [
          {
            title: '立项批复',
            status: 'completed',
            deadline: '2024-03-01',
            level: '市级'
          }
        ]
      }
    }
  },

  async updateProjectProgress(id, progress, description) {
    await delay(500)
    return {
      code: 0,
      message: '更新成功'
    }
  },

  async updateApprovalStatus(id, approvalId, status, details) {
    await delay(500)
    return {
      code: 0,
      message: '更新成功'
    }
  }
}
