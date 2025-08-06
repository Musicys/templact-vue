# 后台开发模板


# 前言

[![vue](https://camo.githubusercontent.com/6435b9888d7e92600d417622bc3af815fce39ec28728c4bdf4cf0fbaac8866f1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7675652d322e362e31302d627269676874677265656e2e737667) ](https://github.com/vuejs/vue)[![element-ui](https://camo.githubusercontent.com/2722584aad9de275172be6b0cd325a6fb285c69cf67568e837d6c7e5ff797351/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f656c656d656e742d2d75692d322e382e322d627269676874677265656e2e737667) ](https://github.com/ElemeFE/element)[![license](https://camo.githubusercontent.com/e581ac49b7e1e99fb951242be63f6fdc6ebbc20c89a97fca0de99e1f2e6ae87e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6d6173686170652f6170697374617475732e737667) ](https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE)[![GitHub release](https://camo.githubusercontent.com/a5502db1ab80a0667293a7037a12b9f0b83628fd187c5ee8dd8af1a5773a319d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f72656c656173652f6c696e2d78696e2f7675652d6d616e6167652d73797374656d2e737667) ](https://github.com/lin-xin/vue-manage-system/releases)[![donate](https://camo.githubusercontent.com/7e907724960bea31c9d0831fb62aa30ea87a6da75bc599f0d700c31987e964e2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2532342d646f6e6174652d6666363962342e737667)](https://lin-xin.gitee.io/example/work/#/donate)

基于 Vue + Element UI 的后台管理系统解决方案(适用于酷炫后台，作品，博客等)。[线上地址]()



```bash
# 小白流程
	1.下载eslint和prettierrc插件
	2.修改配置文件
	3.修改路由
	4.拦截完善
	5.对接口，完善业务
```

静态托管服务：[[Pages | 面向前端开发人员的全栈平台 | Cloudflare (cloudflare-cn.com)](https://www.cloudflare-cn.com/developer-platform/products/pages/)]


## 功能
- [x] Element Plus
- [x]  vite 3
- [x]  pinia
- [x]  typescript
- [x]  登录 
- [x]  表格/表单
   图表 📊
- [ ]  富文本/markdown 编辑器
- [x]  权限管理
- [x]  三级菜单
- [x]  自定义图标
- [x] 路由缓存
- [x] Eslint
- [x] prettierrc

## 项目启动
```bash
npm install
```

```bash
npm run dev
```

## 项目本地部署测试

```
npm run build
```

```
npm run build
http-server ./dist
```



## 效果图如下

**登录页**

<img src="./y_UIVIEW/LOGIN.png"/>



**后台页**

<img src="./y_UIVIEW/HOME.png"/>


## 帮助文档

| 步骤 | 命令                                                         | 描述                                                         | 链接                                                   |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------ |
| 1    | `pnpm create vite@latest [项目名] -- --template vue-ts`      | 创建一个新的Vite项目，使用Vue 3和TypeScript模板。            | -                                                      |
| 2    | `pnpm add vue-router@4`                                      | 添加Vue Router 4用于路由管理。                               | [Vue Router](https://router.vuejs.org/zh/index.html)   |
| 3    | `pnpm i vue-router-tab -S`                                   | 安装vue-router-tab插件，用于标签式导航。                     | [vue3-tabor](https://github.com/daylenjeez/vue3-tabor) |
| 4    | `pnpm install pinia`                                         | 安装Pinia，作为Vue的状态管理库。                             | [Pinia](https://pinia.vuejs.org/)                      |
| 5    | `pnpm install sass sass-loader --save-dev`                   | 安装Sass及其loader，用于样式处理。                           | -                                                      |
| 6    | `pnpm install element-plus`                                  | 安装Element Plus，提供一组Vue 3的UI组件。                    | [Element Plus](https://element-plus.org/zh-CN/)        |
| 7    | `pnpm install -D unplugin-vue-components unplugin-auto-import` | 安装unplugin-vue-components和unplugin-auto-import，自动导入组件和函数。 | -                                                      |
| 8    | `pnpm install axios`                                         | 安装Axios，用于发出HTTP请求。                                | [Axios](https://github.com/axios/axios)                |
| 9    | `pnpm install echarts --save`                                | 安装ECharts，用于数据可视化。                                | [ECharts](https://echarts.apache.org/zh/index.html)    |





### 提交类型

| 提交类型   | 标题               | 描述                                                         |
| ---------- | ------------------ | ------------------------------------------------------------ |
| `feat`     | 特征               | 新功能、新特性                                               |
| `fix`      | Bug 修复           | bug 修复                                                     |
| `docs`     | 文档               | 仅文档更改                                                   |
| `style`    | 风格               | 不影响代码含义的更改（空格、格式、缺少分号等）               |
| `refactor` | 代码重构           | 重构，在不影响代码内部行为，功能下的代码修改                 |
| `perf`     | 性能改进           | 更改代码，以提高性能                                         |
| `test`     | 测试               | 添加缺失的测试或纠正现有的测试                               |
| `build`    | 构建               | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm） |
| `ci`       | 持续集成           | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改       | 不修改 src 或测试文件的其他更改                              |
| `revert`   | 还原               | 恢复之前的提交                                               |
| `release`  | 发布新版本         | -                                                            |
| `workflow` | 工作流相关文件修改 | -                                                            |
