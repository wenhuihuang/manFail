import {
  SET_TOP_TITLE,
  CHANGE_SUBMIT_COMPLETED,
  CHANGE_TOUCH_DIRECTION
} from './mutation-type'

const mutations = {
  [SET_TOP_TITLE] (state,data) {
    state.topTitle=data
  },
  [CHANGE_SUBMIT_COMPLETED] (state,flag) {
    state.submitCompleted=flag;
  },
  [CHANGE_TOUCH_DIRECTION] (state,direction) {
    state.touchDirection=direction;
  }
}
export default mutations
