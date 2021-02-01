import { AxiosRequestConfig } from "axios"
export interface columnProps<T> {
  updateColumn: T;
  fetchColumnInfoById: T;
  fetchColumnList: T;
}
let columnApi: columnProps<AxiosRequestConfig> = {
  fetchColumnList: { url: '/api/columns?currentPage={page}&pageSize={size}', method: 'get' },
  fetchColumnInfoById: { url: '/api/columns/{id}', method: 'get' },
  updateColumn: { url: '/api/columns/{id}', method: 'patch' },
}


export default columnApi