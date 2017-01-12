import {
  CHANGE_BOTTOM_BTN_ACTIVES,
  CHANGE_BOTTOM_BTN_CURRENT
  }
  from './mutation-type'

const mutations = {
  // 获取当前激活的底部
  [CHANGE_BOTTOM_BTN_ACTIVES] (state, data) {
    for(let i = 0 ; i < state.actives.length; i++){
      if(state.actives[i].index == data.index){
        return;
      }
    }

    state.actives.push(data)

  },

  [CHANGE_BOTTOM_BTN_CURRENT] (state, data) {

    state.current=data

  }
}

export default mutations
