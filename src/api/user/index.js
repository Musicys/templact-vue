import { httpPost, httpGet } from '../../util/http';

/**
 * @description 用户登录
 *
 */

export const login = data => {
   return httpPost('/user/login', data);
};

/**
 * @description 获取用户登录信息
 *
 */

export const getlogin = data => {
   return httpGet('/user/login', data);
};
