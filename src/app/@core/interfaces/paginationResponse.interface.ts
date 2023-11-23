export interface PaginationResponse<T>{
  itens: T[];
  page: number;
  pageSize: number;
  total: number;
}
