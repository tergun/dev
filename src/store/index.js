import Vue from 'vue'
import Vuex from 'vuex'
import proposal from './modules/proposal'
import project from './modules/project'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    proposal,
    project,
    user
  }
})
