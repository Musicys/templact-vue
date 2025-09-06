import { httpGet, httpPost } from '@/util/http';
import { AdminLogin } from './model/type';
/**
 * @description 用户登录
 *
 */

export const AdminLogin = (data: AdminLogin) => {
   return httpPost('/api/admin/login', data);
};

/**
 * @description 用户注销
 *
 */

export const AdminOff = () => {
   return httpGet('/api/admin/LoginOff');
};

/**
 * @description 检测是否登录
 *
 */

export const getAdminInfo = () => {
   return httpGet('/api/admin/getAdminInfo');
};
