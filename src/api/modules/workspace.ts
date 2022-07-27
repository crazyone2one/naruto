import http from '@/api'
import { Workspace } from '../interface'

/**
 * 列表数据
 * @param params 查询参数
 * @returns
 */
export const workspacePageList = (params: Workspace.ReqGetParams) => {
  const page = params.page
  const limit = params.limit
  return http.post<Workspace.ResWorkspace>(`/workspace/list/all/` + page + '/' + limit, params) // 正常 post json 请求  ==>  application/json
}
/**
 * 保存workspace
 * @param saveType 保存路径
 * @param params 请求参数
 * @returns
 */
export const saveWorkspace = (saveType: string, params: Workspace.WorkspaceItem) => {
  return http.post<any>('/workspace/' + saveType, params)
}

/**
 * 删除workspace
 * @param wsId workspace id
 * @returns
 */
export const deleteWsById = (wsId: string) => {
  return http.get<any>('/workspace/special/delete/' + wsId)
}
/**
 * workspace 列表.
 * @returns
 */
export const userWorkspaceList = (userId: string) => {
  return http.get<any>('/workspace/list/userWorkspace/' + userId)
}
/**
 * 获取工作区间下成员数量
 * @param params 请求参数
 * @returns
 */
export const getMemberList = (params: Workspace.ReqMemberListParams) => {
  return http.post<any>('/user/special/ws/member/list/all', params)
}
