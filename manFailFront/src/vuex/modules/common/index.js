/**
 * Created by zhengguorong on 16/6/23.
 */
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  topTitle : 'menfail', //顶部标题
  submitCompleted : true,
  touchDirection : '' // up down let right
}

export default{
  state,
  actions,
  getters,
  mutations
}
