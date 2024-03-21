// This file is used to link the urls to vue components
import { createMemoryHistory, createRouter } from 'vue-router'

import LogIn from '@/components/LogIn.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
  { path: '/login', component: LogIn },
  { path: '/helloworld', component: HelloWorld },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default {
  router,
}
