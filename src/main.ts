import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';
import { createPinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import './style.css';
import 'element-plus/dist/index.css';

import Tabor from 'vue3-tabor';
// 必须引入样式文件

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'vue3-tabor/dist/assets/index.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
   Prism
});
//权限注册
import '@/access/index';
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component);
}
app.use(pinia);
app.use(VueMarkdownEditor);
app.use(router);
app.use(Tabor, {
   router, // 传入router实例
   maxCache: 5 // 可选：最大缓存数量
});

app.mount('#app');
