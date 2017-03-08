<template>
    <div id='top' v-bind:class="classObject">
       <span class="top-back" v-on:click="back"><i class="icon iconfont">&#xe779;</i></span>
       <h4 class="top-title">{{topTitle}}</h4>
       <span class="top-menu"><i class="icon iconfont">&#xe790;</i></span>
    </div>
</template>
<style lang="css" rel="stylesheet/css">
    a{
        text-decoration: none;
    }
    .top{
        height:42px;
        line-height: 42px;
        display: -webkit-box;
        border-bottom:1px solid #333;
        position: fixed;
        left:0;
        right:0;
        width:100%;
        top:0;
        background:#fff;
        z-index:100;
      -webkit-transition: all .6s;
      -moz-transition: all .6s;
      -ms-transition: all .6s;
      -o-transition: all .6s;
      transition: all .6s;
    }
    .top-hidden{
    transform: translate3d(0,-44px,0)
    }
    .top-back,.top-menu{
        width:50px;
        display: block;
        text-align: center;
    }
    .top-title{
        -webkit-box-flex:1.0;
        margin:0;
        text-align:center;
    }

</style>
<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
    export default{
        computed : {
          ...mapGetters({
            topTitle: 'getTopTitle',
            touchDirection : 'getTouchDirection'
          }),
          classObject () {
            return {
              'top' : true,
              'top-hidden' : this.touchDirection == "up"
            }
          }
        },
        methods : {
          back ()  {
             this.$router.back()

          // this.$store.dispatch("changeBottomBtnCurrent()")


          }
        }
    }
</script>
