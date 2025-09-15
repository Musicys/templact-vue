export interface Img {
   id: number;
   title: string;
   url: string;
   userid: number;
   width: number;
   height: number;
   size: number;
   type: string;
   createtime: string;
   updatetime: string;
   delname: string;
   isdelete: number;
   tagId: number | null;
}

export interface ListImgRequest {
   current: number;
   pageSize: number;
   tagId?: number;
   title?: string;
   userId?: number;
}

export interface Page<T> {
   records: T[];
   total: number;
   size: number;
   current: number;
   pages: number;
   optimizeCountSql?: boolean;
   searchCount?: boolean;
   countId?: string | null;
   maxLimit?: string | null;
}

export interface ImgResponse<T> {
   code: number;
   data: T;
   message: string;
   description: string;
}
