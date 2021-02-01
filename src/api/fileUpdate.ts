import { AxiosRequestConfig } from "axios"
export interface fileUpdateProps<T> {
  uploadFile: T;
}
let fileUpdateApi: fileUpdateProps<AxiosRequestConfig> = {
  uploadFile: { url: '/api/upload', method: 'post' },
}


export default fileUpdateApi