/**
 * Created by zhengguorong on 16/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import bottomBtn from './modules/bottomBtn'
import article from './modules/article'
import banner from './modules/banner'
import user from './modules/user'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    bottomBtn,
    article,
    banner,
    user
  },
  strict: debug
})
