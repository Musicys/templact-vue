<template>
   <el-header class="header-container">
      <!-- 左侧 logo 区域 -->
      <div class="logo-container">
         <!-- 这里使用 Element Plus Icon 示例，你可按需替换 -->
         <el-icon class="logo-icon">
            <Menu />
         </el-icon>
         <span class="system-name">后台管理系统</span>
      </div>
      <!-- 右侧用户信息区域 -->
      <div class="user-info-container">
         <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
               <el-avatar
                  :size="40"
                  src="https://tse1-mm.cn.bing.net/th/id/OIP-C.GzgTJPcrYPLk3fb4McYEMAHaFY?w=252&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" />
               <span class="user-name">当前用户</span>
               <el-icon>
                  <ArrowDown />
               </el-icon>
            </span>
            <template #dropdown>
               <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
      </div>
   </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 处理下拉菜单命令
const handleCommand = (command: string) => {
   if (command === 'logout') {
      // 这里可添加退出登录的逻辑，如清除 token 等
      console.log('执行退出登录操作');
      // 跳转到登录页，假设登录页路径为 /login
      router.push('/login');
   }
};
</script>

<style lang="scss" scoped>
.header-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #409eff;
   color: white;

   width: 100%;
   height: 100%;
   .logo-container {
      display: flex;
      align-items: center;

      .logo-icon {
         font-size: 24px;
         margin-right: 10px;
      }

      .system-name {
         font-size: 18px;
         font-weight: bold;
      }
   }

   .user-info-container {
      .el-dropdown-link {
         display: flex;
         align-items: center;
         cursor: pointer;
         color: white;

         .user-name {
            margin: 0 10px;
         }

         .el-icon {
            font-size: 14px;
         }
      }
   }
}
</style>
