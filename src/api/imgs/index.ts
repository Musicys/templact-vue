import { httpPost } from '@/util/http';
import { ListImgRequest } from './model/type';

/**
 * @description 图片列表
 */
export const ImgsList = (data: ListImgRequest) => {
   return httpPost('/api/admin/ImgsList', data);
};

/**
 * @description 删除图片
 */
export const ImgDel = (list: [string]) => {
   return httpPost(`/api/admin/ImgDel`, list);
};

/**
 * @description 上传图片
 */
export const ImgUpload = data => {
   return httpPost('/api/admin/ImgUpload', data, true);
};
