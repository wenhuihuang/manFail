/**
 *  dispatch  vuex 2.0 只可以触发action    表明有某些事件发生的意向（可能是异步操作产生的副作用）
 *  commit  commit mutation    说明会使实际状态发生改变的同步操作
 *  action 异步操作
 *  mutation 同步操作
 * @param commit
 * @param isShow
 */
import vue from 'vue'
export const  fetchBannerList = ({commit}) => {

  vue.http.get('/API/newBack/banner/apiList', {}, { //Access-Control-Allow-Origin: *
      headers: {

      },
      emulateJSON: true
  }).then((response) => {
      //console.log(response)
      //成功后
      if(response.status == '200'){
        return commit('FETCH_BANNER_LIST_SUCCESS',response.body);
      }
  },(response) => {
      //失败后
      console.log(response);
  })
}



