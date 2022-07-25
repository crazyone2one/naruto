// * 请求响应参数(不包含data)
export interface Result {
  code: string
  message: string
  success: boolean
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T
}
// * 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}
// * 用户管理
export namespace User {
  export interface ReqGetUserParams extends ReqPage {
    name: string
  }
  export interface ResUser {
    id: string
    nickName: string
    name: string
    email: string
    password: string
    status: string
    createTime: string
    updateTime: string
    language: any
    lastWorkspaceId: string
    phone: string
    source: any
    lastProjectId: string
    createUser: any
    platformInfo: any
    seleniumServer: string
    token: string
    roles: any
    groups: any
  }
}
// * 登录
export namespace Login {
  export interface ReqLoginForm {
    name: string
    password: string
  }
  export interface ResLogin {
    authority: [{}]
    token: string
    user: User.ResUser
  }
}
