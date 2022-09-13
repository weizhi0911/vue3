import axios from 'axios'
import factory from './factory'
console.log('process.env')
console.log(process.env.VUE_APP_API_URL_PROXY)
const proxy = process.env.VUE_APP_API_URL_PROXY || ''
const instance = axios.create({
  baseURL: proxy ? '' : process.env.VUE_APP_API_URL
})
const {
  requestByGet,
  requestByPost,
  pendingRequest /* , requestFile, request */
} = factory({
  instance,
  proxy
})

export {
  requestByGet,
  requestByPost,
  pendingRequest /* , requestFile, request */
}
