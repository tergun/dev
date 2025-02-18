import Vue from 'vue'
import App from './App'
import store from './store'
import permissionMixin from './mixins/permissionMixin'
import fileMixin from './mixins/fileMixin'

Vue.config.productionTip = false

// 全局混入
Vue.mixin(permissionMixin)
Vue.mixin(fileMixin)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
