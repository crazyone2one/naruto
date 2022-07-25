import { createI18n } from 'vue-i18n'
import mZhChLocale from './zh-ch'
import mEnLocale from './en'
import { useApp } from '@/store/modules/app'
import pinia from '@/store'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = useApp(pinia)

const messages = {
  [en.name]: {
    ...mEnLocale
  },
  [zhCn.name]: {
    ...mZhChLocale
  }
}
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: app.language,
  messages
})
export default i18n
