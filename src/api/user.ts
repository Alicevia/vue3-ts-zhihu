import { AxiosRequestConfig } from "axios"
export interface userProps<T> {
  login: T;
  fetchUserInfo: T;
  createAccount: T;
  updateUserInfo: T;
}
let userApi: userProps<AxiosRequestConfig> = {
  login: { url: '/api/user/login', method: 'post' },
  fetchUserInfo: { url: '/api/user/current', method: 'post' },
  createAccount: { url: '/api/users', method: 'post' },
  updateUserInfo: { url: '/api/user/{id}', method: 'patch' },
}


export default userApi

// api.login({url:'/'})
// /api/user/login post
// /api/user/{id}  patch
// /api/columns?currentPage={page}&pageSize={size} get