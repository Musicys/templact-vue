<template>
   <div class="tinymce-box">
      <v-md-editor v-model="text" height="400px"></v-md-editor>
   </div>
</template>
<style scoped>
.tinymce-box {
   width: 100%;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
const text = ref('');
</script>
