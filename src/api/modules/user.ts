import http from '@/api'
import { User } from '../interface'
/**
 *
 * @param sourceId
 * @returns
 */
export const switchWorkspace = (sourceId: string) => {
  return http.post<User.ResUser>('/user/switch/source/ws/' + sourceId, {})
}
export const userGroupList = (userId: string) => {
  return http.get<any>('/user/group/all/' + userId)
}
export const getGroupByType = (param: any) => {
  return http.post<any>('/group/get', param)
}

export const updateCurrentProject = (params: { id: string; lastProjectId: string | null }) => {
  return http.post<User.ResUser>('/user/update/current', params)
}
