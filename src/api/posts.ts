import { AxiosRequestConfig } from "axios"
export interface postProps<T> {
  createPost: T;
  fetchPostInfoById: T;
  updatePostInfo: T;
  deletePostInfo: T;
  fetchPostList: T;
}
let postApi: postProps<AxiosRequestConfig> = {
  createPost: { url: '/api/posts', method: 'post' },
  fetchPostInfoById: { url: '/api/posts/{id}', method: 'get' },
  updatePostInfo: { url: '/api/posts/{id}', method: 'patch' },
  deletePostInfo: { url: '/api/posts/{id}', method: 'delete' },
  fetchPostList: { url: '/api/columns/{id}/posts?currentPage={page}&pageSize={size}', method: 'get' },
}


export default postApi