import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './stores'

// Import platform styles and connection setup
import './styles/platform.scss'
import { setupConcurrentConnections } from './utils/connection'

const app = createApp(App)

// Add platform class to body
import { getPlatformClass } from './utils/platform'
document.body.classList.add(getPlatformClass())

// Setup concurrent connections
const connectionConfig = setupConcurrentConnections()
app.config.globalProperties.$connectionConfig = connectionConfig

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
