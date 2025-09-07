import { httpGet, httpPost } from '@/util/http';
import { ListUserRequest } from './model/type';

/**
 * @description 用户列表
 */
export const UserList = (data: ListUserRequest) => {
   return httpPost('/api/admin/UserList', data);
};

/**
 * @description 封禁用户
 */
export const UserBanned = (id: number) => {
   return httpGet(`/api/admin/UserBanned?id=${id}`);
};

/**
 * @description 解封用户
 */
export const UserLiberate = (id: number) => {
   return httpGet(`/api/admin/UserLiberate?id=${id}`);
};
