<template>
    <!-- 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个ref属性 -->
    <swiper :options="swiperOption" ref="mySwiperA">
        <!-- 幻灯内容 -->

        <swiper-slide v-for='item in list'><img :src="item.url | proxyWebsite" ></swiper-slide>

        <!-- ... -->
        <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
       <!-- <div class="swiper-button-next" slot="button-next"></div>-->
        <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
</template>

<script>
 import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
 import babelPolyfill from 'babel-polyfill'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'


    // custom swiper plugins(if you need to custom swiper plugins)
    // 如果你要定制一些swiper插件的话，这段代码是个示例，否则不用care
    swiperPlugins.debugger = function(swiper, params) {
      if (!params) return;
      // Need to return object with properties that names are the same as callbacks
      return {
        onInit: function(swiper) {
         // console.log('onInit');
        },
        onClick: function(swiper, e) {
         // console.log('onClick');
        },
        onTap: function(swiper, e) {
         // console.log('onTap');
        },
        // something callback...
      }
    }
  export default {
      components: {
            swiper,
            swiperSlide
          },
           name: 'carrousel',
    data() {
      return {
         swiperOption: {
            // 所有配置均为可选（同Swiper配置）
            autoplay: 3000,
           // direction : 'vertical',
            grabCursor : true,
            setWrapperSize :true,
           // autoHeight: true,
            pagination : '.swiper-pagination',
            paginationClickable :true,
           // prevButton:'.swiper-button-prev',
           // nextButton:'.swiper-button-next',
           // scrollbar:'.swiper-scrollbar',
            mousewheelControl : true,
            observeParents:true,
            // if you need use plugins in the swiper, you can config in here like this
            // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
            debugger: true,
            // swiper callbacks
            // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
            onTransitionStart(swiper){
              //console.log(swiper)
            }
            // more Swiper config ...
            // ...
          }
      }
    },
     // example code (if you need to get the current swiper object, you can find the swiper object like this, the $ref object is a ref attribute corresponding to the dom redefined)
      // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
      computed: {
      ...mapGetters({
            list: 'getBannerList'
          }),
        swiper() {
          return this.$refs.mySwiperA.swiper
        }
      },
      mounted() {
      this.$store.dispatch('fetchBannerList')
        // you can use current swiper object to do something(swiper methods)
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        //console.log('this is current swiper object', this.swiper)
        //this.swiper.slideTo(3, 1000, false)
      }
  }
</script>
<style lang="scss">
  .swiper-wrapper {
    img{
      display:block;
      margin:auto;
      width:100%;
    }
  }
</style>
