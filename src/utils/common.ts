import { useUserInfo } from '@/store/modules/userInfo'

export function getUUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export function getCurrentWorkspaceId() {
  const userInfo = useUserInfo()
  return userInfo.lastWorkspaceId
}

export function getCurrentProjectId() {
  const userInfo = useUserInfo()
  return userInfo.lastProjectId
}

export function getCurrentUserId() {
  const userInfo = useUserInfo()
  return userInfo.userInfo.id
}
