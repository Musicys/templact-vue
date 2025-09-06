<template>
   <el-header class="header-container">
      <!-- H5端横向菜单 -->
      <div class="mobile-menu" v-if="isMobile">
         <el-menu
            :default-active="route.path"
            mode="horizontal"
            class="mobile-menu-container"
            :router="true"
            active-text-color="#FFFFFF"
            background-color="#7A7BD6"
            text-color="rgba(255, 255, 255, 0.8)"
            :unique-opened="true">
            <template v-for="(item, index) in MENU" :key="index">
               <el-menu-item
                  v-if="!item.meta.setup"
                  :index="'/pages/' + item.path"
                  :route="'/pages/' + item.path"
                  class="mobile-menu-item">
                  <el-icon class="mobile-menu-icon">
                     <component :is="item.meta.icon" />
                  </el-icon>
                  <span>{{ item.meta.tabConfig.name }}</span>
               </el-menu-item>

               <el-sub-menu :index="item.path" v-else class="mobile-sub-menu">
                  <template #title>
                     <el-icon class="mobile-menu-icon">
                        <component :is="item.meta.icon" />
                     </el-icon>
                     <span>{{ item.meta.tabConfig.name }}</span>
                  </template>

                  <template v-for="(son, index) in item.children" :key="index">
                     <el-menu-item
                        v-if="son.meta"
                        :index="`/pages/${item.path}/${son.path}`"
                        class="mobile-sub-menu-item">
                        <el-icon class="mobile-menu-icon">
                           <component :is="son.meta.icon" />
                        </el-icon>
                        <span>{{ son.meta.tabConfig.name }}</span>
                     </el-menu-item>
                  </template>
               </el-sub-menu>
            </template>
         </el-menu>
      </div>
      <!-- 左侧 logo 和菜单区域 -->
      <div class="left-section" v-else>
         <div class="logo-container">
            <el-icon class="menu-icon" @click="system.updateisCollapse">
               <Menu />
            </el-icon>
            <div class="logo-content">
               <img :src="logo" alt="Logo" class="logo-img" />
               <span class="system-name">{{ systemTitle }}</span>
            </div>
         </div>
      </div>

      <!-- 中间欢迎提示 -->
      <div class="welcome-section">
         <div class="welcome-text">
            <span class="greeting">欢迎回来，</span>
            <span class="user-name">{{ userInfo.name }}</span>
            <span class="time-greeting">{{ timeGreeting }}</span>
         </div>
      </div>

      <!-- 右侧用户信息区域 -->
      <div class="user-info-container">
         <!-- 邮箱通知按钮 -->
         <el-button circle size="large" class="notification-btn" @click="showNotifications">
            <el-icon>
               <Message />
            </el-icon>
            <div class="notification-badge" v-if="unreadCount > 0">
               {{ unreadCount > 99 ? '99+' : unreadCount }}
            </div>
         </el-button>

         <!-- 全屏按钮 -->
         <el-button circle size="large" class="fullscreen-btn" @click="toggleFullscreen" v-show="!isMobile">
            <el-icon>
               <FullScreen v-if="!isFullscreen" />
               <Aim v-else />
            </el-icon>
         </el-button>

         <!-- 用户下拉菜单 -->
         <el-dropdown @command="handleCommand" trigger="click">
            <div class="user-dropdown">
               <el-avatar :size="40" :src="userInfo.avatarurl" class="user-avatar" />
               <div class="user-details" v-show="!isMobile">
                  <span class="user-name">{{ userInfo.username }}</span>
                  <span class="user-email">{{ userInfo.email }}</span>
               </div>
               <el-icon class="dropdown-icon" v-show="!isMobile">
                  <ArrowDown />
               </el-icon>
            </div>
            <template #dropdown>
               <el-dropdown-menu class="user-dropdown-menu">
                  <el-dropdown-item command="profile">
                     <el-icon><User /></el-icon>
                     <span>个人资料</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                     <el-icon><Setting /></el-icon>
                     <span>系统设置</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                     <el-icon><SwitchButton /></el-icon>
                     <span>退出登录</span>
                  </el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
      </div>
   </el-header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { systemStore } from '@/store/modules/system';
import logo from '@/assets/logo.webp';
import { AdminOff } from '@/api/user';
import { Admin } from '@/api/user/model/type';
import { adminStore } from '@/store/modules/admin';
const router = useRouter();
const route = useRoute();
const system = systemStore();
const store = adminStore();
// 系统标题
const systemTitle = ref(import.meta.env.VITE_APP_TITLE || 'LOGIN 管理系统');

// 全屏状态
const isFullscreen = ref(false);

// 未读消息数量
const unreadCount = ref(0);

// 移动端检测
const isMobile = ref(false);

// 用户信息
const userInfo: Ref<Admin> = ref({});

// 定义菜单项类型
interface MenuItem {
   path: string;
   meta: {
      icon?: string;
      setup?: boolean;
      tabConfig: {
         name: string;
      };
   };
   children?: MenuItem[];
}

const MENU = ref<MenuItem[]>([]);

// 时间问候语
const timeGreeting = computed(() => {
   const hour = new Date().getHours();
   if (hour < 6) return '夜深了，注意休息';
   if (hour < 12) return '早上好，祝您工作愉快';
   if (hour < 18) return '下午好，继续加油';
   return '晚上好，辛苦了';
});

// 检测移动端
const checkMobile = () => {
   isMobile.value = window.innerWidth <= 768;
};

// 显示通知
const showNotifications = () => {
   ElMessage.info('通知功能开发中...');
};

// 切换全屏
const toggleFullscreen = () => {
   if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullscreen.value = true;
   } else {
      document.exitFullscreen();
      isFullscreen.value = false;
   }
};

// 处理下拉菜单命令
const handleCommand = async (command: string) => {
   switch (command) {
      case 'profile':
         ElMessage('个人资料功能开发中...');
         break;
      case 'settings':
         ElMessage('系统设置功能开发中...');
         break;
      case 'logout':
         try {
            await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            });

            try {
               let res = await AdminOff();
               if (res.code == 0) {
                  localStorage.removeItem('userInfo');
                  ElMessage.success(res.data);
                  // 跳转到登录页
                  router.push('/login');
               }
            } catch {
               localStorage.removeItem('userInfo');
               router.push('/login');
            }
            // 清除用户信息
         } catch {
            // 用户取消
         }
         break;
   }
};

// 初始化菜单数据
const initMenuData = () => {
   let ROTER: any = null;
   router.options.routes.forEach(item => {
      if (item.path === '/pages') {
         ROTER = item;
      }
   });

   MENU.value = ROTER?.children?.filter((item: any) => item.meta && Object.keys(item.meta).length > 0) || [];
};

// 监听全屏状态变化
onMounted(() => {
   userInfo.value = { ...store.userinfo };
   checkMobile();
   initMenuData();

   document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement;
   });

   window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
   window.removeEventListener('resize', checkMobile);
});
</script>

<style lang="scss" scoped>
.header-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(20px);
   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
   padding: 0 20px;
   height: 70px;
   position: relative;
   z-index: 1000;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
      z-index: -1;
   }
}

.left-section {
   display: flex;
   align-items: center;
}

.logo-container {
   display: flex;
   align-items: center;
   gap: 15px;
}

.menu-icon {
   font-size: 24px;
   color: white;
   cursor: pointer;
   padding: 8px;
   border-radius: 8px;
   transition: all 0.3s ease;
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(10px);

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
   }
}

.logo-content {
   display: flex;
   align-items: center;
   gap: 12px;
}

.logo-img {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   border: 2px solid rgba(255, 255, 255, 0.3);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.system-name {
   font-size: 20px;
   font-weight: 700;
   color: white;
   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   background: linear-gradient(45deg, #fff, #f0f0f0);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
}

// H5端横向菜单样式
.mobile-menu {
   flex: 1;
   display: flex;
   justify-content: start;
   align-items: center;
   margin: 0 20px;
}

.mobile-menu-container {
   background: transparent !important;
   border: none !important;
   display: flex;
   align-items: center;
   gap: 5px;
   .el-menu-item {
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 20px;
      margin: 0 5px;
      padding: 8px 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.8) !important;

      &:hover {
         background: rgba(255, 255, 255, 0.2) !important;
         transform: translateY(-2px);
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
         color: white !important;
      }

      &.is-active {
         background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%) !important;
         color: white !important;
         border: 1px solid rgba(255, 255, 255, 0.4);
         box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
         transform: translateY(-2px);
      }
   }

   .el-sub-menu {
      .el-sub-menu__title {
         background: rgba(255, 255, 255, 0.1) !important;
         border-radius: 20px;
         margin: 0 5px;
         padding: 8px 16px;
         border: 1px solid rgba(255, 255, 255, 0.2);
         backdrop-filter: blur(10px);
         transition: all 0.3s ease;
         color: rgba(255, 255, 255, 0.8) !important;

         &:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            color: white !important;
         }
      }

      &.is-active .el-sub-menu__title {
         background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%) !important;
         color: white !important;
         border: 1px solid rgba(255, 255, 255, 0.4);
         box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
         transform: translateY(-2px);
      }
   }

   .mobile-menu-icon {
      font-size: 16px;
      margin-right: 6px;
   }

   .el-sub-menu__icon-arrow {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
   }

   .el-menu--popup {
      background: rgba(255, 255, 255, 0.95) !important;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

      .el-menu-item {
         background: transparent !important;
         border: none !important;
         border-radius: 8px;
         margin: 2px 8px;
         color: #333 !important;

         &:hover {
            background: rgba(102, 126, 234, 0.1) !important;
            color: #667eea !important;
         }

         &.is-active {
            background: rgba(102, 126, 234, 0.2) !important;
            color: #667eea !important;
         }
      }
   }
}

.welcome-section {
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;
}

.welcome-text {
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 12px 24px;
   background: rgba(255, 255, 255, 0.1);
   border-radius: 20px;
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

   .greeting {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
   }

   .user-name {
      color: white;
      font-weight: 600;
      font-size: 16px;
   }

   .time-greeting {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-style: italic;
   }
}

.user-info-container {
   display: flex;
   align-items: center;
   gap: 15px;
}

.notification-btn {
   position: relative;
   background: rgba(255, 255, 255, 0.1);
   border: 1px solid rgba(255, 255, 255, 0.2);
   color: white;
   backdrop-filter: blur(10px);
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   }

   &:active {
      transform: scale(0.95);
   }

   .el-icon {
      font-size: 18px;
      transition: all 0.3s ease;
   }

   &:hover .el-icon {
      transform: scale(1.1);
      color: #667eea;
   }
}

.notification-badge {
   position: absolute;
   top: -8px;
   right: -8px;
   background: linear-gradient(135deg, #f56c6c 0%, #e74c3c 100%);
   color: white;
   border-radius: 10px;
   font-size: 11px;
   font-weight: bold;
   padding: 1px 3px;

   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 2px 8px rgba(245, 108, 108, 0.4);
   border: 2px solid rgba(255, 255, 255, 0.9);
   animation: pulse 2s infinite;

   &::before {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      width: 6px;
      height: 6px;
      background: #f56c6c;
      border-radius: 50%;
      animation: blink 1.5s infinite;
   }
}

@keyframes pulse {
   0%,
   100% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(245, 108, 108, 0.4);
   }
   50% {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(245, 108, 108, 0.6);
   }
}

@keyframes blink {
   0%,
   100% {
      opacity: 1;
   }
   50% {
      opacity: 0.3;
   }
}

.fullscreen-btn {
   background: rgba(255, 255, 255, 0.1);
   border: 1px solid rgba(255, 255, 255, 0.2);
   color: white;
   backdrop-filter: blur(10px);
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   }
}

.user-dropdown {
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 8px 16px;
   background: rgba(255, 255, 255, 0.1);
   border-radius: 25px;
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   cursor: pointer;
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
   }
}

.user-avatar {
   border: 2px solid rgba(255, 255, 255, 0.3);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.user-details {
   display: flex;
   flex-direction: column;
   gap: 2px;

   .user-name {
      color: white;
      font-weight: 600;
      font-size: 14px;
   }

   .user-email {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
   }
}

.dropdown-icon {
   color: rgba(255, 255, 255, 0.8);
   font-size: 12px;
   transition: transform 0.3s ease;
}

.user-dropdown:hover .dropdown-icon {
   transform: rotate(180deg);
}

.user-dropdown-menu {
   background: rgba(255, 255, 255, 0.95);
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   border-radius: 12px;
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

   .el-dropdown-menu__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      color: #333;
      transition: all 0.3s ease;

      &:hover {
         background: rgba(102, 126, 234, 0.1);
         color: #667eea;
      }

      .el-icon {
         font-size: 16px;
      }
   }
}

// 响应式设计
@media (max-width: 768px) {
   .header-container {
      padding: 0 15px;
      height: 60px;
   }

   .system-name {
      display: none;
   }

   .welcome-section {
      display: none;
   }

   .user-details {
      display: none;
   }

   .user-dropdown {
      padding: 6px 12px;
   }

   .fullscreen-btn {
      display: none;
   }

   .mobile-menu {
      margin: 0 10px;
   }

   .mobile-menu-container {
      .el-menu-item,
      .el-sub-menu__title {
         padding: 6px 12px;
         font-size: 12px;
      }

      .mobile-menu-icon {
         font-size: 14px;
         margin-right: 4px;
      }
   }
}

@media (max-width: 480px) {
   .header-container {
      padding: 0 5px;
   }

   .logo-content {
      gap: 6px;
   }

   .menu-icon {
      font-size: 18px;
      padding: 4px;
   }

   .mobile-menu {
      margin: 0 5px;
   }

   .mobile-menu-container {
      .el-menu-item,
      .el-sub-menu__title {
         padding: 4px 8px;
         font-size: 11px;
         margin: 0 2px;
      }

      .mobile-menu-icon {
         font-size: 12px;
         margin-right: 2px;
      }
   }

   .notification-btn {
      .el-icon {
         font-size: 16px;
      }
   }

   .user-avatar {
      width: 32px;
      height: 32px;
   }
}
</style>
