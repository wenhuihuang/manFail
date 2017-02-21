<template>
    <div class="nickname-modify">
      <form @submit.prevent="submit">
        <div class="input-filed nickname-input-wrap">
          <input name="phone" v-model="phone" v-validate.initial="phone" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="请输入昵称">
          <span v-show="errors.has('phone')" class="is-danger">昵称{{ errors.first('phone') }}</span>
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

    export default{
      data () {
        return {
          //nickname : ""
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
                  phone : this.phone
                }
              this.$store.dispatch('updatePhone',obj);
            });

        }
      },
      computed : {
        ...mapGetters({
            userInfo : "getUser"
          }),
          phone : {
            get () {
              return this.$store.getters.getUser.phone;

            },
            set (value) {
              this.$store.dispatch('changePhone', value);
            }
          }
      },
      mounted () {
        this.$store.dispatch('fetchUserInfo')
      }
    }
</script>
