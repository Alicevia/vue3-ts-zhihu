import { ColumnProps, ImageProps, UserProps } from './store'

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {

  return arr.reduce((pre, item) => {
    if (item._id) {
      pre[item._id] = item
    }
    return pre
  }, {} as { [key: string]: T })
}

export const ObjToArr = <T>(obj: { [index: string]: T }) => {
  return Object.keys(obj).map(item => obj[item])
}

export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((pre, current) => {
      return current + ',' + pre
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {


  if (data.avatar) {

    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}