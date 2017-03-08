/**
 *  dispatch  vuex 2.0 只可以触发action    表明有某些事件发生的意向（可能是异步操作产生的副作用）
 *  commit  commit mutation    说明会使实际状态发生改变的同步操作
 *  action 异步操作
 *  mutation 同步操作
 * @param commit
 * @param isShow
 */
import vue from 'vue'
export const  setTopTitle = ({commit},data) => {
  return commit('SET_TOP_TITLE',data);
};
export const changeTouchDirection = ( { commit }, direction) => {
  commit('CHANGE_TOUCH_DIRECTION',direction);
};
