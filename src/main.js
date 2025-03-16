import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import { router } from './router'
import { i18n } from './plugins/i18n'
import { pinia } from './plugins/pinia'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
