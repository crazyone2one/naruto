import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store/index'
import i18n from '@/i18n/index'

const app = createApp(App)

app.use(ElementPlus).use(pinia).use(i18n)
app.mount('#app')
