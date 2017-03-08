<template>
    <div class="login-wrap">
        <!--<form  @submit.prevent="submit" >
          <input v-model="userName" v-validate.initial="userName" data-rules="required|alpha|min:3" class="form-control" type="text" placeholder="Full Name">
          &lt;!&ndash;<input type="text" name="userName" id="userName" v-model="userName" v-validate data-rules="required|email"  >&ndash;&gt;
          <input type="password" name="password" v-model="password">
          <input type="submit" value="提交">
        </form>-->
      <form  @submit.prevent="validateBeforeSubmit">
        <div class="login-row">
          <!--<label class="label">用户名：</label>-->
          <div class="input-filed login-input-wrap">
            <input name="userName" v-model="userName" v-validate.initial="userName" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('userName') }" type="text" placeholder="请输入用户">
            <span v-show="errors.has('userName')" class="is-danger">用户名{{ errors.first('userName') }}</span>
          </div>
        </div>
        <div class="login-row">
          <!--<label class="label">密码：</label>-->
          <div class="input-filed login-input-wrap">
            <input name="password" v-model="password" v-validate.initial="password" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="请输入密码">
            <span v-show="errors.has('password')" class="is-danger">密码{{ errors.first('password') }}</span>
          </div>
        </div>


        <div class="submit-btn-wrap">
          <button class="btn btn-larger btn-block" type="submit">提交</button>
        </div>
      </form>
    </div>
</template>
<style lang="sass">
  .login-wrap
    background: #f0efed
    position: absolute
    bottom: 42px
    top: 43px
    width: 100%
    .login-row
      margin: .95rem 0
    .login-input-wrap
      background: #fff
      padding: .5rem
      input
        border: none
        padding: .4rem
        width: 100%
        display: block
        box-sizing: border-box
        &:focus
          border: none
          outline: none
          background: #ececec
  .submit-btn-wrap
    padding: .5rem
</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import validator from '../../utils/validation.js'
    export default{
        methods : {
         validateBeforeSubmit() {
            let _this = this;
            // Validate All returns a promise and provides the validation result.
            this.$validator.validateAll().then(success => {
                if (!success) {
                    // handle error
                    return;
                }
                let user = {
                userName : this.$store.getters.getLoginUserName, //这个是不正确的//this.$store.state.user.password
                password : this.$store.getters.getLoginPassword
              }
              let obj = {
                user : user,
                callback : function(){ //验证是否登录成功
                  let loginErrorInfo = _this.$store.getters.getLoginErrorInfo
                  let isLogin = _this.$store.getters.getIsLogin
                  if(loginErrorInfo.code == 401 && isLogin == false){
                    _this.$router.push({ path: '/manFail/user/login' })
                  }else{
                    _this.$router.push({ path: '/manFail/user/manage' })
                  }
                }
              }
              this.$store.dispatch('login',obj)

            });
        }
         /* submit () {
          this.$validator.validateAll();

            var user = {
              user : this.$store.state.user.userName,
              password : this.$store.state.user.password
            }
            this.$store.dispatch('login',user)
          }*/
        },
        computed : {
           /*...mapGetters({
            user : "getUser"
          })*/
          userName : {
            get () {
              return this.$store.getters.getLoginUserName
            },
            set (value) {
              this.$store.commit('CHANGE_USER_NAME',value);
            }
          },
          password : {
            get () {
              return this.$store.getters.getLoginPassword
            },
            set (value) {
              this.$store.commit('CHANGE_USER_PASSWORD',value);
            }
          }
        }
    }
</script>
