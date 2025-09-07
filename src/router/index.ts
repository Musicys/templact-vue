import { createRouter, createWebHistory } from 'vue-router';
import loginFrom from '@/view/login/login-from.vue';

import Layout from '@/layout/index.vue';
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
                  name: '数据概览'
               }
            }
         },

         {
            path: 'admin',
            name: 'admin',
            component: () => import('@/components/router.vue'),
            meta: {
               icon: 'Management',
               setup: true, //是否是菜单
               tabConfig: {
                  hideClose: false, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '管理员管理中心',
                  access: 'Admin'
               }
            },
            children: [
               {
                  path: 'list',
                  name: 'list',
                  component: () => import('@/view/layout-router/admin-list/index.vue'),
                  meta: {
                     icon: 'Collection',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '管理员列表'
                     }
                  }
               }
            ]
         },
         {
            path: 'client',
            name: 'client',
            component: () => import('@/components/router.vue'),
            meta: {
               icon: 'User',
               setup: true, //是否是菜单
               tabConfig: {
                  hideClose: false, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '用户管理中心',
                  access: 'Admin'
               }
            },
            children: [
               {
                  path: 'user-list',
                  name: 'user-list',
                  component: () => import('@/view/layout-router/client-list/index.vue'),
                  meta: {
                     icon: 'Collection',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '用户列表'
                     }
                  }
               }
            ]
         },
         {
            path: 'dynamic',
            name: 'dynamic',
            component: () => import('@/components/router.vue'),
            meta: {
               icon: 'User',
               setup: true, //是否是菜单
               tabConfig: {
                  hideClose: false, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '动态管理中心',
                  access: 'Admin'
               }
            },
            children: [
               {
                  path: 'dynamic-list',
                  name: 'dynamic-list',
                  component: () => import('@/view/layout-router/dynamic-list/index.vue'),
                  meta: {
                     icon: 'Collection',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '动态列表'
                     }
                  }
               }
            ]
         }
      ]
   }
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
   history: createWebHistory(),
   routes
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router;
