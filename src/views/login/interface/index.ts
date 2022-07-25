export namespace Login {
  export interface ReqLoginForm {
    name: string
    password: string
  }
  export interface ResLogin {
    access_token: string
  }
  export interface ResAuthButtons {
    [propName: string]: any
  }
}
