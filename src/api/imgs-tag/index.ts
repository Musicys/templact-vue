import { ListImgTagRequest, ImageTag } from './model/type';
import { httpGet, httpPost } from '@/util/http';

/**
 * @description 图片标签列表
 */
export const ImgsTagList = (data: ListImgTagRequest) => {
   return httpPost('/api/admin/ImageTagList', data);
};

/**
 * @description 图片标签修改
 */
export const ImgsTagEdit = (data: ImageTag) => {
   return httpPost('/api/admin/ImageTagEdit', data);
};

/**
 * @description 图片标签添加
 */
export const ImgsTagAdd = (tagName: string) => {
   return httpGet('/api/admin/ImageTagAdd?tagName=' + tagName);
};

/**
 * @description 图片标签删除
 */

export const ImgsTagDel = (id: number) => {
   return httpGet('/api/admin/ImageTagDel?id=' + id);
};
