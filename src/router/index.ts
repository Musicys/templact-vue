/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import loginFrom from '@/view/login/login-from.vue';
import { computed } from 'vue';

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
      component: () => import('@/view/layout-router/home-charts/index.vue')
   },
   {
      path: '/pages',
      name: 'pages',
      component: () => import('@/layout/index.vue'),
      children: [
         {
            path: '',
            redirect: 'home'
         },
         {
            path: '/home',
            name: '主页',
            component: () => import('@/view/layout-router/home-charts/index.vue'),
            meta: {
               icon: 'Goods',
               KeepAlive: true
            }
         },

         {
            path: '/question-arrats',
            name: '题目列表',
            component: () => import('@/view/layout-router/question-arrats/index.vue'),
            meta: {
               icon: 'Flag',
               KeepAlive: true
            }
         },
         {
            path: '/question-sumbit',
            name: '题目提交列表',
            component: () => import('@/view/layout-router/question-sumbit/index.vue'),
            meta: {
               icon: 'Ship',
               KeepAlive: true
            }
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
