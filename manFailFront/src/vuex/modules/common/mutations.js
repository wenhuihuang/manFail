import {
  SET_TOP_TITLE
} from './mutation-type'

const mutations = {
  [SET_TOP_TITLE] (state,data) {
    state.topTitle=data
  }
}
export default mutations
