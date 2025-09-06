<template>
   <div class="login-container">
      <!-- 多层背景 -->
      <div class="background-layers">
         <div class="bg-layer-1"></div>
         <div class="bg-layer-2"></div>
         <div class="bg-layer-3"></div>
      </div>

      <!-- 浮动装饰元素 -->
      <div class="floating-elements">
         <div class="float-circle circle-1"></div>
         <div class="float-circle circle-2"></div>
         <div class="float-circle circle-3"></div>
         <div class="float-square square-1"></div>
         <div class="float-square square-2"></div>
      </div>

      <!-- 登录卡片 -->
      <div class="login-card">
         <!-- 左侧登录区域 -->
         <div class="login-left">
            <div class="login-content">
               <div class="logo-section">
                  <div class="logo-container">
                     <img :src="logo" alt="后台管理系统 logo" class="logo-img" />
                     <div class="logo-glow"></div>
                  </div>
                  <h1 class="system-title">{{ systemTitle }}</h1>
                  <p class="system-subtitle">Professional Admin System</p>
               </div>
               <div class="welcome-text">
                  <h2>欢迎登录</h2>
                  <p>请输入您的账号信息进行登录</p>
               </div>
               <div class="feature-list">
                  <div class="feature-item">
                     <div class="feature-icon">🔒</div>
                     <span>安全可靠</span>
                  </div>
                  <div class="feature-item">
                     <div class="feature-icon">⚡</div>
                     <span>快速响应</span>
                  </div>
                  <div class="feature-item">
                     <div class="feature-icon">🎨</div>
                     <span>美观界面</span>
                  </div>
               </div>
            </div>
         </div>

         <!-- 右侧表单区域 -->
         <div class="login-right">
            <div class="form-container">
               <div class="form-header">
                  <h2 class="form-title">用户登录</h2>
                  <p class="form-subtitle">请输入您的登录信息</p>
               </div>

               <el-form
                  class="login-form"
                  :model="loginForm"
                  :rules="loginRules"
                  ref="loginFormRef"
                  label-position="top">
                  <el-form-item label="用户名" prop="username">
                     <el-input
                        v-model="form.userAccount"
                        placeholder="请输入用户名"
                        prefix-icon="User"
                        size="large"
                        class="glass-input">
                     </el-input>
                  </el-form-item>

                  <el-form-item label="密码" prop="password">
                     <el-input
                        v-model="form.userPassword"
                        type="password"
                        placeholder="请输入密码"
                        prefix-icon="Lock"
                        size="large"
                        show-password
                        class="glass-input">
                     </el-input>
                  </el-form-item>

                  <el-form-item>
                     <div class="remember-section">
                        <el-checkbox v-model="rememberMe" class="glass-checkbox">记住用户名</el-checkbox>
                        <el-link type="primary" :underline="false" class="forgot-link">忘记密码？</el-link>
                     </div>
                  </el-form-item>

                  <el-form-item>
                     <el-button type="primary" class="login-btn" size="large" :loading="loading" @click="handleLogin">
                        <span v-if="!loading">登录</span>
                        <span v-else>登录中...</span>
                     </el-button>
                  </el-form-item>
               </el-form>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { AdminLogin } from '@/api/user';
import logo from '@/assets/logo.webp';
import { useRouter } from 'vue-router';
const router = useRouter();
import { adminStore } from '@/store/modules/admin';
import { ElMessage } from 'element-plus';
// 加载状态
const loading = ref(false);
const store = adminStore();
// 记住用户名
const rememberMe = ref(false);

const form = reactive({
   userAccount: 'liwang',
   userPassword: '12345678'
});

const handleLogin = async () => {
   const res = await AdminLogin(form);

   if (res.code == 0) {
      router.push('/pages/home');
      console.log('管理员暑假', store.userinfo);

      ElMessage.success('欢迎您!!' + res.data.username || '管理员');
      store.setUserInfo(res.data);

      // 保存用户信息到本地存储
   }
};

// 表单验证规则
const loginRules = {
   username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
   ],
   password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
   ]
};

// 从本地存储获取记住的用户名
onMounted(async () => {});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.login-container {
   width: 100vw;
   height: 100vh;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.background-layers {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 1;
}

.bg-layer-1 {
   position: absolute;
   top: -50%;
   left: -50%;
   width: 200%;
   height: 200%;
   background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
   animation: rotate 20s linear infinite;
}

.bg-layer-2 {
   position: absolute;
   top: -30%;
   right: -30%;
   width: 160%;
   height: 160%;
   background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
   animation: rotate 15s linear infinite reverse;
}

.bg-layer-3 {
   position: absolute;
   bottom: -40%;
   left: -20%;
   width: 140%;
   height: 140%;
   background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
   animation: rotate 25s linear infinite;
}

@keyframes rotate {
   from {
      transform: rotate(0deg);
   }
   to {
      transform: rotate(360deg);
   }
}

.floating-elements {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 2;
   pointer-events: none;
}

.float-circle {
   position: absolute;
   border-radius: 50%;
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   animation: float 6s ease-in-out infinite;
}

.circle-1 {
   width: 100px;
   height: 100px;
   top: 20%;
   left: 10%;
   animation-delay: 0s;
}

.circle-2 {
   width: 60px;
   height: 60px;
   top: 60%;
   right: 15%;
   animation-delay: 2s;
}

.circle-3 {
   width: 80px;
   height: 80px;
   bottom: 20%;
   left: 20%;
   animation-delay: 4s;
}

.float-square {
   position: absolute;
   width: 40px;
   height: 40px;
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   transform: rotate(45deg);
   animation: float 8s ease-in-out infinite;
}

.square-1 {
   top: 30%;
   right: 25%;
   animation-delay: 1s;
}

.square-2 {
   bottom: 30%;
   right: 10%;
   animation-delay: 3s;
}

@keyframes float {
   0%,
   100% {
      transform: translateY(0px) rotate(45deg);
   }
   50% {
      transform: translateY(-20px) rotate(45deg);
   }
}

.particle-canvas {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 3;
}

.login-card {
   position: relative;
   z-index: 4;
   width: 1000px;
   height: 650px;
   background: rgba(255, 255, 255, 0.1);
   border-radius: 25px;
   box-shadow:
      0 25px 80px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
   backdrop-filter: blur(20px);
   display: flex;
   overflow: hidden;
   border: 1px solid rgba(255, 255, 255, 0.2);
   animation: slideIn 0.3s ease-out;
}

.login-left {
   flex: 1;
   background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 50px;
   position: relative;
   overflow: hidden;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
   }
}

.login-content {
   text-align: center;
   color: white;
   position: relative;
   z-index: 1;
}

.logo-section {
   margin-bottom: 40px;
}

.logo-container {
   position: relative;
   display: inline-block;
   margin-bottom: 25px;
}

.logo-img {
   width: 90px;
   height: 90px;
   border-radius: 50%;
   border: 3px solid rgba(255, 255, 255, 0.3);
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
   transition: all 0.3s ease;

   &:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
   }
}

.logo-glow {
   position: absolute;
   top: -10px;
   left: -10px;
   right: -10px;
   bottom: -10px;
   border-radius: 50%;
   background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
   animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
   0%,
   100% {
      opacity: 0.5;
      transform: scale(1);
   }
   50% {
      opacity: 0.8;
      transform: scale(1.1);
   }
}

.system-title {
   font-size: 32px;
   font-weight: 700;
   margin-bottom: 12px;
   text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
   background: linear-gradient(45deg, #fff, #f0f0f0);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
}

.system-subtitle {
   font-size: 18px;
   opacity: 0.9;
   font-weight: 300;
   letter-spacing: 1px;
}

.welcome-text {
   margin-bottom: 40px;

   h2 {
      font-size: 28px;
      margin-bottom: 12px;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   }

   p {
      font-size: 16px;
      opacity: 0.8;
      line-height: 1.6;
   }
}

.feature-list {
   display: flex;
   flex-direction: column;
   gap: 15px;
}

.feature-item {
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 12px 20px;
   background: rgba(255, 255, 255, 0.1);
   border-radius: 12px;
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(5px);
   }

   .feature-icon {
      font-size: 20px;
   }

   span {
      font-weight: 500;
      font-size: 14px;
   }
}

.login-right {
   flex: 1;
   padding: 50px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(10px);
}

.form-container {
   width: 100%;
   max-width: 380px;
}

.form-header {
   text-align: center;
   margin-bottom: 35px;
}

.form-title {
   font-size: 28px;
   font-weight: 700;
   color: #333;
   margin-bottom: 8px;
   background: linear-gradient(45deg, #667eea, #764ba2);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
}

.form-subtitle {
   color: #666;
   font-size: 14px;
   font-weight: 400;
}

.login-form {
   .el-form-item {
      margin-bottom: 25px;
   }

   .el-form-item__label {
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
      font-size: 14px;
   }
}

.glass-input {
   .el-input__wrapper {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover {
         border-color: rgba(102, 126, 234, 0.5);
         box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
      }

      &.is-focus {
         border-color: #667eea;
         box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
         background: rgba(255, 255, 255, 0.15);
      }
   }

   .el-input__inner {
      color: #333;
      font-weight: 500;

      &::placeholder {
         color: #999;
      }
   }
}

.captcha-container {
   display: flex;
   align-items: center;
   gap: 15px;
}

.captcha-image {
   position: relative;
   cursor: pointer;
   border-radius: 12px;
   overflow: hidden;
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;

   &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
   }

   canvas {
      display: block;
      border-radius: 12px;
   }
}

.captcha-overlay {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
   opacity: 0;
   transition: opacity 0.3s ease;

   span {
      color: white;
      font-size: 12px;
      font-weight: 500;
   }

   &:hover {
      opacity: 1;
   }
}

.remember-section {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 25px;
}

.glass-checkbox {
   .el-checkbox__input {
      .el-checkbox__inner {
         background: rgba(255, 255, 255, 0.1);
         border: 1px solid rgba(255, 255, 255, 0.3);
         backdrop-filter: blur(10px);
      }
   }
}

.forgot-link {
   color: #667eea;
   font-weight: 500;
   transition: color 0.3s ease;

   &:hover {
      color: #764ba2;
   }
}

.login-btn {
   width: 100%;
   height: 52px;
   border-radius: 12px;
   font-size: 16px;
   font-weight: 600;
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   border: none;
   box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
   transition: all 0.3s ease;
   position: relative;
   overflow: hidden;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
   }

   &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);

      &::before {
         left: 100%;
      }
   }

   &:active {
      transform: translateY(-1px);
   }
}

// 响应式设计
@media (max-width: 768px) {
   .login-card {
      width: 95%;
      height: auto;
      flex-direction: column;
      margin: 20px;
   }

   .login-left {
      display: none; // H5端隐藏左侧
   }

   .login-right {
      padding: 40px 30px;
      flex: none;
   }

   .form-container {
      max-width: 100%;
   }

   .floating-elements {
      display: none;
   }
}

@keyframes slideIn {
   from {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
   }
   to {
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}
</style>
