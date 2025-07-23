<template>
   <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item v-for="(item, index) in MENU" :key="index" :index="item.path" :route="item.path">
         <el-icon>
            <component :is="item.meta.icon" />
         </el-icon>
         <template #title>{{ item.name }}</template>
      </el-menu-item>
   </el-menu>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute();

const MENU = ref([]);

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath);
};

onMounted(() => {
   let ROTER = [];
   router.options.routes.forEach(item => {
      if (item.path === '/pages') {
         ROTER = item;
      }
   });

   MENU.value = ROTER?.children?.filter(item => item.meta && Object.keys(item.meta).length > 0) || [];
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 200px;
   min-height: 400px;
}
</style>
