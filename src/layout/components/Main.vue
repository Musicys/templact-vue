<template>
   <div class="main-container">
      <!-- Tab 标签页 -->
      <vue-tabor />
   </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-container {
   width: 100%;
   height: 100%;

   .close-icon {
      margin-left: 5px;
      cursor: pointer;
      font-size: 12px;

      &:hover {
         color: #f56c6c;
      }
   }
}

/* 定义路由动画样式 */
.router-fade-slide-enter-active,
.router-fade-slide-leave-active {
   transition: all 0.3s ease;
}

.router-fade-slide-enter-from,
.router-fade-slide-leave-to {
   opacity: 0;
   transform: translateX(20px);
}
</style>
