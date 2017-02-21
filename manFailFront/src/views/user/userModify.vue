<template>
    <div class="user-modify">
        <ul>
          <li class="user-modify-item f-p-r" @change="updateHeadImg">
            <span>头像</span><img class="modify-head-img" :src="userInfo.headImg | proxyWebsite" /><i class="icon iconfont">&#xe665;</i>
            <input type="file" name="fileName" id="headImgFile" class="f-p-a" />
          </li>

          <li class="user-modify-item">
            <router-link :to="{name:'nicknameModify',params:{id:userInfo.userId}}">
              <span>昵称</span><i class="icon iconfont">&#xe665;</i>
            </router-link>
          </li>
          <li class="user-modify-item">
            <router-link :to="{name:'birthdayModify',params:{id:userInfo.userId}}">
              <span>生日</span><i class="icon iconfont">&#xe665;</i>
            </router-link>
          </li>
          <li class="user-modify-item">
            <router-link :to="{name : 'phoneModify',params : {id:userInfo.userId}}">
              <span>联系方式</span><i class="icon iconfont">&#xe665;</i>
            </router-link>
          </li>
        </ul>
    </div>
</template>
<style lang="sass">
  .user-modify
    padding: 0 1rem
    .user-modify-item
      padding: .5rem 0
      display: flex
      display: -webkit-box-flex
      border-bottom: 1px solid #c2c2c2
      >a
        color: #000
        display: flex
        display: -webkit-flex
        width: 100%
      .modify-head-img
        width: 26px
        height: 26px
        border-radius: 50%
      span
        display: block
        -webkit-box-flex: 1
        flex: 1
      .icon
        font-size: 1.45rem
      #headImgFile
        width: 100%
        height: 100%
        top: 0
        bottom: 0
        left: 0
        right: 0
        opacity: 0
</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    export default{
        mounted() {
         // var id = this.$route.params.id;
          this.$store.dispatch('fetchUserInfo');
        },
        methods : {
          updateHeadImg () {
          let userId = this.userInfo.userId;
          let obj = {
            userId : userId,
            headImgFile : 'headImgFile'
          }
            this.$store.dispatch('uploadHeadImg',obj); //方法 用户id 元素id
          }
        },
        computed : {
           ...mapGetters({
            userInfo : "getUser"
          })
        }
    }
</script>
