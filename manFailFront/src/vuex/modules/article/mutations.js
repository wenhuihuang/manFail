import {
  FETCH_LIST_SUCCESS,
  FETCH_DETAIL_SUCCESS,
  SUBMIT_COMMENT_SUCCESS,
  UPDATE_ARTICLE_COMMENT_TEXT,
  UPDATE_ARTICLE_COMMENT,
  FETCH_ARTICLE_COMMENT_SUCCESS
} from './mutation-type'

const mutations = {
  // 切换左侧导航的显示状态
 /* [FETCH_LIST] (state, isShow) {
    state.leftNavState = isShow
  },*/
  [FETCH_LIST_SUCCESS] (state,list) {
    state.list = list;
  },
  [FETCH_DETAIL_SUCCESS] (state,detail) {
    state.detail=detail;
  },
  [SUBMIT_COMMENT_SUCCESS] (state,comment){
    state.comments.push(comment);
  },
  [UPDATE_ARTICLE_COMMENT_TEXT] (state,commentText){
    state.comment.commentText=commentText
  },
  [UPDATE_ARTICLE_COMMENT] (state,comment) {
    state.comment=comment;
  },
  [FETCH_ARTICLE_COMMENT_SUCCESS] (state,comments) {
    state.comments=comments
  }
}
export default mutations
