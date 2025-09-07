<template>
   <!-- 搜索表单 -->
   <el-card class="mb-6 shadow-sm">
      <template #header>
         <div class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-700">搜索条件</span>
         </div>
      </template>

      <el-form :model="searchForm" :inline="true" class="flex flex-wrap gap-4" @submit.prevent="handleSearch">
         <el-form-item label="用户名" class="mb-4">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable class="w-48" />
         </el-form-item>

         <el-form-item label="账号" class="mb-4">
            <el-input v-model="searchForm.userAccount" placeholder="请输入账号" clearable class="w-48" />
         </el-form-item>

         <el-form-item label="性别" class="mb-4 w-48">
            <el-select v-model="searchForm.gender" placeholder="请选择性别" clearable>
               <el-option label="女" :value="0" />
               <el-option label="男" :value="1" />
            </el-select>
         </el-form-item>

         <el-form-item label="状态" class="mb-4 w-48">
            <el-select v-model="searchForm.userStatus" placeholder="请选择状态" clearable>
               <el-option label="正常" :value="0" />
               <el-option label="封禁" :value="1" />
            </el-select>
         </el-form-item>

         <el-form-item class="mb-4">
            <el-button type="primary" @click="handleSearch" class="bg-blue-500 hover:bg-blue-600">
               <el-icon class="mr-1"><Search /></el-icon>
               搜索
            </el-button>
            <el-button @click="handleReset" class="ml-2">
               <el-icon class="mr-1"><Refresh /></el-icon>
               重置
            </el-button>
         </el-form-item>
      </el-form>
   </el-card>

   <!-- 数据表格 -->
   <el-card class="shadow-sm">
      <template #header>
         <div class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-700">用户列表</span>
            <div class="text-sm text-gray-500">共 {{ total }} 条记录</div>
         </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe class="w-full" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column prop="id" label="ID" width="80" />

         <el-table-column label="头像" width="80">
            <template #default="{ row }">
               <el-avatar :src="row.avatarUrl" :size="40" class="border border-gray-200">
                  {{ row.username?.charAt(0) }}
               </el-avatar>
            </template>
         </el-table-column>

         <el-table-column prop="username" label="用户名" min-width="120" />
         <el-table-column prop="userAccount" label="账号" min-width="120" />

         <el-table-column label="性别" width="80">
            <template #default="{ row }">
               <el-tag :type="row.gender === 1 ? 'success' : 'info'" size="small">
                  {{ row.gender === 1 ? '男' : '女' }}
               </el-tag>
            </template>
         </el-table-column>

         <el-table-column prop="email" label="邮箱" min-width="180" />

         <el-table-column label="状态" width="100">
            <template #default="{ row }">
               <el-tag :type="row.userStatus === 0 ? 'success' : 'danger'" size="small">
                  {{ row.userStatus === 0 ? '正常' : '封禁' }}
               </el-tag>
            </template>
         </el-table-column>

         <el-table-column prop="createTime" label="创建时间" width="180">
            <template #default="{ row }">
               {{ formatDate(row.createTime) }}
            </template>
         </el-table-column>

         <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
               <el-button
                  v-if="row.userStatus === 0"
                  type="danger"
                  size="small"
                  @click="handleBanned(row)"
                  class="mr-2">
                  <el-icon class="mr-1"><Lock /></el-icon>
                  封禁
               </el-button>
               <el-button v-else type="success" size="small" @click="handleLiberate(row)" class="mr-2">
                  <el-icon class="mr-1"><Unlock /></el-icon>
                  解封
               </el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-center mt-6">
         <el-pagination
            v-model:current-page="pagination.current"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[5, 10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
      </div>
   </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Lock, Unlock } from '@element-plus/icons-vue';
import { UserList, UserBanned, UserLiberate } from '@/api/client';
import type { User, ListUserRequest } from '@/api/client/model/type';

// 响应式数据
const loading = ref(false);
const selectedRows = ref<User[]>([]);

// 搜索表单
const searchForm = reactive<ListUserRequest>({
   username: '',
   userAccount: '',
   gender: undefined,
   userStatus: undefined
});

// 表格数据
const tableData = ref<User[]>([]);
const total = ref(0);

// 分页
const pagination = reactive({
   current: 1,
   pageSize: 5
});

// 方法
const loadData = async () => {
   loading.value = true;
   try {
      console.log(pagination.current);
      const params: ListUserRequest = {
         current: pagination.current,
         pageSize: pagination.pageSize,
         ...searchForm
      };

      console.log(pagination.current);

      const response = await UserList(params);
      if (response.code === 0) {
         tableData.value = response.data.records;
         total.value = response.data.total;
      }
   } catch (error) {
      console.error('加载数据失败:', error);
   } finally {
      loading.value = false;
   }
};

const handleSearch = () => {
   pagination.current = 1;
   loadData();
};

const handleReset = () => {
   Object.assign(searchForm, {
      username: '',
      userAccount: '',
      gender: undefined,
      userStatus: undefined
   });
   handleSearch();
};

const handleBanned = async (row: User) => {
   try {
      await ElMessageBox.confirm(`确定要封禁用户 "${row.username}" 吗？`, '确认封禁', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      });

      const response = await UserBanned(row.id);
      if (response.code === 0) {
         ElMessage.success('封禁成功');
         loadData();
      }
   } catch (error) {
      if (error !== 'cancel') {
         console.error('封禁失败:', error);
      }
   }
};

const handleLiberate = async (row: User) => {
   try {
      await ElMessageBox.confirm(`确定要解封用户 "${row.username}" 吗？`, '确认解封', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      });

      const response = await UserLiberate(row.id);
      if (response.code === 0) {
         ElMessage.success('解封成功');
         loadData();
      }
   } catch (error) {
      if (error !== 'cancel') {
         console.error('解封失败:', error);
      }
   }
};

const handleSelectionChange = (selection: User[]) => {
   selectedRows.value = selection;
};

const handleSizeChange = (size: number) => {
   pagination.pageSize = size;
   loadData();
};

const handleCurrentChange = (current: number) => {
   pagination.current = current;
   loadData();
};

const formatDate = (dateString: string) => {
   return new Date(dateString).toLocaleString('zh-CN');
};

// 生命周期
onMounted(() => {
   loadData();
});
</script>

<style scoped>
:deep(.el-card__header) {
   padding: 16px 20px;
   border-bottom: 1px solid #f0f0f0;
}

:deep(.el-card__body) {
   padding: 20px;
}

:deep(.el-table) {
   border-radius: 8px;
   overflow: hidden;
}

:deep(.el-pagination) {
   justify-content: center;
}
</style>
