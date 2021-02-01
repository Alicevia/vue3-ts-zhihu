import { Commit, createStore } from 'vuex'
import { instance } from '@/axios'
import { AxiosPromise, AxiosRequestConfig } from 'axios'
import api from '@/api'
import { arrToObj, ObjToArr } from '@/utils'

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string
}

export interface ResponseTypeProps<P = {}> {
  code: number;
  msg: string;
  data: P
}
export interface PostProps {
  "_id"?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  createdAt?: string;
  "image"?: ImageProps | string;
  "column"?: string;
  author?: string | UserProps;
  isHTML?: boolean
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string
}
export interface UserProps {
  isLogin: boolean;
  "_id"?: string;
  "email"?: string;
  "nickName"?: string;
  "description"?: string;
  "avatar"?: ImageProps;
  "column"?: string;
  "createdAt"?: string;

}
export interface ErrorProps {
  status: boolean
}
export interface ListProps<P> {
  [id: string]: P
}


export interface StoreProps {
  token: string;
  user: UserProps;
  loading: boolean;
  error: ErrorProps;
  posts: { data: ListProps<PostProps>; loadedColumns: string[], total: number };
  columns: { data: ListProps<ColumnProps>, isLoaded: boolean, total: number }
}

const asyncAndCommit = async (config: AxiosRequestConfig, commit: Commit, mutationName: string, toMutationData?: any) => {
  const data = await instance(config)
  if (toMutationData) {
    commit(mutationName, { ...data, toMutationData })
  } else {
    commit(mutationName, data)
  }
  return data
}

const asyncAndCommit2 = async (request: AxiosPromise, commit: Commit, mutationName: string, toMutationData?: any) => {
  const data = await request
  if (toMutationData) {
    commit(mutationName, { ...data, toMutationData })
  } else {
    commit(mutationName, data)
  }
  return data
}

export default createStore<StoreProps>({
  state: {
    token: localStorage.getItem('token') || '',
    user: { isLogin: false },
    error: { status: false },
    columns: { data: {}, isLoaded: false, total: 0 },
    loading: false,
    posts: { data: {}, loadedColumns: [], total: 0 },
  },
  actions: {
    login({ commit }, data) {
      return asyncAndCommit(
        { url: '/api/user/login', method: 'post', data },
        commit, 'login')
    },
    fetchUserInfo({ commit }) {
      return asyncAndCommit(
        { url: '/api/user/current', method: 'get' },
        commit, 'updateUserInfo')
    },
    loginAndFetchUserInfo({ dispatch }, data) {
      return dispatch('login', data).then(() => dispatch('fetchUserInfo'))
      // try {
      //   await dispatch('login', data)
      //   await dispatch('fetchUserInfo')
      // } catch (error) {
      //   return Promise.reject(error)
      // }
    },
    fetchColumnList({ commit }, data) {
      let { currentPage, pageSize } = data
      return asyncAndCommit2(
        api.fetchColumnList({ url: `/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`, data, method: 'get' }),
        commit, 'updateColumnList')
    },
    fetchColumnInfoById({ commit }, id) {
      return asyncAndCommit2(
        api.fetchColumnInfoById({ url: `/api/columns/${id}`, method: 'get' }),
        commit, 'updateColumnListById')
    },
    fetchColumnPostList({ commit }, data) {
      let { currentPage, pageSize, id } = data
      return asyncAndCommit2(
        api.fetchColumnList({ url: `/api/columns/${id}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, data, method: 'get' }),
        commit, 'updatePostList', { id })
    },
    fetchPostInfoById({ commit }, id) {
      return asyncAndCommit2(
        api.fetchPostInfoById({ url: `/api/posts/${id}`, method: 'get' }),
        commit, 'updatePostListById')
    },
    fetchDeletePostById({ commit }, id) {
      return asyncAndCommit2(
        api.deletePostInfo({ url: `/api/posts/${id}` }),
        commit, 'deletePostListById')
    }
  },
  getters: {
    getColumnList(state) {
      return ObjToArr(state.columns.data)
    },
    getColumnInfoById(state) {
      return (id: string) => {
        return state.columns.data[id]
      }
    },
    getPostList(state) {
      return ObjToArr(state.posts.data)
    },
    getPostInfoById(state) {
      return (cid: string) => {
        return ObjToArr(state.posts.data).filter(post => post.column === cid)
      }
    },

  },
  mutations: {
    setError(state, e) {
      state.error = e
    },
    setLoading(state, status) {
      state.loading = status
    },
    logout(state) {
      delete instance.defaults.headers.common.Authorization
      localStorage.removeItem('token')
      state.token = ''
      state.user = { isLogin: false }
    },

    login(state, { data }) {
      state.user = { isLogin: true }
      state.token = data.token
      localStorage.setItem('token', data.token)
      instance.defaults.headers.common.Authorization = `Bearer ${data.token}`
    },
    updateUserInfo(state, { data }) {
      state.user = { isLogin: true, ...data }
    },
    updateColumnList(state, { data: newData }) {
      let { count, list, currentPage, pageSize } = newData
      let { data } = state.columns
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        isLoaded: true
      }
      console.log(state.columns)
    },
    updateColumnListById(state, { data }) {
      console.log(data)
      state.columns.data[data._id] = data
    },
    updatePostList(state, { data: newData, toMutationData }) {
      let { count, list, currentPage, pageSize } = newData
      let { data, loadedColumns, total } = state.posts
      data = Object.assign(data, arrToObj(list)),
        total = count
      loadedColumns.push(toMutationData.id)
    },
    updatePostListById(state, { data }) {
      state.posts.data[data._id] = data
    },
    deletePostListById(state, { data: newData }) {
      let { data } = state.posts
      delete data[newData._id]
      console.log('xxx', data)
    }

  },
  modules: {}
})

