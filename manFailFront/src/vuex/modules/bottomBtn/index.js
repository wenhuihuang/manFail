import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

/**
 * actives 保存所在走过的路径对应的底部状态
 * current 保存当前状态
 * @type {{actives: Array, current: {}}}
 */
const state = {
  actives : [],
  current:{}
}

export default{
  state,
  actions,
  getters,
  mutations
}
