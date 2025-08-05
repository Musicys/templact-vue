script
<script setup lang="ts">
import { RouterView } from 'vue-router';

import { onMounted } from 'vue';

onMounted(() => {
   //记得注销
   console.log('App.vue:入口文件,初始化万能模板，当前env环境为：', import.meta.env);
});
</script>

<template>
   <KeepAlive>
      <Transition name="fade" mode="out-in">
         <RouterView></RouterView>
      </Transition>
   </KeepAlive>
</template>
<style scoped>
/* 定义淡入淡出动画效果 */
.fade-enter-active {
   transition: all 0.3s ease-out;
}

.fade-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
   transform: translateX(30px);
   opacity: 0;
}

.fade-leave-to {
   transform: translateX(-30px);
   opacity: 0;
}
</style>
