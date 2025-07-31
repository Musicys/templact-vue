import { defineStore } from 'pinia'; /*  */
import { ref } from 'vue';
export const systemStore = defineStore('x', () => {
   const isCollapse = ref(false);

   const updateisCollapse = () => {
      isCollapse.value = !isCollapse.value;
   };
   return {
      isCollapse,
      updateisCollapse
   };
});
/*  */
//存

// 不F5
