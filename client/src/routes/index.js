// This file is used to link the urls to vue components
import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '@/firebase'

// import vue components
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/LogIn.vue'
import RegisterAcc from '@/components/RegisterAcc.vue'
import DashBoard from '@/components/DashBoard.vue'
import MapPage from '@/components/MapPage.vue'
import UserProfile from '@/components/UserProfile.vue'

// link route to view component
const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: false } },
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  {
    path: '/register',
    component: RegisterAcc,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard/map' }, // default, redirect to first tab
      { path: 'map', component: MapPage },
      { path: '/dashboard/menuitem2', component: MapPage }, // relink paths to other components
      { path: '/dashboard/menuitem3', component: MapPage },
      { path: '/dashboard/menuitem4', component: MapPage },
      { path: '/dashboard/menuitem5', component: MapPage },
      { path: '/dashboard/profile', component: UserProfile },
    ],
  },
  { path: '/map', component: MapPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Global router guards ensure user has the correct authentication to access
// the requested webpage
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)
  const isAuthenticated = auth.currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
// TODO: Redirect after login

export default router
