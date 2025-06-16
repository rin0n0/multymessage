import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const App = createApp(App);
const pinia = createPinia();
App.use(pinia);
App.mount('#app')
