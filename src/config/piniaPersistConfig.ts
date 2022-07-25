import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/**
 * pinia持久化参数配置
 * @param key 存储到持久化的 name
 * @param sessionFlag 存储到session还是local
 * @returns piniaPersistConfig
 */
const piniaPersistConfig = (key: string, sessionFlag: boolean) => {
  const _storage = sessionFlag ? window.sessionStorage : window.localStorage
  const persist: PersistedStateOptions = {
    key,
    storage: _storage
  }
  return persist
}
export default piniaPersistConfig
