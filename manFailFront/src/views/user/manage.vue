<template>
    <div class="user">
        <div class="user-top">
          <!--已经登录-->
          <div class="is-login" v-show="isLogin">
            <div class="use-manage-info">
              <p>
                <router-link class="head-icon" :to="{name:'userModify',params:{id:userInfo.userId}}">
                  <img :src="userInfo.headImg | proxyWebsite">
                </router-link>
              </p>
              <p class="use-manage-name">
                <span>{{userInfo.nickname == "" ?  'userInfo.userName' : userInfo.nickname}}</span>
              </p>
            </div>
            <ul class="user-manage-item-wrap">
              <li class="user-manage-item" @click="logout">
                <i class="icon iconfont">&#xe71e;</i>
                <span class="text">退出</span>
                <i class="icon iconfont">&#xe665;</i>
              </li>
            </ul>
          </div>
          <!--没有登录-->
          <div class="no-login" v-show="!isLogin">
            <div class="use-manage-info">
              <router-link to="/user/login" class="login-btn">登录</router-link>
            </div>
          </div>
        </div>
    </div>
</template>
<style lang="sass">
  .user-top
    height: 8rem
    .use-manage-info
      background: #2fb747
      padding: .8rem
      height: 9.3rem
      box-sizing: border-box
      display: flex
      -webkit-align-items: center
      align-items: center
      -webkit-justify-content: center
      justify-content: center
      -webkit-flex-flow: column
    .head-icon
      img
        width: 5.4rem
        height: 5.4rem
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        display: block
        margin: auto
    .use-manage-name
      text-align: center
      span
        color: #fff
        font-weight: bold
        font-size: 1.2rem
    .user-manage-item-wrap
      padding: .4rem 1rem
      .user-manage-item
        display: flex
        border-bottom: 1px solid #cecece
        padding: .4rem 0
        .icon
          font-size: 1.45rem
        .text
          display: block
          flex: 1.0
    .login-btn
      display: block
      width: 64px
      height: 64px
      border-radius: 50%
      text-align: center
      line-height: 64px
      font-size: .9rem
      background: #fff
      color: #000




</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import cookieUtil from '../../utils/cookieUtil'
    export default{
        mounted () {
          let token = cookieUtil.getCookie('token');
          if(token != null && token != "" && token != undefined ){
            this.$store.dispatch('fetchUserInfo')
            this.$store.commit('CHANGE_IS_LOGIN',true)
          }else{
            this.$store.commit('CHANGE_IS_LOGIN',false)
          }
        },
        computed : {
          ...mapGetters({
            isLogin : "getIsLogin",
            userInfo : 'getUser'
          })
        },
        methods : {
          logout () {
            this.$store.dispatch('logout')
          }
        }
    }
</script>
