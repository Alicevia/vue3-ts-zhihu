import { instance } from '@/axios'
import { AxiosPromise, AxiosRequestConfig } from 'axios'
import { columnProps } from './column'
import { postProps } from './posts'
import { fileUpdateProps } from './fileUpdate'
import { userProps } from './user'
const context = require.context('./', false, /\.ts$/)
let allApiObj =
  context.keys()
    .filter(item => item !== './index.ts')
    .reduce((a, b) => {
      Object.assign(a, context(b).default)
      return a
    }, {})
interface apiProps<T> extends columnProps<T>, postProps<T>, fileUpdateProps<T>, userProps<T> {
  [propName: string]: T;
}
type fn = (config: AxiosRequestConfig) => AxiosPromise;

function generateApi(apiSet: apiProps<AxiosRequestConfig>): apiProps<fn> {
  let temp: any = {}
  for (const key in apiSet) {
    temp[key] = (config: AxiosRequestConfig) => {
      return instance({ ...apiSet[key], ...config })
    }
  }
  return temp
}

export default generateApi(allApiObj as apiProps<AxiosRequestConfig>)