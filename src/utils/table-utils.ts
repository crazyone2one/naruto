import { CUSTOM_TABLE_HEADER } from './default-table-header'
import i18n from '@/i18n'

interface FieldSetting {
  id: string
  key: string
  label: string
}
/**
 * 获取自定义表头
 * @param key
 * @param customFields
 * @returns
 */
export function getCustomTableHeader(key: string, customFields?: any) {
  //   const fieldSetting = getAllFieldWithCustomFields(key, customFields)
  //   return getCustomTableHeaderByFiledSetting(key, fieldSetting)
  return getAllFieldWithCustomFields(key, customFields)
}
// function getCustomTableHeaderByFiledSetting(key: string, fieldSetting: any) {
//   return fieldSetting
// }
/**
 * 获取所有字段
 * @param key
 * @param customFields
 */
export function getAllFieldWithCustomFields(key: string, customFields: Array<any>) {
  let fieldSetting = [...CUSTOM_TABLE_HEADER[key]]
  fieldSetting = JSON.parse(JSON.stringify(fieldSetting))
  translateLabel(fieldSetting)
  if (customFields) {
    customFields.forEach((item: any) => {
      const field = {
        id: item.name,
        key: item.key,
        label: item.name,
        isCustom: true
      }
      fieldSetting.push(field)
    })
  }
  return fieldSetting
}

export function translateLabel(fieldSetting: Array<FieldSetting>) {
  if (fieldSetting) {
    fieldSetting.forEach(item => {
      if (item.label) {
        item.label = i18n.global.t(item.label)
      }
    })
  }
}
/**
 * 获取对应表格的列宽
 * @param key
 * @returns {{}|any}
 */
export function getCustomTableWidth(key: string) {
  const fieldStr = localStorage.getItem(key + '_WITH')
  if (fieldStr !== null) {
    const fields = JSON.parse(fieldStr)
    return fields
  }
  return {}
}
