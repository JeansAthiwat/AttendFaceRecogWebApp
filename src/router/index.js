import Vue from 'vue'
import VueRouter from 'vue-router'
import loginPage from '../views/loginPage.vue'
import faceReg from '../views/faceReg.vue'
import addUser from '../views/addUser.vue'
import statsPage from '../views/statsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginPage',
    component: loginPage
  },
  {
    path: '/faceReg',
    name: 'faceReg',
    component: faceReg
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: addUser
  },
  {
    path: '/statsPage',
    name: 'statsPage',
    component: statsPage
  }
]

const router = new VueRouter({
  routes
})

export default router
