<template>
   <div class="menu-container">
      <!-- 系统标题区域 -->
      <div class="system-header" :class="{ collapsed: system.isCollapse }">
         <div class="system-logo">
            <img
               src="https://tse1-mm.cn.bing.net/th/id/OIP-C.GzgTJPcrYPLk3fb4McYEMAHaFY?w=252&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
               alt="Logo"
               class="logo-img" />
            <div class="system-info" v-show="!system.isCollapse">
               <h3 class="system-title">LOGIN 管理系统</h3>
               <p class="system-subtitle">Professional Admin</p>
            </div>
         </div>
      </div>

      <!-- 菜单列表 -->
      <el-menu
         :default-active="route.path"
         class="el-menu-vertical"
         :collapse="system.isCollapse"
         :router="true"
         active-text-color="#FFFFFF"
         background-color="#5E6576"
         text-color="rgba(255, 255, 255, 0.8)"
         :unique-opened="true"
         @open="handleOpen"
         @close="handleClose">
         <!-- 动态菜单项 -->
         <template v-for="(item, index) in MENU" :key="index">
            <el-menu-item
               v-if="!item.meta.setup"
               :closable="false"
               :index="'/pages/' + item.path"
               :route="'/pages/' + item.path"
               class="menu-item">
               <el-icon class="menu-icon">
                  <component :is="item.meta.icon" />
               </el-icon>
               <template #title>{{ item.meta.tabConfig.name }}</template>
            </el-menu-item>

            <el-sub-menu :index="item.path" v-else class="sub-menu">
               <template #title>
                  <el-icon class="menu-icon">
                     <component :is="item.meta.icon" />
                  </el-icon>
                  <span>{{ item.meta.tabConfig.name }}</span>
               </template>

               <template v-for="(son, index) in item.children" :key="index">
                  <el-menu-item v-if="son.meta" :index="`/pages/${item.path}/${son.path}`" class="sub-menu-item">
                     <el-icon class="menu-icon">
                        <component :is="son.meta.icon" />
                     </el-icon>
                     <span>{{ son.meta.tabConfig.name }}</span>
                  </el-menu-item>
               </template>
            </el-sub-menu>
         </template>
      </el-menu>

      <!-- 菜单底部信息 -->
      <div class="menu-footer" v-show="!system.isCollapse">
         <div class="version-info">
            <span class="version-text">v1.0.0</span>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { systemStore } from '@/store/modules/system';

const route = useRoute();
const system = systemStore();

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

const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath);
};

onMounted(() => {
   let ROTER: any = null;
   router.options.routes.forEach(item => {
      if (item.path === '/pages') {
         ROTER = item;
      }
   });

   MENU.value = ROTER?.children?.filter((item: any) => item.meta && Object.keys(item.meta).length > 0) || [];
});
</script>

<style lang="scss" scoped>
.menu-container {
   height: 100%;
   display: flex;
   flex-direction: column;
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(20px);
   border-right: 1px solid rgba(255, 255, 255, 0.1);
   position: relative;
   overflow: hidden;
   transition: all 0.3s ease;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      z-index: -1;
   }
}

.system-header {
   padding: 20px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(10px);
   transition: all 0.3s ease;
   display: flex;
   align-items: center;

   &.collapsed {
      padding: 15px;
      justify-content: center;
   }
}

.system-logo {
   display: flex;
   align-items: center;
   gap: 12px;
   transition: all 0.3s ease;

   .collapsed & {
      justify-content: center;
      gap: 0;
   }
}

.logo-img {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   border: 2px solid rgba(255, 255, 255, 0.3);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   transition: all 0.3s ease;

   .collapsed & {
      width: 35px;
      height: 35px;
   }
}

.system-info {
   flex: 1;
   min-width: 0;
   transition: all 0.3s ease;
   overflow: hidden;
}

.system-title {
   font-size: 16px;
   font-weight: 700;
   color: white;
   margin: 0 0 4px 0;
   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   background: linear-gradient(45deg, #fff, #f0f0f0);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
   transition: all 0.3s ease;
}

.system-subtitle {
   font-size: 12px;
   color: rgba(255, 255, 255, 0.7);
   margin: 0;
   font-weight: 300;
   transition: all 0.3s ease;
}

.el-menu-vertical {
   flex: 1;
   border: none;
   background: transparent;
   padding: 10px 0;
   transition: all 0.3s ease;

   &.el-menu--collapse {
      width: 64px;
   }

   &:not(.el-menu--collapse) {
      width: 240px;
   }
}

.menu-item {
   transition: all 0.3s ease;
   height: 48px;
   line-height: 48px;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
   }

   &.is-active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
      border-color: rgba(102, 126, 234, 0.6);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);

      transform: translateX(6px);

      .menu-icon {
         color: #ffffff !important;
         transform: scale(1.1);
      }
   }

   .menu-icon {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;
   }
}

.sub-menu {
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
   }

   .el-sub-menu__title {
      height: 48px;
      line-height: 48px;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.8) !important;
      transition: all 0.3s ease;

      &:hover {
         background: rgba(255, 255, 255, 0.1);
         color: #667eea !important;

         .menu-icon {
            color: #667eea;
         }
      }

      .menu-icon {
         font-size: 18px;
         color: rgba(255, 255, 255, 0.8);
         transition: all 0.3s ease;
      }
   }

   .sub-menu-item {
      transition: all 0.3s ease;
      height: 40px;
      line-height: 40px;

      &:hover {
         background: rgba(255, 255, 255, 0.08);
         border-color: rgba(102, 126, 234, 0.2);
         transform: translateX(2px);
      }

      &.is-active {
         background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
         border-color: rgba(102, 126, 234, 0.5);
         color: #ffffff !important;
         transform: translateX(4px);
         box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

         .menu-icon {
            color: #ffffff;
            transform: scale(1.05);
         }
      }

      .menu-icon {
         font-size: 16px;
         color: rgba(255, 255, 255, 0.7);
         transition: all 0.3s ease;
      }
   }
}

.menu-footer {
   padding: 15px 20px;
   border-top: 1px solid rgba(255, 255, 255, 0.1);
   background: rgba(255, 255, 255, 0.03);
   backdrop-filter: blur(10px);
   transition: all 0.3s ease;
}

.version-info {
   text-align: center;
}

.version-text {
   font-size: 12px;
   color: rgba(255, 255, 255, 0.5);
   font-weight: 300;
}

// 响应式设计
@media (max-width: 768px) {
   .menu-container {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform 0.3s ease;

      &.menu-open {
         transform: translateX(0);
      }
   }

   .system-header {
      padding: 15px;
   }

   .system-title {
      font-size: 14px;
   }

   .system-subtitle {
      font-size: 11px;
   }
}

// 菜单展开/收起动画
.el-menu-vertical {
   transition: width 0.3s ease;
}

// 自定义滚动条
.el-menu-vertical::-webkit-scrollbar {
   width: 4px;
}

.el-menu-vertical::-webkit-scrollbar-track {
   background: rgba(255, 255, 255, 0.1);
   border-radius: 2px;
}

.el-menu-vertical::-webkit-scrollbar-thumb {
   background: rgba(255, 255, 255, 0.3);
   border-radius: 2px;

   &:hover {
      background: rgba(255, 255, 255, 0.5);
   }
}

// 增强选中状态的视觉效果
.el-menu-item.is-active {
   position: relative;

   &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(to bottom, #667eea, #764ba2);
      border-radius: 0 2px 2px 0;
   }
}

.el-sub-menu .el-menu-item.is-active {
   &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #667eea, #764ba2);
      border-radius: 0 1px 1px 0;
   }
}
</style>
