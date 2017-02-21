

<template>
  <div id="app">
      <top></top>
      <div class="main">
          <router-view></router-view>
        </div>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from '../../components/top.vue'
import Bottom from '../../components/bottom.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: '中间内容'
    }
  },
  components : {
    top : Top,
    bottom : Bottom,
  }
}
</script>

<style lang="sass">
      @import "../../assets/sass/base.sass"
      @import "../../assets/sass/common.sass"
      @import "../../assets/font/iconfont.sass"

      #app
        padding-top: 42px
        padding-bottom: 42px



</style>

