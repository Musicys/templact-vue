import { Rote } from '@/access/config';

export default {
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
         access: Rote.admin
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
};
