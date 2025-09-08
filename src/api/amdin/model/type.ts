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

export interface ListAdminRequest {
   current: number;
   pageSize: number;
   username?: string;
   useraccount?: string;
   userrole?: number;
   userstatus?: number;
   sortField?: string;
   sortOrder?: 'ascend' | 'descend';
}

export interface PostaddAdmin {
   username: string;
   useraccount: string;
   userpassword: string;
   avatarurl?: string;
   gender?: number;
   email?: string;
   userrole: number;
   userstatus?: number;
}

export interface EditdAdmin {
   id: number;
   username?: string;
   useraccount?: string;
   userpassword?: string;
   avatarurl?: string;
   gender?: number;
   email?: string;
   userrole?: number;
   userstatus?: number;
}

export interface Page<T> {
   records: T[];
   total: number;
   size: number;
   current: number;
   pages: number;
}
