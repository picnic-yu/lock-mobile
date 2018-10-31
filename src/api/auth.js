/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

// /authorization/record/pg
// 授权记录分页查询
export function getAuthList(params) {
  return fetch(`${baseUrl}/authorization/record/pg`, params)
}

