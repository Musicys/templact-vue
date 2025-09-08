<template>
   <!-- 搜索表单 -->
   <el-card class="mb-2 shadow-sm">
      <template #header>
         <div class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-700">搜索条件</span>
         </div>
      </template>

      <el-form :model="searchForm" :inline="true" class="flex flex-wrap gap-4" @submit.prevent="handleSearch">
         <el-form-item label="位置" class="mb-4 w-48">
            <el-select v-model="searchForm.province" placeholder="请选择地区" clearable>
               <el-option v-for="(item, idx) in DynamicDrsData" :key="idx" :label="item" :value="item" />
            </el-select>
         </el-form-item>

         <el-form-item label="作者" class="mb-4">
            <el-input v-model="searchForm.userid" placeholder="请输入作者" clearable class="w-48" />
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
            <span class="text-lg font-medium text-gray-700">动态列表</span>
            <div class="text-sm text-gray-500">共 {{ total }} 条记录</div>
         </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe class="w-full" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column prop="id" label="ID" width="80" />
         <el-table-column prop="userid" label="用户ID" width="100" />

         <el-table-column prop="context" label="内容" min-width="260" show-overflow-tooltip />

         <el-table-column label="图片" min-width="220">
            <template #default="{ row }">
               <div class="flex gap-2">
                  <el-image
                     v-for="(src, idx) in parseImgs(row.imgarr)"
                     :key="idx"
                     :src="src"
                     preview-teleported="true"
                     fit="cover"
                     class="w-16 h-16 rounded border"
                     :preview-src-list="parseImgs(row.imgarr)"
                     :initial-index="idx" />
               </div>
            </template>
         </el-table-column>

         <el-table-column label="位置" width="180">
            <template #default="{ row }">
               <span>{{ row.province }}</span>
            </template>
         </el-table-column>

         <el-table-column prop="createtime" label="创建时间" width="180">
            <template #default="{ row }">
               {{ formatDate(row.createtime) }}
            </template>
         </el-table-column>

         <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
               <el-button type="primary" size="small" @click="handleView(row)" class="mr-2">
                  <el-icon class="mr-1"><View /></el-icon>
                  查看
               </el-button>
               <el-button type="danger" size="small" @click="handleDelete(row)">
                  <el-icon class="mr-1"><Delete /></el-icon>
                  删除
               </el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-center mt-4">
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

   <!-- 查看详情对话框 -->
   <el-dialog v-model="viewDialogVisible" title="动态详情" width="800px" :close-on-click-modal="false">
      <div v-if="currentDynamic" class="space-y-4">
         <div class="flex items-center justify-between border-b pb-2">
            <h3 class="text-lg font-semibold">{{ currentDynamic.title }}</h3>
            <el-tag :type="getStatusType(currentDynamic.status)" size="small">
               {{ getStatusText(currentDynamic.status) }}
            </el-tag>
         </div>

         <div class="flex items-center gap-4 text-sm text-gray-600">
            <span>作者: {{ currentDynamic.authorName }}</span>
            <span>创建时间: {{ formatDate(currentDynamic.createTime) }}</span>
            <span v-if="currentDynamic.publishTime">发布时间: {{ formatDate(currentDynamic.publishTime) }}</span>
         </div>

         <div class="flex items-center gap-6 text-sm text-gray-600">
            <span>浏览: {{ currentDynamic.viewCount }}</span>
            <span>点赞: {{ currentDynamic.likeCount }}</span>
            <span>评论: {{ currentDynamic.commentCount }}</span>
         </div>

         <div class="border-t pt-4">
            <h4 class="font-medium mb-2">内容:</h4>
            <div class="whitespace-pre-wrap bg-gray-50 p-4 rounded">{{ currentDynamic.content }}</div>
         </div>
      </div>

      <template #footer>
         <div class="flex justify-end">
            <el-button @click="viewDialogVisible = false">关闭</el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, View, Delete } from '@element-plus/icons-vue';
import { DynamicList, DynamicDel, DynamicDrs } from '@/api/dynamic';
import type { Dynamic, ListDynamicRequest } from '@/api/dynamic/model/type';

// 响应式数据
const DynamicDrsData: Ref<string[]> = ref([]);
const loading = ref(false);
const selectedRows = ref<Dynamic[]>([]);
const viewDialogVisible = ref(false);
const currentDynamic = ref<Dynamic | null>(null);

// 搜索表单
const searchForm = reactive({
   province: '',
   userid: null
});

const datatinit = async () => {
   let res = await DynamicDrs();
   if (res.code == 0) {
      DynamicDrsData.value = res.data;
   }
};

// 表格数据
const tableData = ref<Dynamic[]>([]);
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
      const params: ListDynamicRequest = {
         current: pagination.current,
         pageSize: pagination.pageSize,
         ...searchForm
      };

      const response = await DynamicList(params);
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
      title: '',
      authorName: '',
      status: undefined,
      startTime: '',
      endTime: ''
   });
   handleSearch();
};

const handleView = (row: Dynamic) => {
   currentDynamic.value = row;
   viewDialogVisible.value = true;
};

const handleDelete = async (row: Dynamic) => {
   try {
      await ElMessageBox.confirm(`确定要删除动态吗？`, '确认删除', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      });

      const response = await DynamicDel(row.id);
      if (response.code === 0) {
         ElMessage.success('删除成功');
         loadData();
      }
   } catch (error) {
      if (error !== 'cancel') {
         console.error('删除失败:', error);
      }
   }
};

const handleSelectionChange = (selection: Dynamic[]) => {
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

const getStatusType = (status: number) => {
   const statusMap = {
      0: 'info', // 草稿
      1: 'success', // 已发布
      2: 'danger' // 已删除
   };
   return statusMap[status] || 'info';
};

const getStatusText = (status: number) => {
   const statusMap = {
      0: '草稿',
      1: '已发布',
      2: '已删除'
   };
   return statusMap[status] || '未知';
};

const formatDate = (dateString: string) => {
   return new Date(dateString).toLocaleString('zh-CN');
};

const parseImgs = (imgarr: string): string[] => {
   try {
      const parsed = JSON.parse(imgarr);
      return Array.isArray(parsed) ? parsed : [];
   } catch {
      return [];
   }
};

// 生命周期
onMounted(() => {
   datatinit();
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
