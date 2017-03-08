/**
 *  dispatch  vuex 2.0 只可以触发action    表明有某些事件发生的意向（可能是异步操作产生的副作用）
 *  commit  commit mutation    说明会使实际状态发生改变的同步操作
 *  action 异步操作
 *  mutation 同步操作
 * @param commit
 * @param isShow
 */
import vue from 'vue'
import cookieUtil from 'utils/cookieUtil'
export const  fetchArticleList = ({commit}) => {

  vue.http.get('/API/newBack/article/apiList', {}, { //Access-Control-Allow-Origin: *
 /*     headers: {

      },*/
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
    vue.http.post(
       "/API/newBack/article/apiSubmitComment",
       obj
    )
    .then(
      (response) => {
        if(response.status == '200'){
          commit('CHANGE_IS_SHOW_COMMENT',false)
         // return commit('SUBMIT_COMMENT_SUCCESS',response.body);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

export const fetchArticleCommentList = ({commit},id) => {
  let token = cookieUtil.getCookie('token');
  if(token != null && token !=undefined && token != "") {
    var head = {"X-Requested-With": "XMLHttpRequest","x-access-token":  token}
  }else{
    var head ={"X-Requested-With": "XMLHttpRequest"}
  }
  vue.http({
    method:'POST',
    url:'/API/newBack/article/apiCommentList',
     body:{"id":id},
    headers: head,
  emulateJSON: true

    })
    .then(
      (response) => {
        console.log(response)
        if(response.status == '200'){

          return commit('FETCH_ARTICLE_COMMENT_SUCCESS',response.body);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

export const changeIsShowComment = ({commit},flag) => {
  commit('CHANGE_IS_SHOW_COMMENT',flag)
}

//点赞
export const like = ({commit},obj) => {
  let token = cookieUtil.getCookie('token');
  //防止重复提交
  commit('CHANGE_SUBMIT_COMPLETED',false);
  vue.http({
    method : "POST",
    url : "/API/newBack/article/apiAddLike",
    headers : {"x-access-token" : token},
    emulateJSON:true,
    body:obj
  })
    .then(
      (response) => {
        if(response.status == '200'){
          commit('FETCH_ARTICLE_COMMENT_SUCCESS',response.body);
          commit('CHANGE_SUBMIT_COMPLETED',true);
        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

//取消点赞
export const delLike = ({commit},obj) => {

}

//获取评论
export const fetchLikes = ({commit},obj) => {
  vue.http.post(
    "/API/newBack/article/apiLikes",
    obj
  )
    .then(
      (response) => {
        if(response.status == '200'){

        }
      },
      (response) => {
        console.log("网络出错："+response)
      }
    )
}

