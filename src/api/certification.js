/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 登录接口
export function getCertifications(params) {
  return fetch(`${baseUrl}/certification/pg`, params)
}
