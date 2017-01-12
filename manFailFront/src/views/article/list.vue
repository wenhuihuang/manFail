<template>
  <div class="article">
    <!-- <div class="banner-wrap">
         <img src="../../assets/logo.png">
     </div>-->
    <carousel></carousel>
    <div class="common-line"></div>
    <div class="lists">
      <div class="list" v-for='article in list'>
        <router-link :to="{name:'articleDetail',params:{id:article.id}}">
          <div class="list-con">
            <div class="left-text">
              <p class="article-title" :title="article.articleTitle">{{article.articleTitle}}</p>
              <p class="article-info">
                <span class="classfiy">新闻</span>
                <span class='issue-time'>{{article.createTime | time}}</span>
                <span class="comment-cont">12评</span>
              </p>
            </div>
            <div class="right-img">
              <img :src="article.minIcon | proxyWebsite">
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <!--<div>
      <ul>
          <li v-for='article in articles'>{{article.title}}</li>
      </ul>
  </div>-->
</template>
<style lang="scss">
  .article{
    padding-left:1rem;
    padding-right:1rem;
  }

  .banner-wrap img {
    display: block;
    margin: 0 auto;
  }

  .list-con {
    display: box;
    display: -webkit-box;
  }

  .left-text {
    -webkit-box-flex: 1.0;
  }

  .right-img {
    width: 30%;

  }

  .right-img img {
    display: block;
    width: 80%;
    height: 4rem;
  }

  .lists {
    .list {
      padding: 10px 0;
      border-bottom: 1px solid #cdcdcd;
      .article-title {
        margin-bottom: 10px;
        font-size: 1.1rem;
      }
      .article-info {

      }
    }
    a {
      color: #000;
      &:visited {
        color: #929292;
      }
    }
  }

</style>
<script>
    import Carousel from 'components/carousel.vue'
   // import {fetchPosts} from '../../vuex/actions'
  //  import article from '../../vuex/modules/article.js'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

    export default{


        mounted(){
         this.$store.dispatch('fetchArticleList')
            // this.$http.get('/API/newBack/article/apiList', {}, { //Access-Control-Allow-Origin: *
            //     headers: {

            //     },
            //     emulateJSON: true
            // }).then(function(response){
            //     //console.log(response)
            //     //成功后
            //     if(response.status == '200'){
            //         this.articles = response.body
            //     }
            // },function(response){
            //     //失败后
            //     console.log(response);
            // })

        },
        /**
        *  ...  这个为对象展开运算符         使用对象展开运算符将 getters 混入 computed 对象中
        */
       computed:{
          ...mapGetters({
            list: 'getArticleList'
          })

       },
       /**
       *  可以用 this.$store.dispatch('xxx') 分发 aciton
       */
       methods : {

          ...mapActions({
            add : 'fetchList'
          })
       },
      components : {
          carousel : Carousel
      }
    }

</script>
