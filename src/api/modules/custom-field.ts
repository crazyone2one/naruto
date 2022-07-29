import http from '@/api'
import { CustomField } from '../interface'
/**
 * 列表数据
 * @param params 查询参数
 * @returns
 */
export const pageList = (params: CustomField.ReqGetParams) => {
  const page = params.page
  const limit = params.limit
  return http.post<CustomField.ResCustomField>(`/custom/field/list/` + page + '/' + limit, params) // 正常 post json 请求  ==>  application/json
}
