import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';

let loadingInstance = null;

// 可选：自定义 loading 效果
const loadingOptions = {
   lock: true,
   text: '加载中...',
   spinner: 'el-icon-loading',
   background: 'rgba(0, 0, 0, 0.7)'
};

const instance = axios.create({
   baseURL: '/api',
   timeout: 100000000000000000 // 建议改为合理的值，如 10000（10秒）
});

// 请求拦截器
instance.interceptors.request.use(
   config => {
      // 显示 loading
      loadingInstance = ElLoading.service(loadingOptions);

      // 示例：携带 token（可选）
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      // if(config.)

      return config;
   },
   error => {
      return Promise.reject(error);
   }
);

// 响应拦截器
instance.interceptors.response.use(
   response => {
      // 关闭 loading
      if (loadingInstance) {
         loadingInstance.close();
      }

      if (response.data.code != 0) {
         console.log(response.data);

         ElMessage.error(response.data?.message || response.data?.data || '网络错误');
      }

      return response.data; // 直接返回 data
   },
   error => {
      // 关闭 loading（避免请求失败时 loading 一直存在）
      if (loadingInstance) {
         loadingInstance.close();
      }

      // 错误提示
      const msg = error.response?.data?.message || error.message || '请求失败';
      ElMessage.error(msg);

      return Promise.reject(error);
   }
);

/**
 *
 * @param {*} url 地址
 * @param {*} query 请求参数
 * @returns Promise
 */

export const httpGet = (url, query) => {
   return instance.get(url, query);
};

/**
 *
 * @param {*} url 地址
 * @param {*} data 参数
 * @param {*} file 是否是上传文件默认是否
 * @returns Promise
 */
export const httpPost = (url, data, file = false) => {
   if (file) {
      return instance.post(url, data, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
   }
   return instance.post(url, data);
};
