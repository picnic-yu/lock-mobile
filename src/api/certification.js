/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl,get,put} from 'config/index'
// 登录接口
export function getCertifications(params) {
  return fetch(`${baseUrl}/certification/pg`, params)
}
export function getUserInfo(id) {
  return get(`${baseUrl}/certification/${id}`)
}

// /organizations/list
// 用户查询单位组
export function getOrgList(obj) {
  return fetch(`${baseUrl}/organizations/list`, obj)
}
export function getRoleListOfOrganization() {
  return get(`${baseUrl}/principals/organization/roles`)
}
export function editCertification(obj) {
  return put(`${baseUrl}/certification/`, obj)
}
