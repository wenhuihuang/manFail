<template>
    <div class="nickname-modify">
      <form @submit.prevent="submit">
        <div class="input-filed nickname-input-wrap">
          <input name="birthday" v-model="birthday"  v-validate.initial="birthday" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('birthday') }" type="date" placeholder="请输入昵称">
          <span v-show="errors.has('nickname')" class="is-danger">昵称{{ errors.first('nickname') }}</span>
        </div>
        <div class="input-filed">
          <p class="tips-text">昵称不为小于1个字符</p>
        </div>
        <div class="input-filed text-center submit-btn-wrap" >
          <input type="submit" value="修改" class="btn btn-larger btn-block" />
        </div>
      </form>
    </div>
</template>
<style lang="sass">
  .nickname-modify
    background: #f0efed
    position: absolute
    bottom: 42px
    top: 43px
    width: 100%
    .nickname-input-wrap
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
    .tips-text
      text-align: left
      padding: .6rem
      font-size: .8rem
    .submit-btn-wrap
      padding: .5rem

</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import validator from '../../utils/validation.js'
    import utils from '../../utils/utils.js'
    export default{
      data () {
        return {
          //birthday : ''
        }
      },
      methods : {
        submit ()  {
          this.$validator.validateAll().then(success => {
                if (! success) {
                    // handle error
                    return;
                }
                let obj = {
                  userId : this.$route.params.id,
                  birthday : this.birthday
                }
              this.$store.dispatch('updateBirthday',obj);
            });

        }
      },
      computed : {
        ...mapGetters({
            userInfo : "getUser"
          }),
          birthday : {
            get () {
              return utils.timeFormat(this.$store.getters.getUser.birthday,'YYYY-MM-DD');
            },
            set (value) {
              this.$store.dispatch('changeBirthday',value);
            }
          }
      },
      mounted () {
        this.$store.dispatch('fetchUserInfo')
      }
    }
</script>
