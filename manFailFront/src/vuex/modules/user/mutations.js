import {
  LOGIN_SUCCESS,
  CHANGE_USER_NAME,
  CHANGE_USER_PASSWORD
} from './mutation-type'
import cookieUtil from '../../../utils/cookieUtil'

const mutations = {
  [CHANGE_USER_NAME] (state,userName) {
    state.userName=userName;
  },
  [CHANGE_USER_PASSWORD] (state,password) {
    state.password=password;
  },
  [LOGIN_SUCCESS] (state,userInfo) {
    state.userInfo=userInfo
    cookieUtil.setCookie('token',userInfo.token,userInfo.expires)
  }
}
export default mutations
