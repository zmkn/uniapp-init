/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 页码信息的类型声明
   */
  interface PaginationResponse<T> {
    page: number;
    limit: number;
    total: number;
    pages: number;
    data: T;
  }

  /**
   * 更多信息的类型声明
   */
  interface MoreResponse<T> {
    limit: number;
    total: number;
    data: T;
    nextKey?: string;
    previousKey?: string;
  }
}

export { };

