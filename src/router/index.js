import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import ProjectList from '../pages/project-list/index.vue'
import ProjectDetail from '../pages/project-detail/index.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/projects', component: ProjectList },
  { path: '/projects/:id', component: ProjectDetail }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
