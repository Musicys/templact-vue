import { Rote } from '@/access/config';

export default {
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
         access: Rote.user
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
};
