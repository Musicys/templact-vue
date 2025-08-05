import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';
import { createPinia } from 'pinia';

import './style.css';
import 'element-plus/dist/index.css';

import Tabor from 'vue3-tabor';
// 必须引入样式文件

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'vue3-tabor/dist/assets/index.css';
const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component);
}
app.use(pinia);

app.use(router);
app.use(Tabor, {
   router, // 传入router实例
   maxCache: 10 // 可选：最大缓存数量
});

app.mount('#app');
