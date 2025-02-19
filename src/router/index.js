import { createRouter, createWebHashHistory } from 'vue-router'
import CreateTask from '../components/CreateTask.vue';
import AssignTask from '../components/AssignTask.vue';
import SetDueDates from '../components/SetDueDates.vue';
import TrackStatus from '../components/TrackStatus.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import DeleteTask from '../components/DeleteTask.vue';
import App from '../App.vue';
import MyTasks from '../components/MyTasks.vue';

const routes = [
  {
    path:'/MyTasks',
    name : 'MyTasks',
    component: MyTasks,
  },
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/App',
    name: 'App',
    component: App
  },
  {
    path: '/CreateTask',
    name: 'CreateTask',
    component: CreateTask
  },
  {
    path: '/AssignTask',
    name: 'AssignTask',
    component: AssignTask
  },
  {
    path: '/SetDueDates',
    name: 'SetDueDates',
    component: SetDueDates
  },
  {
    path: '/TrackStatus',
    name: 'TrackStatus',
    component: TrackStatus
  },
  {
    path: '/DeleteTask',
    name: 'DeleteTask',
    component: DeleteTask
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router