/**
 * 通用 API 响应结构
 */
export interface ApiResponse<T> {
   code: number; // 状态码，0 表示成功
   message: string; // 简短消息，如 "ok"
   description?: string; // 详细描述（可选）
   data: T; // 实际数据
}
