<template>
    <div>
        <!--<form  @submit.prevent="submit" >
          <input v-model="userName" v-validate.initial="userName" data-rules="required|alpha|min:3" class="form-control" type="text" placeholder="Full Name">
          &lt;!&ndash;<input type="text" name="userName" id="userName" v-model="userName" v-validate data-rules="required|email"  >&ndash;&gt;
          <input type="password" name="password" v-model="password">
          <input type="submit" value="提交">
        </form>-->
      <form  @submit.prevent="validateBeforeSubmit">
        <div class="">
          <label class="label">用户名：</label>
          <div class="input-filed">
            <input name="userName" v-model="userName" v-validate.initial="userName" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('userName') }" type="text" placeholder="请输入用户">
            <span v-show="errors.has('userName')" class="is-danger">用户名{{ errors.first('userName') }}</span>
          </div>
        </div>
        <div class="">
          <label class="label">密码：</label>
          <div class="input-filed">
            <input name="password" v-model="password" v-validate.initial="password" data-vv-rules="required|min:1" :class="{'input': true, 'is-danger': errors.has('password') }" type="text" placeholder="请输入密码">
            <span v-show="errors.has('password')" class="is-danger">密码{{ errors.first('password') }}</span>
          </div>
        </div>


        <div>
          <button class="button is-primary" type="submit">提交</button>
        </div>
      </form>
    </div>
</template>
<style>

</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import validator from '../../utils/validation.js'
    export default{
        methods : {
         validateBeforeSubmit() {
            // Validate All returns a promise and provides the validation result.
            this.$validator.validateAll().then(success => {
                if (! success) {
                    // handle error
                    return;
                }
                var user = {
                userName : this.$store.state.user.userName,
                password : this.$store.state.user.password
              }
              this.$store.dispatch('login',user)
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
              return this.$store.state.user.userName
            },
            set (value) {
              this.$store.commit('CHANGE_USER_NAME',value);
            }
          },
          password : {
            get () {
              return this.$store.state.user.password
            },
            set (value) {
              this.$store.commit('CHANGE_USER_PASSWORD',value);
            }
          }
        }/*,
        mounted () {
           this.validator = new Validator({
            email: 'required|email',
            name: 'required|alpha|min:3'
           });
          this.$set('errors', this.validator.errorBag); // update the data.
        }*/
    }
</script>
