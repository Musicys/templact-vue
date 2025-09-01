import router from '@/router/index';

// 拦截器
router.beforeEach((to, from, next) => {
   next();
});

// 后置设置标题
router.afterEach(to => {
   document.title = to.meta.tabConfig.name || '登录管理系统';
});
