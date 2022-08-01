import http from '@/api'
import { Project, Workspace } from '../interface'

/**
 * 列表数据
 * @param params 查询参数
 * @returns
 */
export const projectPageList = (params: Project.ReqGetParams) => {
  const page = params.page
  const limit = params.limit
  return http.post<Project.ResProject>(`/project/list/` + page + '/' + limit, params) // 正常 post json 请求  ==>  application/json
}
/**
 * 获取项目下成员数量
 * @param wsId workspace id
 * @param params 请求参数
 * @returns
 */
export const getMemberList = (wsId: string | null, params: Workspace.ReqMemberListParams) => {
  return http.post<any>('/user/ws/project/member/list/' + wsId + '/1/100000', params)
}
/**
 * 保存项目数据
 * @param saveType 保存方式 ：add 添加，update 更新
 * @param params
 * @returns
 */
export const saveProject = (saveType: string, params?: Project.ProjectItem) => {
  return http.post<Project.ProjectItem>('/project/' + saveType, params)
}
