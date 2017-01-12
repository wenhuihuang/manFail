<template>
    <div id='bottom' class="bottom">
        <div class="menu-item">
           <a href="javascript:;" @click="clickAction('/article/list','0')" :class="{ active : current.index == 0 ? 1 : 0 }">
               <p><i class="icon iconfont" >&#xe751;</i></p>
               <p>首页</p>
           </a>
        </div>
        <div class="menu-item">
            <a href="javascript:;" @click="clickAction('/life/list','1')" :class="{ active : current.index == 1 ? 1 : 0 }">
                <p><i class="icon iconfont" >&#xe751;</i></p>
                <p>生活</p>
            </a>
        </div>
        <div class="menu-item">
            <a href="javascript:;" @click="clickAction('/shopping/list','2')" :class="{ active : current.index == 2 ? 1 : 0 }">
                <p><i class="icon iconfont" >&#xe751;</i></p>
                <p>购物</p>
            </a>
        </div>
        <div class="menu-item">
            <a href="javascript:;" @click="clickAction('/user/manage','3')" :class="{ active : current.index == 3 ? 1 : 0 }">
                <p><i class="icon iconfont" >&#xe606;</i></p>
                <p>我</p>
            </a>
        </div>
    </div>
</template>
<style lang="scss">
    .bottom{
        background:#fff;
        position: fixed;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        display:box;
        height:42px;
        display:-webkit-box;
        -webkit-box-align:center;
      a{
        color:#000;
        &.active{
          color:#536fdc;
        }
      }
    }
    .bottom .menu-item{
        -webkit-box-flex:1.0;
        text-align: center;
    }
   /* a.router-link-active{
      color:#536fdc;
    }*/
</style>
<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
    export default{
      data(){
          return{

          }
      },
      computed: {
        ...mapGetters({
          current: 'getBottomBtnCurrent'
        })
      },
      methods : {
         ...mapActions({
            changeActive : 'changeBottomBtnActives',
            changeCurrent:'changeBottomBtnCurrent'
          }),
          clickAction  (url,ac) {
            this.$router.push(url)
            this.changeCurrent({index:ac,url:url})
            this.changeActive({index:ac,url:url})
          }
      },
      mounted () {
        this.changeCurrent({index:0,url:"/article/list"})
        this.changeActive({index:0,url:"/article/list"})
      }
    }
</script>
