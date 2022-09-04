import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Add from '../screens/Add.vue'
import Edit from '../screens/Edit.vue'
import Home from '../screens/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory(),
})