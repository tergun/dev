const state = {
  role: '', // 'govOffice', 'peopleOffice', 'consultOffice', 'department'
  department: null,
  permissions: []
}

const mutations = {
  SET_USER_ROLE(state, role) {
    state.role = role
  },
  SET_DEPARTMENT(state, department) {
    state.department = department
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  }
}

const actions = {
  setUserRole({ commit }, role) {
    commit('SET_USER_ROLE', role)
  },
  setDepartment({ commit }, department) {
    commit('SET_DEPARTMENT', department)
  },
  setPermissions({ commit }, permissions) {
    commit('SET_PERMISSIONS', permissions)
  }
}

const getters = {
  canEdit: state => state.role === 'govOffice',
  canReview: state => ['peopleOffice', 'consultOffice'].includes(state.role),
  isDepartment: state => state.role === 'department'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
