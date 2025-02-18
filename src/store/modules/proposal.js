const state = {
  proposals: [],
  currentProposal: null,
  loading: false,
  error: null
}

const mutations = {
  SET_PROPOSALS(state, proposals) {
    state.proposals = proposals
  },
  SET_CURRENT_PROPOSAL(state, proposal) {
    state.currentProposal = proposal
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_PROPOSAL(state, { id, updates }) {
    const index = state.proposals.findIndex(p => p.id === id)
    if (index !== -1) {
      state.proposals[index] = { ...state.proposals[index], ...updates }
    }
  }
}

const actions = {
  async fetchProposals({ commit }) {
    commit('SET_LOADING', true)
    try {
      // TODO: Replace with actual API call
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: '关于改善城市交通拥堵的建议',
              type: 'renda',
              status: '处理中',
              department: '市交通局',
              assignDate: '2024-02-18',
              progress: 60,
              files: []
            }
          ])
        }, 1000)
      })
      commit('SET_PROPOSALS', response)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async uploadProposalFiles({ commit }, { files, proposalId }) {
    commit('SET_LOADING', true)
    try {
      const result = await fileApi.uploadFiles(files, 'proposal')
      commit('UPDATE_PROPOSAL', { 
        id: proposalId, 
        updates: { files: result }
      })
      return result
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async uploadMeetingPhotos({ commit }, { files, proposalId }) {
    commit('SET_LOADING', true)
    try {
      const proposal = state.proposals.find(p => p.id === proposalId)
      const assignDate = new Date(proposal.assignDate)
      const now = new Date()
      const daysDiff = Math.floor((now - assignDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff > PHOTO_UPLOAD_DEADLINE_DAYS) {
        throw new Error('已超过会见照片上传期限')
      }

      const result = await fileApi.uploadFiles(files, 'meeting')
      commit('UPDATE_PROPOSAL', {
        id: proposalId,
        updates: { meetingPhotos: result }
      })
      return result
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async uploadResponseFile({ commit }, { file, proposalId }) {
    commit('SET_LOADING', true)
    try {
      const proposal = state.proposals.find(p => p.id === proposalId)
      const assignDate = new Date(proposal.assignDate)
      const now = new Date()
      const daysDiff = Math.floor((now - assignDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff > RESPONSE_DEADLINE_DAYS) {
        throw new Error('已超过答复文件提交期限')
      }

      const result = await fileApi.uploadFiles([file], 'response')
      commit('UPDATE_PROPOSAL', {
        id: proposalId,
        updates: { responseFile: result[0] }
      })
      return result[0]
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async submitProposal({ commit, dispatch }, { proposal, files }) {
    commit('SET_LOADING', true)
    try {
      // Upload files first
      if (files?.length) {
        await dispatch('uploadProposalFiles', { 
          files, 
          proposalId: proposal.id 
        })
      }
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
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
  proposalsByType: state => type => {
    return state.proposals.filter(p => p.type === type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
