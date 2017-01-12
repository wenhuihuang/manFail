<template>
    <div id='top' class="top">
       <span class="top-back" v-on:click="back"><i class="icon iconfont">&#xe779;</i></span>
       <h4 class="top-title">标题</h4>
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
    export default{
        data(){
            return{
                msg:'hello vue'
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
