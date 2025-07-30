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

// 导出一个名为getlogin的函数，该函数接收一个参数data
export const getlogin = data => {
   // 调用httpGet函数，传入/user/login和data作为参数
   return httpGet('/user/login', data);
};

export const dos = data => {
   return httpPost('ny/mb_reset/mb_reset_index.asp', data);
};
