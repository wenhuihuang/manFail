

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
      startX: 0,
      startY : 0,
      moveEndX : 0,
      moveEndY : 0
    }
  },
  components : {
    top : Top,
    bottom : Bottom,
  },
  methods : {
    touchEvent () {
    let _this = this;

    // scroll
    let sign = 0;//定义默认的向上滚与向下滚的边界
    window.onscroll = window.onresize = function(){
      let  oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
      if ( oScrollTop > sign) {
        sign =  oScrollTop;//更新scrollTop
        _this.$store.dispatch('changeTouchDirection','up')
        console.log('向上')

      }
      if ( oScrollTop< sign) {
        sign =  oScrollTop//更新scrollTop
        _this.$store.dispatch('changeTouchDirection','down')
        console.log('向下')
      }
    }

    //touch
     /* window.addEventListener('touchstart',this.touchstartEvent);
      window.addEventListener('touchmove',this.touchmoveEvent);*/
    } ,
    touchstartEvent (ev) {
    console.log(ev)
      //ev.preventDefault();

      this.startX = ev.changedTouches[0].pageX;
      this.startY = ev.changedTouches[0].pageY;

    },
    touchmoveEvent (ev) {
      //ev.preventDefault();

      this.moveEndX = ev.changedTouches[0].pageX;
      this.moveEndY = ev.changedTouches[0].pageY;

      let difY =  this.moveEndY - this.startY;
      let difX = this.moveEndX - this.startX;

      if( Math.abs(difY) > Math.abs(difX) && difY > 0){
        this.$store.dispatch('changeTouchDirection','down')
        console.log('向下')
      }else if(Math.abs(difY) > Math.abs(difX) && difY < 0 ){
        this.$store.dispatch('changeTouchDirection','up')
        console.log('向上')
      }

     /* if( Math.abs(difY) > Math.abs(difX) && difY > 0){
        this.$store.dispatch('changeTouchDirection','down')
        console.log('向下')
      }else if(Math.abs(difY) > Math.abs(difX) && difY < 0 ){
        this.$store.dispatch('changeTouchDirection','up')
        console.log('向上')
      }else if(Math.abs(difX) > Math.abs(difY) && difX > 0){
        this.$store.dispatch('changeTouchDirection','right')
        console.log('向右')
      }else if(Math.abs(difX) > Math.abs(difY) && difX < 0 ){
        this.$store.dispatch('changeTouchDirection','left')
        console.log('向左')
      }else{
        console.log('只有触摸')
      }*/
    }
  },
  mounted () {

    this.touchEvent();
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

