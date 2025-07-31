<template>
   <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="(item, index) in MENU" :key="index">
         <el-menu-item
            v-if="!item.meta.setup"
            :closable="false"
            :index="'/pages/' + item.path"
            :route="'/pages/' + item.path">
            <el-icon>
               <component :is="item.meta.icon" />
            </el-icon>
            <template #title>{{ item.meta.tabConfig.name }}</template>
         </el-menu-item>
         <el-sub-menu :index="item.path" v-else>
            <template #title>
               <el-icon>
                  <el-icon> <component :is="item.meta.icon" /> </el-icon
               ></el-icon>
               <span>{{ item.meta.tabConfig.name }}</span>
            </template>

            <template v-for="(son, index) in item.children" :key="index">
               <el-menu-item v-if="son.meta" :index="`/pages/${item.path}/${son.path}`">
                  <el-icon>
                     <el-icon> <component :is="son.meta.icon" /> </el-icon
                  ></el-icon>
                  <span>{{ son.meta.tabConfig.name }} {{}}</span>
               </el-menu-item>
            </template>
         </el-sub-menu>
      </template>
   </el-menu>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
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

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 200px;
   min-height: 400px;
}
</style>
