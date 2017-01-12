/**
 *  dispatch  vuex 2.0 只可以触发action    表明有某些事件发生的意向（可能是异步操作产生的副作用）
 *  commit  commit mutation    说明会使实际状态发生改变的同步操作
 *  action 异步操作
 *  mutation 同步操作
 * @param commit
 * @param isShow
 */
import vue from 'vue'
import cookieUtil from "../../../utils/cookieUtil"

export const  login = ({commit},user) => {
  vue.http.post('/API/newBack/user/apiLogin', user, { //Access-Control-Allow-Origin: *
      headers: {

      },
      emulateJSON: true
  }).then((response) => {
      //console.log(response)
      //成功后
      if(response.status == '200'){
        return commit('LOGIN_SUCCESS',response.body);
      }
  },(response) => {
      //失败后
      console.log(response);
  })
}

export const fetchUserInfo = ({commit}) => {
  const token = cookieUtil.getCookie('token');
  vue.http({
    method:'POST',
    url:'/API/newBack/user/apiUserInfo',
   // data:{'websiteId':2,'pageSize':20,'pageNo':1,'isTop':0},
    headers: {'x-access-token': token},
    emulateJSON: true
  }).then((response) => {
    //console.log(response)
    //成功后
    if(response.status == '200'){
      console.log(response.body)
      //return commit('LOGIN_SUCCESS',response.body);
    }
  },(response) => {
    //失败后
    console.log(response);
  })
}


