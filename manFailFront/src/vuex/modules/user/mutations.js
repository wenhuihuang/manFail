import {
  LOGIN_SUCCESS,
  CHANGE_USER_NAME,
  CHANGE_USER_PASSWORD,
  CHANGE_IS_LOGIN,
  FETCH_USER_SUCCESS,
  LOGOUT,
  CHANGE_NICKNAME,
  CHANGE_BIRTHDAY,
  CHANGE_PHONE,
  LOGIN_ERROR
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
    state.password=""
    state.userInfo=userInfo.user
    cookieUtil.setCookie('token',userInfo.token,userInfo.expires)
  },
  [LOGIN_ERROR] (state, loginErrorInfo){
    state.loginErrorInfo = loginErrorInfo;
  },
  [CHANGE_IS_LOGIN] (state,isLogin) {
    state.isLogin=isLogin
  },
  [FETCH_USER_SUCCESS] (state,userInfo){
    state.userInfo=userInfo
  },
  [CHANGE_NICKNAME] (state, nickname){
    state.userInfo.nickname=nickname;
  },
  [CHANGE_PHONE] (state, phone){
    state.userInfo.phone=phone
  },
  [CHANGE_BIRTHDAY] (state,birthday){
    state.userInfo.birthday = birthday;
  },
  [LOGOUT] (state) {
    cookieUtil.delCookie('token');
    state.userInfo={};
    state.isLogin=false;
  }
}
export default mutations
