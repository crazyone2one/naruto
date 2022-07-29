import { useUserInfo } from '@/store/modules/userInfo'
import i18n from '@/i18n'

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

export function getTranslateOptions(data: any) {
  const options: { text: string }[] = []
  data.forEach((element: any) => {
    const option = { text: '' }
    Object.assign(option, element)
    option.text = i18n.global.t(option.text)
    options.push(option)
  })
  return options
}
