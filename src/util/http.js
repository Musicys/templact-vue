import axios from 'axios';

const instance = axios.create({
   baseURL: 'api/',
   timeout: 100000000000000000
});
instance.interceptors.request.use(
   config => {
      // 在发送请求前进行处理，例如添加 token
      return config;
   },
   error => {
      return Promise.reject(error);
   }
);

// 响应拦截器
instance.interceptors.response.use(
   response => {
      return response.data;
   },
   error => {
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
