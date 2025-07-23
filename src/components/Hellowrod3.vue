<template>
   <view class="hello"
      >3
      <input type="text" />
   </view>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

onUnmounted(() => {
   console.log('足协');
});
</script>

<style lang="scss" scoped></style>
