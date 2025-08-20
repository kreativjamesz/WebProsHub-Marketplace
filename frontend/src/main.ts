import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Vue3Toastify } from 'vue3-toastify'

import App from './App.vue'
import router from './router'

// Import toast styles
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
  theme: 'colored',
  closeOnClick: true,
  pauseOnHover: true,
})

app.mount('#app')
