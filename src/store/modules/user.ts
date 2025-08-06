import { defineStore } from 'pinia'; /*  */
import { ref } from 'vue';
interface UserInfo {
   login: string;
   name?: string;
   age?: number;
   sex?: string;
}

export const useStore = defineStore('x', () => {
   const userinfo = ref<UserInfo>({
      login: 'NO_LOGIN'
   });

   const setUserInfo = () => {
      userinfo.value = {
         login: 'YES_LOGIN',
         name: '张三',
         age: 18,
         sex: '男'
      };
   };
   return {
      userinfo,
      setUserInfo
   };
});
/*  */
//存

// 不F5
