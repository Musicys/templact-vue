<template>
   <div>
      <button @click="toggleComponent">切换组件</button>
      <!-- 使用 KeepAlive 包裹动态组件 -->
      <KeepAlive>
         <component :is="currentComponent" />
      </KeepAlive>
   </div>
</template>

<script setup>
import { ref } from 'vue';

const currentComponent = ref('ComponentA');

defineOptions({
   name: 'QuestionSumbit'
});

const toggleComponent = () => {
   currentComponent.value = currentComponent.value === 'ComponentA' ? 'ComponentB' : 'ComponentA';
};
</script>
