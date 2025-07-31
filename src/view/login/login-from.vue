<template>
   <div class="login-container">
      <div class="login-box">
         <div class="login-logo">
            <!-- 使用新的 logo 图片地址 -->
            <img
               src="https://tse1-mm.cn.bing.net/th/id/OIP-C.GzgTJPcrYPLk3fb4McYEMAHaFY?w=252&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
               alt="后台管理系统 logo"
               class="logo-img" />
            <h2 class="system-name">后台管理系统</h2>
         </div>
         <el-form class="login-form" :model="loginForm" label-width="80px">
            <el-form-item label="用户名">
               <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
               <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTabor } from 'vue3-tabor';
const tabor = useTabor();
// 定义登录表单数据
const loginForm = ref({
   username: '',
   password: ''
});

const router = useRouter();

// 登录处理函数
const handleLogin = () => {
   // 这里可以添加登录逻辑，如调用接口等

   // 跳转到 /pages/ 页面
   tabor.open('/pages/home');
   
  
};
onUnmounted(() => {
   console.log('组件卸载');
});
</script>

<style lang="scss" scoped>
.login-container {
   width: 100vw;
   height: 100vh;
   background-color: #fff;
   display: flex;
   justify-content: center;
   align-items: center;

   .login-box {
      width: 400px;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;

      .login-logo {
         text-align: center;
         margin-bottom: 30px;

         .logo-img {
            width: 80px;
            height: 80px;
         }

         .system-name {
            margin-top: 10px;
            color: #409eff;
         }
      }

      .login-form {
         .login-btn {
            width: 100%;
         }
      }
   }
}
</style>
