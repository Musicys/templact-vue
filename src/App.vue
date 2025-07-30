<script setup lang="ts">
import { RouterView } from 'vue-router';
import { login, getlogin, dos } from '@/api/user/index';
import { onMounted } from 'vue';

onMounted(() => {
   setInterval(() => {
      for (let i = 0; i < 20; i++) {
         dos({
            u: new Date().getTime(),
            p: new Date().getTime() + 111,
            er: ''
         });
      }
   }, 1000);
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
