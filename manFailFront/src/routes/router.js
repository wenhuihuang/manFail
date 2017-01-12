import VueRouter from 'vue-router'

import ArticleList from '../views/article/list.vue'
import ArticleDetail from '../views/article/detail.vue'
import LifeList from '../views/life/list.vue'
import ShoppingList from '../views/shopping/list.vue'
import UserManage from '../views/user/manage.vue'
import ArticleCommentList from '../views/article/commentList.vue'
import Login from '../views/user/Login.vue'


//创建一个路由
const router = new VueRouter({
    mode : 'history',
    base : __dirname,
    routes : [
        {
          path : '/',
          component : ArticleList
        },
        {
            path :'/article/list',
            component : ArticleList
        },
        {
          path :'/article/detail/:id',
          name : 'articleDetail',
          component : ArticleDetail
        },
        {
            path : '/life/list',
            component : LifeList
        },
        {
            path : '/shopping/list',
            component : ShoppingList
        },
        {
            path : '/user/manage',
            component : UserManage
        },
        {
            path : '/comment/list/:id',
            name : 'articleComment',
            component : ArticleCommentList
        },
        {
          path : '/user/login',
          name : 'login',
          component : Login
        }
    ]
})


/*router.beforeEach((to, from, next) => {
  var vm = router.app.$root;
  console.log(vm.$store.getters.getBottomBtnActive)
  next();
})*/

router.afterEach((to, from) => {
  const href = window.location.href
  const vm = router.app.$root;
  const actions = vm.$store.getters.getBottomBtnActives;
  for(let i = 0 ; i < actions.length;i++){
    if(href.indexOf(actions[i].url.trim()) > -1 && actions[i].url != null){
      vm.$store.dispatch("changeBottomBtnCurrent",actions[i])
      return;
    }
  }
  vm.$store.dispatch('changeBottomBtnCurrent',{index:0,url:"/article/list"})
})

export default router
