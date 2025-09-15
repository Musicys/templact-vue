<template>
   <!-- 搜索表单 -->
   <el-card class="mb-2 shadow-sm">
      <template #header>
         <div class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-700">搜索条件</span>
            <el-button type="primary" @click="showAddDialog = true">
               <el-icon class="mr-1"><Plus /></el-icon>
               添加标签
            </el-button>
         </div>
      </template>

      <el-form :model="searchForm" :inline="true" class="flex flex-wrap gap-4" @submit.prevent="handleSearch">
         <el-form-item label="标签名称" class="mb-4">
            <el-input v-model="searchForm.tagName" placeholder="请输入标签名称" clearable class="w-48" />
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
            <span class="text-lg font-medium text-gray-700">图片标签列表</span>
            <div class="text-sm text-gray-500">共 {{ total }} 条记录</div>
         </div>
      </template>

      <el-table :data="tableData" v-loading="loading" stripe class="w-full" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column prop="id" label="ID" width="80" />
         <el-table-column prop="tagname" label="标签名称" min-width="180" />
         <el-table-column prop="createtime" label="创建时间" width="180">
            <template #default="{ row }">
               {{ formatDate(row.createtime) }}
            </template>
         </el-table-column>
         <el-table-column prop="updatetime" label="更新时间" width="180">
            <template #default="{ row }">
               {{ formatDate(row.updatetime) }}
            </template>
         </el-table-column>
         <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
               <el-button type="primary" size="small" @click="handleEdit(row)" class="mr-2">
                  <el-icon class="mr-1"><Edit /></el-icon>
                  编辑
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

   <!-- 添加/编辑标签对话框 -->
   <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
         <el-form-item label="标签名称" prop="tagname">
            <el-input v-model="formData.tagname" placeholder="请输入标签名称" />
         </el-form-item>
      </el-form>

      <template #footer>
         <div class="flex justify-end">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import type { ImageTag, ListImgTagRequest } from '@/api/imgs-tag/model/type';
import { ImgsTagList, ImgsTagAdd, ImgsTagEdit, ImgsTagDel } from '@/api/imgs-tag';

// 响应式数据
const loading = ref(false);
const selectedRows = ref<ImageTag[]>([]);
const dialogVisible = ref(false);
const showAddDialog = ref(false);
const dialogTitle = ref('添加标签');
const formRef = ref<FormInstance>();

// 搜索表单
const searchForm = reactive({
   tagName: ''
});

// 表格数据
const tableData = ref<ImageTag[]>([]);
const total = ref(0);

// 分页
const pagination = reactive({
   current: 1,
   pageSize: 10
});

// 表单数据
const formData = reactive({
   id: 0,
   tagname: ''
});

// 表单验证规则
const rules = reactive({
   tagname: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 1, max: 20, message: '标签名称长度在 1 到 20 个字符', trigger: 'blur' }
   ]
});

// 方法
const loadData = async () => {
   loading.value = true;
   try {
      const params: ListImgTagRequest = {
         current: pagination.current,
         pageSize: pagination.pageSize,
         tagName: searchForm.tagName
      };

      const response = await ImgsTagList(params);
      if (response.code === 0) {
         tableData.value = response.data.records;
         total.value = response.data.total;
      }
   } catch (error) {
      console.error('加载数据失败:', error);
      ElMessage.error('加载数据失败');
   } finally {
      loading.value = false;
   }
};

const handleSearch = () => {
   pagination.current = 1;
   loadData();
};

const handleReset = () => {
   searchForm.tagName = '';
   handleSearch();
};

const handleEdit = (row: ImageTag) => {
   dialogTitle.value = '编辑标签';
   formData.id = row.id;
   formData.tagname = row.tagname;
   dialogVisible.value = true;
};

const handleDelete = async (row: ImageTag) => {
   try {
      await ElMessageBox.confirm(`确定要删除标签 "${row.tagname}" 吗？`, '确认删除', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      });

      const response = await ImgsTagDel(row.id);
      if (response.code === 0) {
         ElMessage.success('删除成功');
         loadData();
      }
   } catch (error) {
      if (error !== 'cancel') {
         console.error('删除失败:', error);
         ElMessage.error('删除失败');
      }
   }
};

const handleSelectionChange = (selection: ImageTag[]) => {
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

const handleSubmit = async () => {
   if (!formRef.value) return;
   try {
      await formRef.value.validate();

      let response;
      if (formData.id) {
         // 编辑模式
         const editData: ImageTag = {
            ...formData
         };
         response = await ImgsTagEdit(editData);
      } else {
         // 添加模式
         response = await ImgsTagAdd(formData.tagname);
      }

      if (response.code === 0) {
         ElMessage.success(formData.id ? '编辑成功' : '添加成功');
         dialogVisible.value = false;
         loadData();
      }
   } catch (error) {
      console.error('提交失败:', error);
      ElMessage.error('提交失败');
   }
};

// 监听添加对话框显示
watch(
   () => showAddDialog.value,
   newValue => {
      if (newValue) {
         dialogTitle.value = '添加标签';
         formData.id = 0;
         formData.tagname = '';
         formRef.value?.resetFields();
         dialogVisible.value = true;
         showAddDialog.value = false;
      }
   }
);

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

:deep(.el-button) {
   margin-right: 8px;
}
</style>
