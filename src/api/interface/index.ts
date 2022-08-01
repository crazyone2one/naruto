// * 请求响应参数(不包含data)
export interface Result {
  code: string
  message: string
  success: boolean
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T
}

// * 分页请求参数
export interface ReqPage {
  page: number
  limit: number
}

// * 用户管理
export namespace User {
  export interface ReqGetParams extends ReqPage {
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

// * Workspace管理
export namespace Workspace {
  export interface ReqGetParams extends ReqPage {
    name: string
  }
  export interface ReqMemberListParams {
    name?: string
    workspaceId?: string
    projectId?: string
  }
  export interface WorkspaceItem {
    id: string
    name: string
    description: string
    createTime: string
    updateTime: string
    createUser: string
    memberSize: number
  }
  export interface ResWorkspace {
    total: number
    records: WorkspaceItem[]
  }
}

// * Workspace管理
export namespace Project {
  export interface ReqGetParams extends ReqPage {
    name: string
    workspaceId: string
  }

  export interface ProjectItem {
    id: string
    projectId: any
    workspaceId: string | null
    name: string
    description: string
    createTime: string
    updateTime: string
    tapdId: any
    jiraKey: any
    zentaoId: any
    azureDevopsId: any
    caseTemplateId: any
    issueTemplateId: string
    createUser: any
    systemId: any
    azureFilterId: any
    platform: string
    thirdPartTemplate: boolean
    versionEnable: any
    issueConfig: any
    userId: any
    memberSize: number
  }
  export interface ResProject {
    total: number
    records: ProjectItem[]
  }
}
export namespace CustomField {
  export interface ReqGetParams extends ReqPage {
    name: string
    projectId?: string
  }

  export interface CustomField {
    id: string
    name: string
    scene: string
    type: string
    remark: string
    options: string
    system: boolean
    global: boolean
    createTime: any
    updateTime: any
    createUser: any
    projectId: string
  }
  export interface ResCustomField {
    total: number
    records: CustomField[]
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
export interface Group {
  id: string
  name: string
  description: string
  system: boolean
  type: string
  createTime: string
  updateTime: string
  creator: string
  scopeId: string
  resourceId: any
  projectId: any
  onlyQueryCurrentProject: boolean
  userGroupId: any
  scopeName: any
  memberSize: any
  types: any[]
  scopes: any[]
  permissions: any
}
