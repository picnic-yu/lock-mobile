/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

// /unlock/record/pg
// 开关锁记录分页查询
export function getUnlockList(params) {
  return fetch(`${baseUrl}/unlock/record/pg`, params)
}

