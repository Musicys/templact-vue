import { Rote } from './../access/config';
import { createRouter, createWebHistory } from 'vue-router';
import loginFrom from '@/view/login/login-from.vue';
import Layout from '@/layout/index.vue';
import admin from './module/admin';
import clinet from './module/clinet';
import dynamic from './module/dynamic';
import system from './module/system';
const pagesconfig = [
   admin, //管理员
   clinet, //用户
   dynamic, //动态
   system //系统
];

// 2. 配置路由
const routes = [
   {
      path: '/',
      redirect: '/login'
   },
   {
      path: '/login',
      name: 'loginFrom',
      component: loginFrom
   },

   {
      path: '/404',
      name: '404',
      component: () => import('@/view/notfound/PageNoView.vue')
   },
   {
      path: '/401',
      name: '401',
      component: () => import('@/view/notfound/PageNoRole.vue')
   },
   {
      path: '/pages',
      name: 'pages',
      component: Layout,
      children: [
         {
            path: '',
            redirect: 'home'
         },
         {
            path: 'home',
            name: 'home',
            component: () => import('@/view/layout-router/home-charts/index.vue'),
            meta: {
               icon: 'Monitor', //图标
               tabConfig: {
                  hideClose: true, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '数据概览',
                  access: Rote.user
               }
            }
         },
         ...pagesconfig
      ]
   }
];

console.log('表', routes);

// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
   history: createWebHistory(),
   routes
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router;
