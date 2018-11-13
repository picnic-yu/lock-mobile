/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {get, baseUrl} from 'config/index'
export function getFeedback() {
    return get(`${baseUrl}/feedback/info`)
}

