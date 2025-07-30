<template>
   <div class="main-container">
      <!-- Tab 标签页 -->

      <el-tabs
         type="card"
         v-model="activeTab"
         :closable="MUEN.length > 1"
         @tab-click="handleTabClick"
         @tab-remove="handleTabRemove">
         <el-tab-pane v-for="tab in MUEN" :key="tab.path" :label="tab.name" :name="tab.path"> </el-tab-pane>
      </el-tabs>

      <!-- 路由视图，添加过渡动画 -->
      <transition name="router-fade-slide" mode="out-in">
         <RouterView v-slot="{ Component }">
            <keep-alive :exclude="excludedComponents">
               <component v-if="route.meta.keepAlive" :key="route.path" :is="Component" />
            </keep-alive>
            <component v-if="!route.meta.keepAlive" :key="route.path" :is="Component" />
         </RouterView>
      </transition>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MUENS from '@/router';
const route = useRoute();
const router = useRouter();

// 当前激活的 Tab
const activeTab = ref(route.path);

const MUEN = ref([]);

const handleTabClick = tab => {
   router.push(tab.props.name);
};

const excludedComponents = ref<string[]>([]);

const handleTabRemove = targetName => {
   const tabs = MUEN.value;
   const tabIndex = tabs.findIndex(tab => tab.path === targetName);
   const isActive = activeTab.value === targetName;
   if (isActive) {
      const newIndex = tabIndex > 0 ? tabIndex - 1 : tabIndex + 1;
      activeTab.value = tabs[newIndex]?.path || '';
   }

   MUEN.value = tabs.filter(tab => tab.path !== targetName);

   router.push({
      path: activeTab.value
   });
};

watch(
   () => route,
   newVal => {
      console.log('路由信息了', newVal.matched[1]);
      for (let i = 0; i < MUEN.value.length; i++) {
         const item = MUEN.value[i];
         console.log(item.path, item.path === newVal.matched[1].path);
         if (item.path === newVal.matched[1].path) {
            activeTab.value = item.path;

            return;
         }
      }

      console.log('执行');

      MUEN.value.push(newVal.matched[1]);
      activeTab.value = newVal.matched[1].path;
   },
   { deep: true, immediate: true }
);

onMounted(() => {});
</script>

<style lang="scss" scoped>
.main-container {
   width: 100%;
   height: 100%;

   .close-icon {
      margin-left: 5px;
      cursor: pointer;
      font-size: 12px;

      &:hover {
         color: #f56c6c;
      }
   }
}

/* 定义路由动画样式 */
.router-fade-slide-enter-active,
.router-fade-slide-leave-active {
   transition: all 0.3s ease;
}

.router-fade-slide-enter-from,
.router-fade-slide-leave-to {
   opacity: 0;
   transform: translateX(20px);
}
</style>
