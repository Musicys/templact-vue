<template>
   <div class="app-container">
      <h1>TinyMCE 编辑器</h1>
      <editor api-key="your-tinymce-api-key" :init="init" v-model="tinymceHtml" />
      <div v-html="tinymceHtml" class="output"></div>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default'; // 确保图标加载
// 引入插件（根据需要）
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/contextmenu';

import Editor from '@tinymce/tinymce-vue';

// 响应式数据
const tinymceHtml = ref('请输入内容');

// 编辑器配置
const init = {
   language_url: '/tinymce/zh_CN.js',
   language: 'zh_CN',
   skin_url: '/tinymce/skins/ui/oxide',
   height: 300,
   plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
   toolbar:
      'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | ' +
      'alignleft aligncenter alignright alignjustify | bullist numlist | ' +
      'outdent indent blockquote | undo redo | link unlink image code | removeformat',
   branding: false,
   // 可选：自定义初始化回调
   setup: editor => {
      // 可以在这里监听事件
      editor.on('init', () => {
         console.log('TinyMCE 初始化完成');
      });
   }
};

// mounted 钩子
onMounted(() => {
   // 如果需要手动初始化某些 TinyMCE 行为，可以在这里操作
   // 注意：使用 @tinymce/tinymce-vue 时，通常不需要手动调用 tinymce.init()
   // 组件会自动处理初始化
});
</script>

<style scoped>
.app-container {
   padding: 20px;
}
.output {
   margin-top: 20px;
   padding: 15px;
   border: 1px solid #ddd;
   background-color: #f9f9f9;
}
</style>
