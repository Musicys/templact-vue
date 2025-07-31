<template>
   <div class="common-layout">
      <el-container>
         <el-header>
            <Footer></Footer>
         </el-header>
         <el-container>
            <el-aside width="200px">
               <Muen></Muen>
            </el-aside>
            <el-main>
               <Main></Main>
            </el-main>
         </el-container>
      </el-container>
   </div>
</template>
<script setup lang="ts">
import Footer from './components/footer.vue';
import Main from './components/Main.vue';
import Muen from './components/muen.vue';
import { onMounted } from 'vue';
import { useTabor } from 'vue3-tabor';
const tabor = useTabor();

onMounted(() => {
   tabor.closeOthers();
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
}
</style>
