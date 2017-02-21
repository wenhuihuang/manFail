import VueRouter from 'vue-router'

import ArticleList from '../views/article/list.vue'
import ArticleDetail from '../views/article/detail.vue'
import LifeList from '../views/life/list.vue'
import ShoppingList from '../views/shopping/list.vue'
import UserManage from '../views/user/manage.vue'
import ArticleCommentList from '../views/article/commentList.vue'
import Login from '../views/user/Login.vue'
import UserModify from '../views/user/userModify.vue'
import NicknameModify from '../views/user/nicknameModify.vue'
import BirthdayModify from '../views/user/birthdayModify.vue'
import PhoneModify from '../views/user/phoneModify.vue'


//创建一个路由
const router = new VueRouter({
    mode : 'history',
    base : __dirname,
    routes : [
        {
          path : '/',
          component : ArticleList,
          meta : {
            pageTitle : "新闻列表"
          }
        },
        {
            path :'/article/list',
            component : ArticleList,
            meta : {
              pageTitle: "新闻列表"
            }
        },
        {
          path :'/article/detail/:id',
          name : 'articleDetail',
          component : ArticleDetail,
          meta : {
            pageTitle : "新闻详情"
          }
        },
        {
            path : '/life/list',
            component : LifeList,
            meta : {
              pageTitle : "生活"
            }
        },
        {
            path : '/shopping/list',
            component : ShoppingList,
            meta : {
              pageTitle : "购物"
            }
        },
        {
            path : '/user/manage',
            component : UserManage,
            meta : {
              pageTitle : "个人中心"
            }
        },
        {
            path : '/comment/list/:id',
            name : 'articleComment',
            component : ArticleCommentList,
            meta : {
              pageTitle : "评论"
            }
        },
        {
          path : '/user/login',
          name : 'login',
          component : Login,
          meta : {
            pageTitle : "登录"
          }
        },
        {
          path : '/user/modify/:id',
          name : 'userModify',
          component : UserModify,
          meta : {
            pageTitle : "修改用户信息"
          }
        },
        {
          path : '/user/nicknameModify/:id',
          name : 'nicknameModify',
          component : NicknameModify,
          meta : {
            pageTitle : "修改用户昵称"
          }
        },
        {
          path : '/user/birthdayModify/:id',
          name : 'birthdayModify',
          component : BirthdayModify,
          meta : {
            pageTitle : "修改用户生日"
          }
        },
        {
          path : '/user/phoneModify/:id',
          name : 'phoneModify',
          component : PhoneModify,
          meta : {
            pageTitle : "修改联系方式"
          }
        }
    ]
})

/**
 * 兼容微信设置页面的title
 */
let setDocumentTitle = function (title) {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

let setTopTitle = title => {
  const vm =router.app.$root;
  vm.$store.dispatch('setTopTitle',title)
}

router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
  setTopTitle(to.meta.pageTitle)
  next();
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
