/* 
vuex最核心管理对象模块: store
*/
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  mutations, //总mutations
  actions, // 总actions
  getters,
  modules: {

  }
})

/* 
总state的结构:
{
  msite: {},
  user: {},
  shop: {},
}
*/