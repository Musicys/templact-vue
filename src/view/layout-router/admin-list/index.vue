<template>
   <!-- 搜索表单 -->
   <el-card class="mb-2 shadow-sm">
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
            <el-input v-model="searchForm.useraccount" placeholder="请输入账号" clearable class="w-48" />
         </el-form-item>

         <el-form-item label="角色" class="mb-4 w-48">
            <el-select v-model="searchForm.userrole" placeholder="请选择角色" clearable>
               <el-option label="普通用户" :value="0" />
               <el-option label="管理员" :value="1" />
            </el-select>
         </el-form-item>

         <el-form-item label="状态" class="mb-4 w-48">
            <el-select v-model="searchForm.userstatus" placeholder="请选择状态" clearable>
               <el-option label="正常" :value="0" />
               <el-option label="禁用" :value="1" />
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
         <el-button type="primary" @click="handleAdd" class="bg-blue-500 hover:bg-blue-600">
            <el-icon class="mr-1"><Plus /></el-icon>
            添加管理员
         </el-button>
      </template>

      <el-table
         :data="tableData"
         v-loading="loading"
         stripe
         class="w-full"
         @sort-change="sortchange"
         @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column prop="id" label="ID" sortable="id" width="80" />

         <el-table-column label="头像" width="80">
            <template #default="{ row }">
               <el-avatar :src="row.avatarurl" :size="40" class="border border-gray-200">
                  {{ row.username?.charAt(0) }}
               </el-avatar>
            </template>
         </el-table-column>

         <el-table-column prop="username" label="用户名" min-width="120" />
         <el-table-column prop="useraccount" label="账号" min-width="120" />

         <el-table-column label="性别" sortable="gender" width="80">
            <template #default="{ row }">
               <el-tag :type="row.gender === 1 ? 'success' : 'info'" size="small">
                  {{ row.gender === 1 ? '男' : '女' }}
               </el-tag>
            </template>
         </el-table-column>

         <el-table-column prop="email" label="邮箱" min-width="180" />

         <el-table-column label="角色" sortable="userRole" min-width="150">
            <template #default="{ row }">
               <el-tag :type="row.userrole === 1 ? 'danger' : 'primary'" size="small">
                  {{ row.userrole === 1 ? '管理员' : '普通用户' }}
               </el-tag>
            </template>
         </el-table-column>

         <el-table-column label="状态" sortable="userStatus" width="100">
            <template #default="{ row }">
               <el-tag :type="row.userstatus === 0 ? 'success' : 'danger'" size="small">
                  {{ row.userstatus === 0 ? '正常' : '禁用' }}
               </el-tag>
            </template>
         </el-table-column>

         <el-table-column prop="createtime" sortable="createtime" label="创建时间" width="180">
            <template #default="{ row }">
               {{ formatDate(row.createtime) }}
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

   <!-- 添加/编辑对话框 -->
   <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" class="px-4">
         <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
         </el-form-item>

         <el-form-item label="账号" prop="useraccount">
            <el-input v-model="formData.useraccount" placeholder="请输入账号" />
         </el-form-item>

         <el-form-item label="密码" prop="userpassword">
            <el-input v-model="formData.userpassword" type="password" placeholder="请输入密码" show-password />
         </el-form-item>

         <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
         </el-form-item>

         <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="formData.gender">
               <el-radio :label="1">男</el-radio>
               <el-radio :label="0">女</el-radio>
            </el-radio-group>
         </el-form-item>

         <el-form-item label="角色" prop="userrole">
            <el-select v-model="formData.userrole" placeholder="请选择角色" class="w-full">
               <el-option label="普通用户" :value="0" />
               <el-option label="管理员" :value="1" />
            </el-select>
         </el-form-item>

         <el-form-item label="状态" prop="userstatus">
            <el-select v-model="formData.userstatus" placeholder="请选择状态" class="w-full">
               <el-option label="禁用" :value="0" />
               <el-option label="正常" :value="1" />
            </el-select>
         </el-form-item>
      </el-form>

      <template #footer>
         <div class="flex justify-end gap-3">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading"> 确定 </el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue';
import { AdminList, AdminAdd, AdminEdit, AdminDel } from '@/api/amdin';
import type { Admin, ListAdminRequest, PostaddAdmin, EditdAdmin } from '@/api/amdin/model/type';

// 响应式数据
const loading = ref(false);
const submitLoading = ref(false);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const formRef = ref<FormInstance>();
const selectedRows = ref<Admin[]>([]);

// 搜索表单
const searchForm = reactive<ListAdminRequest>({
   username: '',
   useraccount: '',
   userrole: undefined,
   userstatus: undefined,
   sortField: undefined,
   sortOrder: 'ascend'
});

// 表格数据
const tableData = ref<Admin[]>([]);
const total = ref(0);

// 分页
const pagination = reactive({
   current: 1,
   pageSize: 5
});

// 表单数据
const formData = reactive<PostaddAdmin | EditdAdmin>({
   username: '',
   useraccount: '',
   userpassword: '',
   email: '',
   gender: 1,
   userrole: 0,
   userstatus: 1
});

// 表单验证规则
const formRules: FormRules = {
   username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
   ],
   useraccount: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 3, max: 20, message: '账号长度在 3 到 20 个字符', trigger: 'blur' }
   ],
   userpassword: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
   ],
   email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
   userrole: [{ required: true, message: '请选择角色', trigger: 'change' }],
   userstatus: [{ required: true, message: '请选择状态', trigger: 'change' }]
};

// 计算属性
const isEdit = computed(() => 'id' in formData);

// 方法
const loadData = async () => {
   loading.value = true;
   try {
      const params: ListAdminRequest = {
         current: pagination.current,
         pageSize: pagination.pageSize,
         ...searchForm
      };

      const response = (await AdminList(params)) as any;
      if (response?.code === 0) {
         tableData.value = response.data.records;
         total.value = response.data.total;
      }
   } catch (error) {
      console.error('加载数据失败:', error);
   } finally {
      loading.value = false;
   }
};

const sortchange = e => {
   if (e.order) {
      searchForm.sortField = e.column.sortable;

      switch (e.order) {
         case 'ascending':
            searchForm.sortOrder = 'ascend';
            break;
         case 'descending':
            searchForm.sortOrder = 'descend';
            break;
         default:
            searchForm.sortField = undefined;
            searchForm.sortOrder = undefined;
      }
   } else {
      searchForm.sortField = undefined;
   }
   loadData();
};

const handleSearch = () => {
   pagination.current = 1;
   loadData();
};

const handleReset = () => {
   Object.assign(searchForm, {
      username: '',
      useraccount: '',
      userrole: undefined,
      userstatus: undefined
   });
   handleSearch();
};

const handleAdd = () => {
   dialogTitle.value = '添加管理员';
   Object.assign(formData, {
      username: '',
      useraccount: '',
      userpassword: '',
      email: '',
      gender: 1,
      userrole: 0,
      userstatus: 1
   });
   dialogVisible.value = true;
};

const handleEdit = (row: Admin) => {
   dialogTitle.value = '编辑管理员';
   Object.assign(formData, {
      id: row.id,
      username: row.username,
      useraccount: row.useraccount,
      userpassword: '',
      email: row.email || '',
      gender: row.gender,
      userrole: row.userrole,
      userstatus: row.userstatus
   });
   dialogVisible.value = true;
};

const handleDelete = async (row: Admin) => {
   try {
      await ElMessageBox.confirm(`确定要删除管理员 "${row.username}" 吗？`, '确认删除', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      });

      const response = (await AdminDel(row.id)) as any;
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

const handleSubmit = async () => {
   if (!formRef.value) return;

   try {
      await formRef.value.validate();
      submitLoading.value = true;

      let response;
      if (isEdit.value) {
         response = await AdminEdit(formData as EditdAdmin);
      } else {
         response = await AdminAdd(formData as PostaddAdmin);
      }

      if (response.code === 0) {
         ElMessage.success(isEdit.value ? '编辑成功' : '添加成功');
         dialogVisible.value = false;
         loadData();
      }
   } catch (error) {
      console.error('提交失败:', error);
   } finally {
      submitLoading.value = false;
   }
};

const handleSelectionChange = (selection: Admin[]) => {
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
