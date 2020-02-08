/* 
对应msite功能模块的配置对象
*/

import {
    RECEIVE_MENU
} from '../mutation-types'

const state = {
  token: localStorage.getItem('token_key'), // 登陆token标识
  menus:[],

}

const mutations = {
  [RECEIVE_MENU] (state, menus) {
    state.menus = menus
  },
}

const actions = {
  /* 
  保存用户的同步action
  */
  saveMenus ({commit}, menus) {
    commit(RECEIVE_MENU, menus)
  },
}
const getters = {}

export default  {
  state,
  mutations,
  actions,
  getters
}