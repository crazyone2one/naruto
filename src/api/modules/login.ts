import http from '@/api'
import { Login } from '../interface'
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/user/sign-in`, params) // 正常 post json 请求  ==>  application/json
}
