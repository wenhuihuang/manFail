import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import store from './vuex/store'
import router from './routes/router'

import App from './views/index/App.vue'

import filter from './utils/filter'

Vue.use(VueResource)
Vue.use(VueRouter)

/*Vue.validator('tel', function (val) {
  return /^[0-9]{11}$/.test(val)
});*/

const app = new Vue({
  el: '#app',
  router : router,
  store ,
  render: h => h(App)
})

/*const article = new Vue({
  //el: '#article',
  router : router,
  store ,
  render: h => h(App)
}).$mount('#article')*/

/*const article = new Vue({
 el: '#article',
 router : router,
 store : store,
 render: h => h(App),
 components : {
 firstcomponent : First,
 secondcomponent : Secondcomponent
 }
 })*/

/* eslint-disable no-new */
/*new Vue({
  el: '#article',
  template: '<App/>',
  components: { App }
})*/
