export interface Dynamic {
   id: number;
   title: string;
   content: string;
   authorId: number;
   authorName: string;
   status: number; // 0: 草稿, 1: 已发布, 2: 已删除
   viewCount: number;
   likeCount: number;
   commentCount: number;
   createTime: string; // ISO 时间字符串
   updateTime: string;
   publishTime?: string; // 发布时间（可选）
}

export interface ListDynamicRequest {
   current: number;
   pageSize: number;
   title?: string;
   authorName?: string;
   status?: number;
   startTime?: string;
   endTime?: string;
}

export interface Page<T> {
   records: T[];
   total: number;
   size: number;
   current: number;
   pages: number;
}
