<template>
   <div>
      {{ store.userinfo }}
   </div>

   <button @click="store.setUserInfo()">登录</button>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/store/modules/user';

const store = useStore();

defineOptions({
   name: 'HomeCharts'
});
// 注册组件以便动态使用

const currentComponent = ref('Hellowrod1');

const toggleComponent = e => {
   currentComponent.value = `Hellowrod${e}`;
};
</script>
