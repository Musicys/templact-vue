export interface User {
   id: number;
   username: string;
   userAccount: string;
   avatarUrl: string;
   gender: number; // 0: 女, 1: 男
   email: string | null;
   userStatus: number; // 0: 正常, 1: 封禁
   createTime: string; // ISO 时间字符串
   updateTime: string;
}

export interface ListUserRequest {
   current: number;
   pageSize: number;
   username?: string;
   userAccount?: string;
   gender?: number;
   userStatus?: number;
   sortField?: string;
   sortOrder?: 'ascend' | 'descend';
}

export interface Page<T> {
   records: T[];
   total: number;
   size: number;
   current: number;
   pages: number;
}
