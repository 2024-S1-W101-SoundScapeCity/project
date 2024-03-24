import { createApp } from 'vue'
import App from './App.vue'
import '@/firebase'
import router from '@/routes/index'

const app = createApp(App)
app.use(router)
app.mount('#app')
