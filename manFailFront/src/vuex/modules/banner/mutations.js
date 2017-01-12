import {
  FETCH_BANNER_LIST_SUCCESS
} from './mutation-type'

const mutations = {
  // 切换左侧导航的显示状态
 /* [FETCH_LIST] (state, isShow) {
    state.leftNavState = isShow
  },*/
  [FETCH_BANNER_LIST_SUCCESS] (state,list) {
    state.list = list;
  }
}
export default mutations
