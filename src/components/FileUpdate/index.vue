<template>
   <el-dialog v-model="dialogVisible" title="图片管理" width="900px" height="600px" @close="handleClose">
      <div class="file-update-container">
         <div class="header">
            <div class="search-upload">
               <el-input
                  v-model="searchForm.title"
                  placeholder="请输入图片标题"
                  class="search-input"
                  @keyup.enter="handleSearch">
                  <template #append>
                     <el-button @click="handleSearch" icon="Search" type="primary" />
                  </template>
               </el-input>
               <div class="button-group">
                  <el-upload
                     class="upload-btn"
                     :before-upload="beforeUpload"
                     :on-success="handleUploadSuccess"
                     :on-error="handleUploadError"
                     :show-file-list="false"
                     action=""
                     :http-request="customUpload">
                     <el-button type="success" icon="Plus">添加</el-button>
                  </el-upload>
                  <el-button
                     type="danger"
                     icon="Delete"
                     :disabled="selectedImages.length === 0"
                     @click="handleBatchDelete"
                     >删除</el-button
                  >
                  <el-button
                     type="primary"
                     icon="Check"
                     :disabled="selectedImages.length !== 1"
                     @click="handleConfirmSelect"
                     >选中</el-button
                  >
               </div>
            </div>
         </div>

         <div class="main-content">
            <!-- 左侧标签菜单 -->
            <div class="tag-menu">
               <div class="tag-menu-header">
                  <h3>图片标签</h3>
                  <el-input
                     v-model="newTagName"
                     placeholder="输入新标签"
                     size="small"
                     class="new-tag-input"
                     @keyup.enter="handleAddTag">
                     <template #append>
                        <el-button @click="handleAddTag" size="small" type="primary" icon="Plus" />
                     </template>
                  </el-input>
               </div>
               <div class="tag-list">
                  <div
                     v-for="tag in tagList"
                     :key="tag.id"
                     class="tag-item"
                     :class="{ active: selectedTagId === tag.id }"
                     @click="handleTagClick(tag)">
                     <span>{{ tag.tagname }}</span>
                     <el-button
                        size="small"
                        type="text"
                        class="delete-tag-btn"
                        icon="Delete"
                        @click.stop="handleDeleteTag(tag.id)">
                     </el-button>
                  </div>
                  <div
                     v-if="tagList.length > 0"
                     class="tag-item all-tags"
                     :class="{ active: selectedTagId === null }"
                     @click="handleAllTagsClick">
                     全部图片
                  </div>
               </div>
            </div>

            <!-- 右侧图片列表 -->
            <div class="image-content">
               <div class="image-list">
                  <div
                     v-for="(image, index) in imageList"
                     :key="image.id || index"
                     class="image-item"
                     :class="{ selected: selectedImages.includes(image.delname) }"
                     @click="handleImageClick(image)">
                     <div class="image-wrapper">
                        <img :src="image.url" :alt="image.title" />
                        <div class="image-checkbox" v-if="selectedImages.includes(image.delname)">
                           <el-icon><Check /></el-icon>
                        </div>
                     </div>
                     <div class="image-info">
                        <p class="image-title">{{ image.title }}</p>
                        <p class="image-size">{{ formatSize(image.size) }}</p>
                     </div>
                  </div>
                  <div v-if="imageList.length === 0" class="empty-state">
                     <el-empty description="暂无图片" />
                  </div>
               </div>

               <div class="pagination">
                  <el-pagination
                     v-model:current-page="pagination.current"
                     v-model:page-size="pagination.pageSize"
                     :page-sizes="[10, 20, 50, 100]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
               </div>
            </div>
         </div>
      </div>
   </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ElMessage, ElDialog, ElEmpty } from 'element-plus';
import { Check } from '@element-plus/icons-vue';
import { ImgsList, ImgDel, ImgUpload } from '@/api/imgs';
import { ImgsTagList, ImgsTagAdd, ImgsTagDel } from '@/api/imgs-tag';
import type { Img, ListImgRequest } from '@/api/imgs/model/type';
import type { ImageTag } from '@/api/imgs-tag/model/type';

// Props
const props = defineProps<{
   visible?: boolean;
}>();

// emit
const emit = defineEmits<{
   'update:visible': (value: boolean) => void;
   select: (image: Img) => void;
   close: () => void;
}>();

// Dialog visible state
const dialogVisible = ref(false);

// 搜索表单
const searchForm = ref<ListImgRequest>({
   current: 1,
   pageSize: 10,
   title: '',
   tagId: null
});

// 标签列表
const tagList = ref<ImageTag[]>([]);

// 选中的标签ID
const selectedTagId = ref<number | null>(null);

// 新标签名称
const newTagName = ref('');

// 图片列表
const imageList = ref<Img[]>([]);

// 选中的图片
const selectedImages = ref<string[]>([]);

// 分页信息
const pagination = ref({
   current: 1,
   pageSize: 10,
   total: 0
});

// Watch for visible prop changes
watch(
   () => props.visible,
   newVal => {
      dialogVisible.value = newVal || false;
   }
);

// Watch for dialogVisible changes
watch(dialogVisible, newVal => {
   emit('update:visible', newVal);
});

// 加载标签列表
const loadTagList = async () => {
   try {
      const response = await ImgsTagList({
         current: 1,
         pageSize: 100,
         tagName: ''
      });

      if (response.code === 0 && response.data) {
         tagList.value = response.data.records || [];
      }
   } catch (error) {
      ElMessage.error('获取标签列表失败');
      console.error('获取标签列表失败:', error);
   }
};

// 加载图片列表
const loadImageList = async () => {
   try {
      const requestParams = {
         current: searchForm.value.current,
         pageSize: searchForm.value.pageSize,
         title: searchForm.value.title
      };

      // 如果有选中的标签，添加标签筛选条件
      if (selectedTagId.value !== null) {
         requestParams['tagId'] = selectedTagId.value;
      }

      const response = await ImgsList(requestParams);

      if (response.code === 0 && response.data) {
         imageList.value = response.data.records || [];
         pagination.value.total = response.data.total || 0;
      }
   } catch (error) {
      ElMessage.error('获取图片列表失败');
      console.error('获取图片列表失败:', error);
   }
};

// 处理标签点击
const handleTagClick = (tag: ImageTag) => {
   selectedTagId.value = tag.id;
   searchForm.value.current = 1;
   loadImageList();
};

// 处理全部图片点击
const handleAllTagsClick = () => {
   selectedTagId.value = null;
   searchForm.value.current = 1;
   loadImageList();
};

// 添加标签
const handleAddTag = async () => {
   const tagName = newTagName.value.trim();
   if (!tagName) {
      ElMessage.warning('请输入标签名称');
      return;
   }

   try {
      const response = await ImgsTagAdd(tagName);
      if (response.code === 0) {
         ElMessage.success('标签添加成功');
         newTagName.value = '';
         await loadTagList();
      }
   } catch (error) {
      ElMessage.error('标签添加失败');
      console.error('添加标签失败:', error);
   }
};

// 删除标签
const handleDeleteTag = async (tagId: number) => {
   try {
      const response = await ImgsTagDel(tagId);
      if (response.code === 0) {
         ElMessage.success('标签删除成功');
         // 如果删除的是当前选中的标签，重置筛选条件
         if (selectedTagId.value === tagId) {
            selectedTagId.value = null;
            searchForm.value.current = 1;
         }
         await loadTagList();
         await loadImageList();
      }
   } catch (error) {
      ElMessage.error('标签删除失败');
      console.error('删除标签失败:', error);
   }
};

// 处理搜索
const handleSearch = () => {
   searchForm.value.current = 1;
   loadImageList();
};

// 处理分页大小变化
const handleSizeChange = (size: number) => {
   searchForm.value.pageSize = size;
   loadImageList();
};

// 处理当前页码变化
const handleCurrentChange = (current: number) => {
   searchForm.value.current = current;
   loadImageList();
};

// 自定义上传
const customUpload = async (options: any) => {
   const { file } = options;
   const formData = new FormData();
   formData.append('file', file);
   formData.append('tagId', selectedTagId.value);
   try {
      const response = await ImgUpload(formData);
      if (response.code === 0) {
         options.onSuccess(response);
         ElMessage.success('上传成功');
         loadImageList(); // 重新加载图片列表
      } else {
         options.onError(response);
      }
   } catch (error) {
      options.onError(error);
   }
};

// 上传前校验
const beforeUpload = (file: File) => {
   const isImage = /^image\//.test(file.type);
   if (!isImage) {
      ElMessage.error('只能上传图片文件');
      return false;
   }

   const isLt10M = file.size / 1024 / 1024 < 10;
   if (!isLt10M) {
      ElMessage.error('图片大小不能超过 10MB');
      return false;
   }

   return true;
};

// 上传成功处理
const handleUploadSuccess = () => {
   // 上传成功已在customUpload中处理
};

// 上传失败处理
const handleUploadError = () => {
   ElMessage.error('上传失败');
};

// 批量删除图片
const handleBatchDelete = async () => {
   if (selectedImages.value.length === 0) {
      ElMessage.warning('请先选择要删除的图片');
      return;
   }

   try {
      // 使用delname数组调用删除API
      const response = await ImgDel(selectedImages.value);
      if (response.code === 0) {
         ElMessage.success('删除成功');
         loadImageList(); // 重新加载图片列表
         selectedImages.value = []; // 清空选中状态
      } else {
         ElMessage.error('删除失败');
      }
   } catch (error) {
      ElMessage.error('删除失败');
      console.error('删除图片失败:', error);
   }
};

// 点击图片
const handleImageClick = (image: Img) => {
   // 切换选中状态
   const index = selectedImages.value.indexOf(image.delname);
   if (index > -1) {
      selectedImages.value.splice(index, 1);
   } else {
      selectedImages.value.push(image.delname);
   }
};

// 确认选中图片
const handleConfirmSelect = () => {
   if (selectedImages.value.length !== 1) {
      ElMessage.warning('请选择一张图片');
      return;
   }

   // 查找选中的图片对象
   const selectedImage = imageList.value.find(img => img.delname === selectedImages.value[0]);
   if (selectedImage) {
      // 触发选中事件并传递图片对象
      emit('select', selectedImage);
      // 关闭弹窗
      dialogVisible.value = false;
      // 清空选中状态
      selectedImages.value = [];
   }
};

// 关闭弹窗
const handleClose = () => {
   // 清空选中状态
   selectedImages.value = [];
   // 触发关闭事件
   emit('close');
};

// 格式化文件大小
const formatSize = (bytes: number) => {
   if (bytes === 0) return '0 Bytes';

   const k = 1024;
   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 组件挂载时加载数据
onMounted(() => {
   loadTagList();
   loadImageList();
});

// 监听visible变化，重新加载数据
watch(
   () => props.visible,
   newVal => {
      dialogVisible.value = newVal || false;
      if (newVal) {
         // 重新打开时刷新数据
         loadTagList();
         loadImageList();
      }
   }
);
</script>

<style lang="scss" scoped>
.file-update-container {
   height: 100%;
   display: flex;
   flex-direction: column;
   padding: 10px;
}

.header {
   margin-bottom: 16px;
}

.search-upload {
   display: flex;
   gap: 16px;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
}

.search-input {
   width: 300px;
   flex-shrink: 0;
}

.button-group {
   display: flex;
   gap: 10px;
}

.main-content {
   display: flex;
   gap: 16px;
   flex: 1;
   overflow: hidden;
}

// 左侧标签菜单样式
.tag-menu {
   width: 200px;
   border: 1px solid #e4e7ed;
   border-radius: 4px;
   background: #fff;
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

.tag-menu-header {
   padding: 16px;
   border-bottom: 1px solid #e4e7ed;
}

.tag-menu-header h3 {
   margin: 0 0 12px 0;
   font-size: 16px;
   font-weight: 500;
   color: #303133;
}

.new-tag-input {
   width: 100%;
}

.tag-list {
   flex: 1;
   overflow-y: auto;
   padding: 8px;
}

.tag-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 8px 12px;
   margin-bottom: 4px;
   border-radius: 4px;
   cursor: pointer;
   transition: all 0.3s;
   font-size: 14px;
}

.tag-item:hover {
   background-color: #f5f7fa;
}

.tag-item.active {
   background-color: #ecf5ff;
   color: #409eff;
   border: 1px solid #c6e2ff;
}

.tag-item.all-tags {
   border-top: 1px solid #e4e7ed;
   margin-top: 8px;
   padding-top: 12px;
   margin-bottom: 0;
}

.delete-tag-btn {
   opacity: 0;
   transition: opacity 0.3s;
}

.tag-item:hover .delete-tag-btn {
   opacity: 1;
}

// 右侧图片内容样式
.image-content {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

.image-list {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
   gap: 16px;
   flex: 1;
   overflow-y: auto;
   padding: 10px;
   border: 1px solid #e4e7ed;
   border-radius: 4px;
   background: #fff;
}

.empty-state {
   grid-column: 1 / -1;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 200px;
}

.image-item {
   border: 2px solid #e4e7ed;
   border-radius: 6px;
   padding: 10px;
   cursor: pointer;
   transition: all 0.3s;
   background: #fff;
}

.image-item:hover {
   border-color: #409eff;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   transform: translateY(-2px);
}

.image-item.selected {
   border-color: #409eff;
   background-color: #ecf5ff;
}

.image-wrapper {
   position: relative;
   width: 100%;
   height: 120px;
   margin-bottom: 10px;
   overflow: hidden;
   border-radius: 4px;
   background: #f5f7fa;
}

.image-wrapper img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: transform 0.3s;
}

.image-item:hover img {
   transform: scale(1.05);
}

.image-checkbox {
   position: absolute;
   top: 8px;
   right: 8px;
   width: 20px;
   height: 20px;
   background: rgba(255, 255, 255, 0.9);
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #409eff;
   font-size: 14px;
}

.image-info {
   text-align: center;
}

.image-title {
   font-size: 14px;
   margin-bottom: 5px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   font-weight: 500;
}

.image-size {
   font-size: 12px;
   color: #909399;
}

.pagination {
   display: flex;
   justify-content: flex-end;
   margin-top: 16px;
   padding: 10px 0;
   border-top: 1px solid #e4e7ed;
}

// 自定义滚动条样式
.image-list::-webkit-scrollbar,
.tag-list::-webkit-scrollbar {
   width: 8px;
   height: 8px;
}

.image-list::-webkit-scrollbar-track,
.tag-list::-webkit-scrollbar-track {
   background: #f1f1f1;
   border-radius: 4px;
}

.image-list::-webkit-scrollbar-thumb,
.tag-list::-webkit-scrollbar-thumb {
   background: #c0c4cc;
   border-radius: 4px;
}

.image-list::-webkit-scrollbar-thumb:hover,
.tag-list::-webkit-scrollbar-thumb:hover {
   background: #909399;
}

// 适配不同屏幕宽度
@media (max-width: 1024px) {
   .tag-menu {
      width: 180px;
   }
}

@media (max-width: 768px) {
   .search-upload {
      flex-direction: column;
      align-items: stretch;
   }

   .search-input {
      width: 100%;
   }

   .button-group {
      justify-content: center;
   }

   .main-content {
      flex-direction: column;
   }

   .tag-menu {
      width: 100%;
      max-height: 200px;
   }

   .image-list {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
   }
}
</style>
