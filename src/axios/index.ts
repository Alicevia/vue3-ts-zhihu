import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://api.vikingship.xyz/',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token') || ''
  }

})

instance.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: "" })
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  store.commit('setLoading', false)
  return response.data
}, err => {
  const { error } = err.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(err)
})

export { instance }

