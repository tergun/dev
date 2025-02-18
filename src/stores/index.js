import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    projects: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setProjects(state, projects) {
      state.projects = projects
    }
  },
  actions: {
    login({ commit }, credentials) {
      // TODO: Implement login
      commit('setUser', { username: credentials.username })
    },
    fetchProjects({ commit }) {
      // TODO: Implement project fetching
      commit('setProjects', [])
    }
  }
})
