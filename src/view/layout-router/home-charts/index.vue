<template>
   <div class="home-charts-container">
      <h2>图片管理示例</h2>
      <div class="demo-section">
         <el-button type="primary" @click="showFileUpdate = true"> 打开图片选择器 </el-button>

         <div v-if="selectedImage" class="selected-image-preview">
            <h3>已选中的图片</h3>
            <img :src="selectedImage.url" :alt="selectedImage.title" />
            <p>{{ selectedImage.title }}</p>
            <p>大小: {{ formatSize(selectedImage.size) }}</p>
         </div>
      </div>

      <!-- FileUpdate组件 -->
      <FileUpdate v-model:visible="showFileUpdate" @select="handleImageSelect" @close="handleClose" />
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import FileUpdate from '@/components/FileUpdate/index.vue';
import type { Img } from '@/api/imgs/model/type';

// 控制FileUpdate组件显示状态
const showFileUpdate = ref(false);

// 存储选中的图片
const selectedImage = ref<Img | null>(null);

// 处理图片选中事件
const handleImageSelect = (image: Img) => {
   selectedImage.value = image;
   ElMessage.success('图片选择成功');
   console.log('选中的图片对象:', image);
};

// 处理弹窗关闭事件
const handleClose = () => {
   console.log('图片选择器已关闭');
};

// 格式化文件大小
const formatSize = (bytes: number) => {
   if (bytes === 0) return '0 Bytes';

   const k = 1024;
   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<style lang="scss" scoped>
.home-charts-container {
   padding: 20px;
   width: 100%;
   max-width: 1200px;
   margin: 0 auto;
}

h2 {
   margin-bottom: 20px;
   font-size: 24px;
   font-weight: 600;
}

.demo-section {
   background: #f5f7fa;
   padding: 20px;
   border-radius: 8px;
}

.selected-image-preview {
   margin-top: 20px;
   padding: 20px;
   background: #fff;
   border-radius: 8px;
   border: 1px solid #e4e7ed;
}

.selected-image-preview h3 {
   margin-bottom: 15px;
   font-size: 18px;
}

.selected-image-preview img {
   max-width: 300px;
   max-height: 200px;
   border-radius: 4px;
   border: 1px solid #e4e7ed;
}

.selected-image-preview p {
   margin: 8px 0;
   font-size: 14px;
}
</style>
