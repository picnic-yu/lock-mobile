/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl,get,put,deleteAction} from 'config/index'
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
export function getLocks(principalId) {
  return get(`${baseUrl}/principals/${principalId}/locks`)
}
export function getAllLocks() {
  return fetch(`${baseUrl}/lockInfo/list`, {bindingStatus:0})
}
// post  /principals/add/locks   添加绑定锁具   
export function addLock(obj) {
  return fetch(`${baseUrl}/principals/add/locks`, obj)
}
// delete  /principals/del/lock/{id}  删除用户绑定锁具
export function deleteLock(id) {
  return deleteAction(`${baseUrl}/principals/del/lock/${id}`)
}