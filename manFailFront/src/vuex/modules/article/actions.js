/**
 *  dispatch  vuex 2.0 只可以触发action    表明有某些事件发生的意向（可能是异步操作产生的副作用）
 *  commit  commit mutation    说明会使实际状态发生改变的同步操作
 *  action 异步操作
 *  mutation 同步操作
 * @param commit
 * @param isShow
 */
import vue from 'vue'
export const  fetchArticleList = ({commit}) => {

  vue.http.get('/API/newBack/article/apiList', {}, { //Access-Control-Allow-Origin: *
      headers: {

      },
      emulateJSON: true
  }).then((response) => {
      //console.log(response)
      //成功后
      if(response.status == '200'){
        return commit('FETCH_LIST_SUCCESS',response.body);
      }
  },(response) => {
      //失败后
      console.log(response);
  })
}

export const fetchArticleDetail = ({commit},id) => {
  vue.http.get('/API/newBack/article/apiDetail/'+id)
    .then(
      (response) => {
        if(response.status == '200'){
          return commit('FETCH_DETAIL_SUCCESS',response.body);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )


}

export const submitArticleComment = ({commit},obj) => {
  console.log(obj)
    vue.http.post(
       "/API/newBack/article/apiSubmitComment",
       obj
    )
    .then(
      (response) => {
        if(response.status == '200'){
         // return commit('SUBMIT_COMMENT_SUCCESS',response.body);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

export const fetchArticleCommentList = ({commit},id) => {
  vue.http.get('/API/newBack/article/apiCommentList/'+id)
    .then(
      (response) => {
        if(response.status == '200'){
          return commit('FETCH_ARTICLE_COMMENT_SUCCESS',response.body);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

