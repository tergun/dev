import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './stores'

// Import platform styles
import './styles/platform.scss'

const app = createApp(App)

// Add platform class to body
import { getPlatformClass } from './utils/platform'
document.body.classList.add(getPlatformClass())

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
