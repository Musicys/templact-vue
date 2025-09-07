<template>
   <div class="common-layout">
      <div class=""></div>
      <el-container>
         <el-aside><Muen></Muen></el-aside>
         <el-container>
            <el-header> <Footer></Footer></el-header>
            <el-main> <Main></Main></el-main>
         </el-container>
      </el-container>
   </div>
</template>
<script setup lang="ts">
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Muen from './components/Muen.vue';
import { onMounted } from 'vue';
import { useTabor } from 'vue3-tabor';
const tabor = useTabor();

onMounted(() => {
   tabor.closeOthers();
   console.log('初始化完成');
});
</script>

<style lang="scss" scoped>
.common-layout {
   width: 100vw;
   height: 100vh;
}

:deep(.el-container) {
   height: 100%;
}

:deep() {
   .el-header {
      padding: 0 !important;
   }
   .el-menu {
      border-right: none !important;
   }
   .el-aside {
      background: #545c64;
      width: auto;
      transition: all 0.3;
   }
   .el-main {
      background: #e4e6e9;
      padding: 0 !important;
      width: 100%;
      height: 100%;
   }
}
</style>
