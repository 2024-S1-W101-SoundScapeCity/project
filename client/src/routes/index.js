// This file is used to link the urls to vue components
import { createWebHistory, createRouter } from 'vue-router'

// import vue components
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/LogIn.vue'
import RegisterAcc from '@/components/RegisterAcc.vue'
import DashBoard from '@/components/DashBoard.vue'
import MapPage from '@/components/MapPage.vue'
import UserProfile from '@/components/UserProfile.vue'
import AboutPage from '@/components/AboutPage.vue'


// link route to view component
const routes = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { requiresAuth: false } 
  },
  { 
    path: '/login', 
    component: Login, 
    meta: { requiresAuth: false } },
  {
    path: '/register',
    component: RegisterAcc,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: DashBoard,
    meta: { requiresAuth: false },
    children: [
      { path: '', redirect: '/dashboard/map', meta: { requiresAuth: true }}, // default, redirect to first tab
      { path: '/dashboard/map', component: MapPage, meta: { requiresAuth: true } },
      { path: '/dashboard/profile', component: UserProfile, meta: { requiresAuth: true } },
      { path: '/about', component: AboutPage, meta: { requiresAuth: false } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Global router guards ensure user has the correct authentication to access
// the requested webpage
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userCred')
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
})
// TODO: Redirect after login

export default router
