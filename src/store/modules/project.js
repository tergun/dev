const state = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null
}

const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_CURRENT_PROJECT(state, project) {
    state.currentProject = project
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_PROJECT(state, { id, updates }) {
    const index = state.projects.findIndex(p => p.id === id)
    if (index !== -1) {
      state.projects[index] = { ...state.projects[index], ...updates }
    }
  }
}

const actions = {
  async fetchProjects({ commit }) {
    commit('SET_LOADING', true)
    try {
      // TODO: Replace with actual API call
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: '城市轨道交通建设工程',
              department: '市建设局',
              leader: '张三',
              progress: 75,
              isUpdated: true,
              approvalFiles: [],
              progressFiles: []
            }
          ])
        }, 1000)
      })
      commit('SET_PROJECTS', response)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async uploadApprovalFiles({ commit }, { files, projectId }) {
    commit('SET_LOADING', true)
    try {
      const result = await fileApi.uploadFiles(files, 'approval')
      commit('UPDATE_PROJECT', {
        id: projectId,
        updates: { approvalFiles: result }
      })
      return result
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async uploadProgressFiles({ commit }, { files, projectId }) {
    commit('SET_LOADING', true)
    try {
      const result = await fileApi.uploadFiles(files, 'progress')
      commit('UPDATE_PROJECT', {
        id: projectId,
        updates: { progressFiles: result }
      })
      return result
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async updateProjectProgress({ commit, dispatch }, { id, progress, files }) {
    commit('SET_LOADING', true)
    try {
      if (files?.length) {
        await dispatch('uploadProgressFiles', {
          files,
          projectId: id
        })
      }
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      commit('UPDATE_PROJECT', { 
        id, 
        updates: { 
          progress,
          isUpdated: true,
          lastUpdateTime: new Date().toISOString()
        } 
      })
      commit('SET_ERROR', null)
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  projectsNeedingUpdate: state => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return state.projects.filter(p => !p.isUpdated)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
