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
