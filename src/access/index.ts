import { getAdminInfo } from '@/api/user';
import router from '@/router/index';

// 拦截器
router.beforeEach(async (to, from, next) => {
   if (to.path == '/login') {
      return next();
   }

   try {
      const res = await getAdminInfo();
      if (res.code == 0) {
         return next();
      } else {
         return next({ path: '/login' });
      }
   } catch {
      return next({ path: '/login' });
   }
});

// 后置设置标题
router.afterEach(to => {
   document.title = to.meta.tabConfig.name || '登录管理系统';
});
