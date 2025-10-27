
import { createApp } from 'vue'
import './assets/tailwind.css'
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
const initialized = authStore.initializeAuth()
console.log("Main.js - Auth store initialized:", initialized)

app.mount('#app')
