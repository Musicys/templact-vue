<template>
   <div class="home">
      <div>
         {{ store.userinfo }}
      </div>
      home
      <input type="text" />
      <input type="text" />
   </div>
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

<style lang="scss" scoped>
.home {
   height: 200vh;
   width: 100%;
}
</style>
