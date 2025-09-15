export interface ImageTag {
   id: number;
   tagname: string;
   createtime: string;
   updatetime: string;
   isdelete: number;
}
export interface ListImgTagRequest {
   current: number;
   pageSize: number;
   tagName?: string;
}
