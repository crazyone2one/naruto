import { defineStore } from 'pinia'
import piniaPersistConfig from '../../config/piniaPersistConfig'
import { userInfos } from '../interface'

export const useUserInfo = defineStore('userInfos', {
  // other options...
  state: (): userInfos => {
    return {
      // token: null as string | null,
      token: '',
      lastWorkspaceId: '',
      lastProjectId: '',
      userInfo: {}
    }
  },
  actions: {
    // setToken
    async setToken(token: string | undefined) {
      this.token = token || ''
    },
    // setUserInfo
    async setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    async setLastWorkspaceId(workspaceId: string | undefined) {
      this.lastWorkspaceId = workspaceId || ''
    },
    async setLastProjectId(projectId: string | undefined) {
      this.lastProjectId = projectId || ''
    }
  },
  persist: piniaPersistConfig('userInfos', true)
})
