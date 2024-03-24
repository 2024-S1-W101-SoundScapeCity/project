// This file is used to link the urls to vue components
import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '@/firebase'

// import vue components
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/LogIn.vue'
import RegisterAcc from '@/components/RegisterAcc.vue'
import DashBoard from '@/components/DashBoard.vue'
import HelloWorld from '@/components/HelloWorld.vue'

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
      { path: '', redirect: '/dashboard/helloworld' }, // default, redirect to first tab
      { path: '/dashboard/helloworld', component: HelloWorld },
      { path: '/dashboard/menu item2', component: HelloWorld }, // relink paths to other components
      { path: '/dashboard/menu item3', component: HelloWorld },
      { path: '/dashboard/menu item4', component: HelloWorld },
      { path: '/dashboard/menu item5', component: HelloWorld },
      { path: '/dashboard/menu item6', component: HelloWorld },
    ],
  },
  { path: '/helloworld', component: HelloWorld },
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
