import { Rote } from '@/access/config';

export default {
   path: 'system',
   name: 'system',
   component: () => import('@/components/router.vue'),
   meta: {
      icon: 'Setting',
      setup: true, //是否是菜单
      tabConfig: {
         hideClose: false, // 隐藏关闭按钮
         keepAlive: true, // 启用缓存
         name: '系统管理中心',
         access: Rote.user
      }
   },
   children: [
      {
         path: 'image-tag', // 路由地址
         name: 'image-tag',
         component: () => import('@/view/layout-router/system-list/image-tag/index.vue'),
         meta: {
            icon: 'Collection',
            tabConfig: {
               hideClose: false, // 隐藏关闭按钮
               keepAlive: true, // 启用缓存
               name: '图片标签列表'
            }
         }
      }
   ]
};
