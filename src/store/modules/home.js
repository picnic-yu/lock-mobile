/**
 * home.js
 * 用于home模块的状态管理
 */
/* eslint-disable */
import * as types from '../mutation-type'  // 引入定义的方法
const home = {
  state: {
    number: 1,
    token:'',
  },
  mutations: {
    [types.SET_NUM](state, num) {   // 修改state 可通过mapMutations调用
      state.number = num
    },
    UPDATE_TOKEN(state,token){
      state.token = token;
    }
  },
  actions: {},
  getters: {            // 定义getters，可以通过mapGetters拓展函数调用
    number: state => {
      return state.number
    }
  }
}
export default home    // 输出home模块
