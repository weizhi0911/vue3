// 架构（不能删） -  api 配置
import Message from '@archUtils/message.ts'

enum statusCode {
  success = 0,
  successByHDK = 200,
  // TODO: 推广记录页对接完毕后删掉
  successPromote = 3004
}
type ResponseStatusCodeVal = {
  msg: string
  cb: Function
}

type ResponseStatusCode = {
  [statusCode.success]: ResponseStatusCodeVal
  [statusCode.successByHDK]: ResponseStatusCodeVal
  [statusCode.successPromote]: ResponseStatusCodeVal
  default: ResponseStatusCodeVal
}

const message = new Message()

const handleSuccess = {
  msg: 'response success',
  cb: (msg: any, data: {}): any => data['data']
}

const handleDefault = {
  msg: 'response failed',
  cb: (msg: any, data: {}): Error => {
    message.error(msg)
    throw new Error(`msg: ${msg}, data: ${data}`)
  }
}

const responseStatusCode: ResponseStatusCode = {
  [statusCode.success]: handleSuccess,
  [statusCode.successByHDK]: handleSuccess,
  [statusCode.successPromote]: handleSuccess,
  default: handleDefault
}

export { responseStatusCode }
