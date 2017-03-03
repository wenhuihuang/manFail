/**
 * Created by zhengguorong on 16/6/23.
 */
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  userName : "",
  password:'',
  userInfo:{code:'',msg:''},
  isLogin:false,
  loginErrorInfo:{}
}

export default{
  state,
  actions,
  getters,
  mutations
}
