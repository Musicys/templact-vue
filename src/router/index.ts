/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import loginFrom from '@/view/login/login-from.vue';
import { computed } from 'vue';

// 2. 配置路由
const routes = [
   {
      path: '/:pathMatch(.*)',
      redirect: '/404'
      //匹配所有路径
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
            path: 'home',
            name: 'home',
            component: () => import('@/view/layout-router/home-charts/index.vue'),
            meta: {
               icon: 'Monitor', //图标
               tabConfig: {
                  hideClose: true, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '数据概览',
                  key: 'path'
               }
            }
         },

         {
            path: 'user',
            name: 'user',
            component: () => import('@/components/router.vue'),
            meta: {
               icon: 'User',
               setup: true, //是否是菜单
               tabConfig: {
                  hideClose: false, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '用户管理中心',
                  key: 'path'
               }
            },
            children: [
               {
                  path: '',
                  redirect: 'comment'
               },
               {
                  path: 'comment',
                  name: 'comment',
                  component: () => import('@/view/layout-router/system-user/comment.vue'),
                  meta: {
                     icon: 'ChatDotRound',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '用户评论',
                        key: 'path'
                     }
                  }
               },
               {
                  path: 'arg',
                  name: 'arg',
                  component: () => import('@/view/layout-router/system-user/arg.vue'),
                  meta: {
                     icon: 'Collection',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '用户标签',
                        key: 'path'
                     }
                  }
               }
            ]
         },
         {
            path: 'usertwo',
            name: 'usertwo',
            component: () => import('@/components/router.vue'),
            meta: {
               icon: 'UserFilled',
               setup: true, //是否是菜单
               tabConfig: {
                  hideClose: false, // 隐藏关闭按钮
                  keepAlive: true, // 启用缓存
                  name: '用户管理中心2',
                  key: 'path'
               }
            },
            children: [
               {
                  path: '',
                  redirect: 'commenttwo'
               },
               {
                  path: 'commenttwo',
                  name: 'commenttwo',
                  component: () => import('@/view/layout-router/system-usertwo/comment.vue'),
                  meta: {
                     icon: 'ChatLineRound',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '用户评论02',
                        key: 'path'
                     }
                  }
               },
               {
                  path: 'argtwo',
                  name: 'argtwo',
                  component: () => import('@/view/layout-router/system-usertwo/arg.vue'),
                  meta: {
                     icon: 'CollectionTag',
                     tabConfig: {
                        hideClose: false, // 隐藏关闭按钮
                        keepAlive: true, // 启用缓存
                        name: '用户标签02',
                        key: 'path'
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
