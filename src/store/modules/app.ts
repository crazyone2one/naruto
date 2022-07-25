import { defineStore } from 'pinia'
import piniaPersistConfig from '../../config/piniaPersistConfig'
import { GlobalState, ThemeConfigProp } from '../interface'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useApp = defineStore('appStore', {
  // other options...
  state: (): GlobalState => {
    return {
      assemblySize: 'default',
      language: 'zh-cn',
      themeConfig: {
        // 默认 primary 主题颜色
        primary: '#409EFF',
        // 面包屑导航
        breadcrumb: false,
        // 标签页
        tabs: false
        // for data that is not yet loaded
        //   user: null as UserInfo | null,
      }
    }
  },
  actions: {
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfigProp) {
      this.themeConfig = themeConfig
    }
  },
  persist: piniaPersistConfig('appStore', false)
})
