import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import About from '../views/About.vue'
import MyProjects from '../views/MyProjects.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/myprojects',
    name: 'myprojects',
    component: MyProjects
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
