import request from '../utils/request' // 引入封装得axios
// import request from '@/utils/request' // 引入封装得axios

// import login from '@/utils/request'
// console.log(login)

// 登录
export function login(data: any) {
  return request({
    url: 'auth/login',
    method: 'POST',
    data
  })
}