import { Rote } from '@/access/config';

export default {
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
         access: Rote.user
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
};
