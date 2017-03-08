<template>
  <div class="comment-list-component">
    <div class="comment-list-article-content">
      <div>
        {{article.articleTitle}}
      </div>
      <div>
        <span>{{article.articleAuthor}}</span>
        <span>{{article.updateTime | time}}</span>
      </div>
    </div>
    <div class="border-bottom">
      评论
    </div>
    <ul>
      <li v-for="comment in comments" class="comment-item">
        <div class="head-img">
          <img :src="comment.headImg | proxyWebsite"/>
        </div>
        <div class="commentList-comment-content">
          <div class="comment-content-top clearfix">
            <div class="commentList-con-top-left">
              <p class="commentList-content-name">{{comment.nickname == null || comment.nickname == '' ?
                comment.userName : comment.nickname}}</p>
              <p class="commentList-content-time">{{comment.createDate | time}}</p>
            </div>
            <div class="commentList-like like">
              <span>{{comment.likes | length}} </span>
              <span v-if="comment.like" class="icon iconfont"
                    @click="likeFn({'commentId' : comment.id,'like' : comment.like })">&#xe793;</span>
              <span v-else="comment.like" class="icon iconfont"
                    @click="likeFn({'commentId' : comment.id,'like' : comment.like })">&#xe794;</span>
            </div>
          </div>
          <div class="comment-content-bottom">
            <p v-text="comment.commentText"></p>
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>
<style lang="sass">
  .comment-list-component
    padding-left: 1rem
    padding-right: 1rem
    .comment-list-article-content
      border-bottom: 2px solid #6FADEB
      padding: 0.6rem 0
    .border-bottom
      padding: 10px 0
      border-bottom: 1px solid #eee
    .comment-item
      border-bottom: 1px solid #eee
      display: box
      display: -webkit-box
      padding: .6rem 0
      .head-img
        width: 20%
        display: flex
        display: -webkit-flex
        /*flex 垂直居中*/
        -webkit-align-items: center
        align-items: center
        /*flex 水平居中*/
        -webkit-justify-content: center
        justify-content: center
        img
          width: 60px
          height: 60px
          border-radius: 50%
          display: block

      .commentList-comment-content
        box-flex: 1.0
        -webkit-box-flex: 1.0
        .comment-content-top
          display: flex
          display: -webkit-flex
          .commentList-con-top-left
            flex: 1.0
          .commentList-like
            span
              display: inline-block
              vertical-align: middle

</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import cookieUtil from 'utils/cookieUtil'
    export default{
        mounted () {
          let id = this.$route.params.id;
          this.$store.dispatch('fetchArticleDetail',id);
          this.$store.dispatch('fetchArticleCommentList',id);
           //检查是否登录
          let token = cookieUtil.getCookie('token');
          if(token != null && token != undefined && token != ""){
            this.$store.dispatch('fetchUserInfo')
            this.$store.dispatch('changeIsShowComment',true)

          }
        },
        computed : {
          ...mapGetters({
            comments : "getArticleComments",
            article : "getArticleDetail",
            userInfo : 'getUser'
          })
        },
        methods : {
          likeFn (obj) {
            var articleId = this.$route.params.id;
            let token = cookieUtil.getCookie('token');
            var submitCompleted = this.$store.getters.getSubmitCompleted
            if(!submitCompleted){
              return;
            }
           if(token != null && token != undefined && token != ""){
                obj.articleId = articleId,
                this.$store.dispatch('like',obj)
            }else{
              this.$router.push({ path: '/manFail/user/login' })
            }

          }
        }
    }

</script>
