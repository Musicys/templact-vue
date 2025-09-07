import { httpPost, httpDelete } from '@/util/http';
import { ListDynamicRequest, Page, Dynamic } from './model/type';

/**
 * @description 动态列表
 */
export const DynamicList = (data: ListDynamicRequest) => {
   return httpPost<Page<Dynamic>>('/api/admin/DynamicList', data);
};

/**
 * @description 删除动态
 */
export const DynamicDel = (id: number) => {
   return httpDelete<string>(`/api/admin/DynamicDel?id=${id}`);
};
