v<template>
   <div class="accelerator-container">
      {{ store.userinfo }}
      <input type="text" />
   </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useStore } from '@/store/modules/user';

const store = useStore();
defineOptions({
   name: 'QuestionSumbit'
});

// 定义加速器表单数据
const acceleratorForm = ref({
   node: '',
   mode: '',
   isAccelerating: false
});

// 定义加速状态及对应类型
const acceleratorStatus = ref('未加速');
const acceleratorStatusType = ref('info');

// 处理开关状态变化
const handleAccelerateChange = (value: boolean) => {
   if (value) {
      acceleratorStatus.value = '准备加速';
      acceleratorStatusType.value = 'warning';
   } else {
      acceleratorStatus.value = '未加速';
      acceleratorStatusType.value = 'info';
   }
};

// 开始加速
const startAcceleration = () => {
   acceleratorStatus.value = '加速中';
   acceleratorStatusType.value = 'success';
   // 这里可添加实际的加速逻辑，如调用后端接口
   console.log('开始加速，节点：', acceleratorForm.value.node, '模式：', acceleratorForm.value.mode);
};

// 停止加速
const stopAcceleration = () => {
   acceleratorStatus.value = '已停止';
   acceleratorStatusType.value = 'info';
   acceleratorForm.value.isAccelerating = false;
   // 这里可添加停止加速的逻辑，如调用后端接口
   console.log('加速已停止');
};

onBeforeUnmount(() => {
   console.log('网络加速器组件已注销');
});
</script>

<style lang="scss" scoped>
.accelerator-container {
   padding: 20px;

   h2 {
      text-align: center;
      margin-bottom: 20px;
   }

   .form-container {
      max-width: 600px;
      margin: 0 auto;
   }
}
</style>
