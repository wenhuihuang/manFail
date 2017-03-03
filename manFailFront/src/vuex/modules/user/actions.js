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
import lrz from "lrz"

export const  login = ({commit},obj) => {
  vue.http.post('/API/newBack/user/apiLogin', obj.user, { //Access-Control-Allow-Origin: *
      headers: {

      },
      emulateJSON: true
  }).then((response) => {
      //成功后
      if(response.status == 200 && response.body.code == 200){
        commit('CHANGE_IS_LOGIN',true);
        commit('LOGIN_SUCCESS',response.body);
      }else{
        commit('LOGIN_ERROR',response.body);
      }
      obj.callback()
  },(response) => {
      //失败后
      console.log(response);
  })
}

export const logout = ({commit}) => {
  commit('LOGOUT')
}

/**
 * 从数据库中获取用户数据
 * @param commit
 */
export const fetchUserInfo = ({commit}) => {
  const token = cookieUtil.getCookie('token');
  vue.http({
    method:'POST',
    url:'/API/newBack/user/apiUserInfo',
   // body:{'websiteId':2,'pageSize':20,'pageNo':1,'isTop':0},
    headers: {'x-access-token': token},
    emulateJSON: true
  }).then((response) => {
    //console.log(response)
    //成功后
    if(response.status == '200'){
      return commit('FETCH_USER_SUCCESS',response.body);
    }
  },(response) => {
    //失败后
    console.log(response);
  })
}

export const changeNickname = ({commit} , nickname) => {
  commit('CHANGE_NICKNAME',nickname);
}

/**
 * 修改头像
 * @param commit
 * @param obj
 */
export const uploadHeadImg = ({commit},obj) => {
  let fileReader = new FileReader(),imgData;
  let file = document.querySelector('#'+obj.headImgFile).files[0]
  fileReader.readAsDataURL(file)
  fileReader.onload=function () {
    //lrz 压缩图片
    lrz(this.result)
      .then(function (rst) {
        // 处理成功会执行
        let formData = new FormData();
        formData.append('imgData',rst.base64)
        formData.append('userId',obj.userId)
        vue.http.patch(
          '/API/newBack/user/apiUploadHeadImg',formData
        ).then((response) => {
          //成功后
          commit('FETCH_USER_SUCCESS',response.body);
        })



      })
      .catch(function (err) {
        // 处理失败会执行
      })
      .always(function () {
        // 不管是成功失败，都会执行
      });



  }

}

/**
 * 修改昵称
 * @param commit
 * @param obj
 */
export const updateNickname = ({commit},obj) => {
  vue.http.post(
    '/API/newBack/user/apiUpdateNickname',obj
  ).then((response) => {
    //成功后
    commit('FETCH_USER_SUCCESS',response.body);
  })
}
export const changeBirthday = ({commit}, birthday) => {
  commit('CHANGE_BIRTHDAY',birthday);
}
export const changePhone = ({commit}, phone) => {
  commit('CHANGE_PHONE',phone);
}

export const updateBirthday = ({commit},obj) => {
  vue.http.post(
    '/API/newBack/user/apiUpdateBirthday',
    obj
  ).then((response) => {
    commit('FETCH_USER_SUCCESS',response.body);
  })
}

export const updatePhone = ({commit}, obj) => {
  vue.http.post(
    '/API/newBack/user/apiUpdatePhone',
    obj
  ).then((response) => {
    //成功
    commit('FETCH_USER_SUCCESS',response.body);
  })
}

export const changeIsLogin = ({commit}, flag) => {
  commit('CHANGE_IS_LOGIN',flag)
}

export const checkLogin = ({commit}) => {
  let token = cookieUtil.getCookie('token');
  if(token != null && token != "" && token != undefined ){
      commit('CHANGE_IS_LOGIN',true)
  }else{
      commit('CHANGE_IS_LOGIN',false)
  }
}
