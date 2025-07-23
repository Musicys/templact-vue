import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';
import { createPinia } from 'pinia';

import './style.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component);
}
app.use(pinia);
app.use(router);

app.mount('#app');
