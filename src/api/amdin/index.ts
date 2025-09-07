import { httpPost, httpDelete, httpPut } from '@/util/http';
import { ListAdminRequest, PostaddAdmin, EditdAdmin } from './model/type';

/**
 * @description 管理员列表
 */
export const AdminList = (data: ListAdminRequest) => {
   return httpPost('/api/admin/AdminList', data);
};

/**
 * @description 管理员添加
 */
export const AdminAdd = (data: PostaddAdmin) => {
   return httpPost('/api/admin/AdminAdd', data);
};

/**
 * @description 管理员修改
 */
export const AdminEdit = (data: EditdAdmin) => {
   return httpPut('/api/admin/AdminEdit', data);
};

/**
 * @description 管理员删除
 */
export const AdminDel = (id: number) => {
   return httpDelete(`/api/admin/AdminDel?id=${id}`);
};
