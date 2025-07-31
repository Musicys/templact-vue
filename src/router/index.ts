/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import loginFrom from '@/view/login/login-from.vue';
import { computed } from 'vue';

// 2. 配置路由
const routes = [
   {
      path: '/:pathMatch(.*)',
      redirect: '/404'
   },
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
      component: () => import('@/view/notfound/404.vue')
   },
   {
      path: '/401',
      name: '401',
      component: () => import('@/view/notfound/401.vue')
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
               icon: 'Goods', //图标
               keep: true, //路由缓存
               exit: true //标签是否要关闭
            }
         },

         {
            path: '/question-arrats',
            name: '题目列表',
            component: () => import('@/view/layout-router/question-arrats/index.vue'),
            meta: {
               icon: 'Flag',
               keep: true
            }
         },
         {
            path: '/question-sumbit',
            name: '题目提交列表',
            component: () => import('@/view/layout-router/question-sumbit/index.vue'),
            meta: {
               icon: 'Ship',
               keep: true
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
