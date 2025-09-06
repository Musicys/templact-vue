export interface AdminLogin {
   userAccount: string;
   userPassword: string;
}

export interface Admin {
   id: number;
   username: string;
   useraccount: string;
   avatarurl: string;
   gender: number; // 0: 女, 1: 男
   email: string | null;
   userrole: number; // 1: admin, 0: user
   userstatus: number; // 0: 禁用, 1: 正常
   login: number; // 0: 未登录, 1: 已登录
   createtime: string; // ISO 时间字符串
   updatetime: string;
}
