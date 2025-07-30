# 后台开发模板

## 技术栈
**Vue 3 + Ts + Vite**

```bash
# 初始化
pnpm create vite@latest
pnpm add vue-router@4
pnpm i vue-router-tab -S
pnpm install pinia
pnpm install sass sass-loader --save-dev
pnpm install element-plus
pnpm install -D unplugin-vue-components unplugin-auto-import
PNPM install axios
```





## 项目启动
```bash
# 安装依赖
npm install

# 启动项目
npm run dev

# 打包项目
npm run build
```

## 项目使用核心库
```bash
# axios 
# vue-router
# pinia
# element-plus
# vue-router-tab
# echarts
# sass
# element-plus [https://element-plus.org/zh-CN/component/overview.html]
# unplugin-auto-import 自动引入
```




## 目录结构
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── config
│   ├── icons
│   ├── layout
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   ├── views
│   ├── App.vue
│   ├── main.js
├── .env.development
├── .env.production
├── .eslintrc.js
├── .gitignore
├── babel.config.js
├── package.json
├── README.md





