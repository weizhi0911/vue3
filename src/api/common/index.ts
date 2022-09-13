import { requestByGet } from '@/http'

export const getCount = (data?: {}, other?: {}) => {
  return requestByGet('/public/count', data, other)
}


