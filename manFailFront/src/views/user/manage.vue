<template>
    <div class="user">
        <div class="user-top">
          <div>
            <p>
              <a href="javascript:;">
                <img src="">
              </a>
            </p>
            <p>
              <span>用户名</span>
            </p>
          </div>
          <div>
            <router-link to="/user/login">登录</router-link>
          </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        mounted () {
          this.$store.dispatch('fetchUserInfo')
        }
    }
</script>
