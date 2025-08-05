<template>
   <div class="main-container">
      <!-- Tab 标签页 -->
      <vue-tabor
         :style="taborStyle"
         :tabType="'card'"
         :maxAlive="10"
         :hideClose="false"
         :beforeClose="beforeClose"
         :tabClass="'custom-tab'"
         :pageClass="'custom-page'"
         :dropdownClass="'custom-dropdown'"
         :tabPrefix="TabPrefix"
         :language="'zh'" />
   </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElIcon } from 'element-plus';
import { Monitor, DataAnalysis, Setting } from '@element-plus/icons-vue';

// Tab前缀组件
const TabPrefix = {
   name: 'TabPrefix',
   template: `
    <div class="tab-prefix">
      <el-icon class="prefix-icon">
        <Monitor />
      </el-icon>
      <div class="prefix-glow"></div>
    </div>
  `
};

// vue-tabor样式配置
const taborStyle = computed(() => ({
   // 基础颜色与尺寸
   '--primary-color': '#1A1A1A',
   '--font-size-base': '14px',

   // 标签尺寸与间距
   '--tab-height': '45px',
   '--tab-min-width': '120px',
   '--tab-padding': '0 16px',
   '--tabs-gap': '8px',
   '--tab-label-min-width': '40px',
   '--tab-label-max-width': '120px',

   // 标签颜色与边框 - 科技感主题
   '--tab-background-color': 'rgba(255, 255, 255, 0.1)',
   '--tab-active-background-color': 'rgba(255, 255, 255, 0.2)',
   '--tab-active-color': '#667eea',
   '--tab-text-color': 'rgba(255, 255, 255, 0.8)',
   '--tab-border-color': 'rgba(255, 255, 255, 0.2)',
   '--tab-border-radius': '12px',

   // 标签阴影 - 毛玻璃效果
   '--tab-box-shadow': '0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
   '--tab-active-box-shadow': '0 6px 20px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',

   // 内容区域样式
   '--page-padding': '20px',
   '--page-background': 'rgba(255, 255, 255, 0.05)',
   '--page-border-radius': '16px',
   '--page-border': '1px solid rgba(255, 255, 255, 0.1)',
   '--page-backdrop-filter': 'blur(20px)',

   // 下拉菜单样式
   '--dropdown-background': 'rgba(255, 255, 255, 0.95)',
   '--dropdown-border': '1px solid rgba(255, 255, 255, 0.2)',
   '--dropdown-border-radius': '12px',
   '--dropdown-box-shadow': '0 8px 25px rgba(0, 0, 0, 0.15)',
   '--dropdown-backdrop-filter': 'blur(20px)'
}));

// 关闭前的钩子函数
const beforeClose = async (tab: any) => {
   // 这里可以添加关闭前的确认逻辑
   return true;
};
</script>

<style lang="scss" scoped>
.main-container {
   min-height: 100%;
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   position: relative;
   overflow: hidden;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
         radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
         radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
         radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
      pointer-events: none;
      animation: gradientShift 20s ease-in-out infinite;
   }

   &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
         radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
         radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
      animation: float 15s ease-in-out infinite;
   }
}

@keyframes gradientShift {
   0%,
   100% {
      transform: translateX(0) translateY(0);
   }
   25% {
      transform: translateX(-10px) translateY(-10px);
   }
   50% {
      transform: translateX(10px) translateY(-5px);
   }
   75% {
      transform: translateX(-5px) translateY(10px);
   }
}

@keyframes float {
   0%,
   100% {
      transform: translateY(0);
   }
   50% {
      transform: translateY(-20px);
   }
}

// 自定义Tab样式
:deep(.custom-tab) {
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   transition: all 0.3s ease;
   position: relative;
   overflow: hidden;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
   }

   &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
   }

   &:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.4);

      &::before {
         transform: translateX(100%);
      }

      &::after {
         opacity: 1;
      }
   }

   &.tabor-tab-active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
      border-color: rgba(102, 126, 234, 0.6);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      transform: translateY(-2px);

      &::before {
         transform: translateX(100%);
      }

      &::after {
         opacity: 1;
         animation: glow 2s ease-in-out infinite alternate;
      }
   }
}

@keyframes glow {
   0% {
      opacity: 0.3;
   }
   100% {
      opacity: 0.6;
   }
}

// 自定义页面样式
:deep(.custom-page) {
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.1);
   border-radius: 16px;
   margin: 10px;
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;
   position: relative;
   overflow: hidden;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
      pointer-events: none;
   }

   &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
   }
}

// 自定义下拉菜单样式
:deep(.custom-dropdown) {
   background: rgba(255, 255, 255, 0.95);
   backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.2);
   border-radius: 12px;
   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

   .el-dropdown-menu__item {
      color: #333;
      transition: all 0.3s ease;

      &:hover {
         background: rgba(102, 126, 234, 0.1);
         color: #667eea;
      }
   }
}

// Tab前缀样式
.tab-prefix {
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 8px;
   position: relative;

   .prefix-icon {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;
      z-index: 2;
   }

   .prefix-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1;
   }
}

:deep(.tabor-tab-active) {
   .prefix-icon {
      color: #667eea;
      transform: scale(1.1);
   }

   .prefix-glow {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.5);
      animation: pulse 2s infinite;
   }
}

@keyframes pulse {
   0%,
   100% {
      opacity: 0.3;
      transform: translate(-50%, -50%) scale(1.5);
   }
   50% {
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(1.8);
   }
}

// 路由动画效果
:deep(.router-view-container) {
   position: relative;
}

:deep(.router-view-enter-active),
:deep(.router-view-leave-active) {
   transition: all 0.3s ease;
}

:deep(.router-view-enter-from) {
   opacity: 0;
   transform: translateX(30px);
}

:deep(.router-view-leave-to) {
   opacity: 0;
   transform: translateX(-30px);
}

:deep(.router-view-enter-to),
:deep(.router-view-leave-from) {
   opacity: 1;
   transform: translateX(0);
}

// 响应式设计
@media (max-width: 768px) {
   .main-container {
      padding: 10px;
   }

   :deep(.custom-tab) {
      min-width: 100px;
      padding: 0 12px;
   }

   :deep(.custom-page) {
      margin: 5px;
      border-radius: 12px;
   }
}

@media (max-width: 480px) {
   .main-container {
      padding: 5px;
   }

   :deep(.custom-tab) {
      min-width: 80px;
      padding: 0 8px;
      font-size: 12px;
   }

   :deep(.custom-page) {
      margin: 3px;
      border-radius: 8px;
   }
}

// 加载动画
:deep(.tabor-loading) {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 200px;
   color: rgba(255, 255, 255, 0.8);

   .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
   }
}

@keyframes spin {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}

// 滚动条样式
:deep(.tabor-container) {
   &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
   }

   &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      transition: all 0.3s ease;

      &:hover {
         background: rgba(255, 255, 255, 0.5);
      }
   }
}

// 标签关闭按钮样式
:deep(.tabor-tab-close) {
   color: rgba(255, 255, 255, 0.6);
   transition: all 0.3s ease;
   border-radius: 50%;
   width: 16px;
   height: 16px;
   display: flex;
   align-items: center;
   justify-content: center;

   &:hover {
      color: #f56c6c;
      background: rgba(245, 108, 108, 0.1);
      transform: scale(1.1);
   }
}

// 标签文本样式
:deep(.tabor-tab-label) {
   font-weight: 500;
   transition: all 0.3s ease;
}

:deep(.tabor-tab-active) {
   .tabor-tab-label {
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
   }
}
</style>
