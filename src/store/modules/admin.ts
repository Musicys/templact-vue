import { Admin } from '@/api/user/model/type';
import { defineStore } from 'pinia'; /*  */
import { ref } from 'vue';

export const adminStore = defineStore(
   'admin',
   () => {
      const userinfo = ref({
         login: 'NO_LOGIN'
      });

      const setUserInfo = (data: Admin) => {
         userinfo.value = data;
      };
      return {
         userinfo,
         setUserInfo
      };
   },
   {
      persist: {
         key: 'admin-store',
         storage: localStorage,
         paths: ['userinfo'] // 只持久化 userinfo
      }
   }
);
/*  */
//存

// 不F5
