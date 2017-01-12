<template>
  <div class="article-detail">
    <div class="article-head">
      <h1 class="title" v-text="detail.articleTitle"></h1>
      <div>
        <label>作者：</label>
        <span>{{detail.articleAuthor}}</span>
      </div>
      <div class="time">
        <label>创建时间：</label>
        <span>{{detail.createTime | time('YYYY-MM-DD HH:mm:ss')}}</span>
      </div>
      <div v-if="detail.updateTime != null" class="time">
        <label>更新时间：</label>
        <span>{{detail.updateTime | time}}</span>
      </div>
      <div class="desc">
        {{detail.articleDesc}}
      </div>

    </div>
    <div class="article-content" v-html='detail.articleContent'>
    </div>
    <!--评论按钮-->
    <div class="comment-content-btn">
      <div class="left" @click="showComment">
        <span class="icon iconfont">&#xe653;</span>
        <span>评一下</span>
      </div>
      <router-link class="right" :to="{name:'articleComment',params:{id:comment.articleId}}">
        <span class="icon iconfont">&#xe689;</span>
        <span>123</span>
      </router-link>
    </div>
    <!--评论内容-->
    <div class="comment-content-wrap" v-show="isShowComment">
      <div class="comment-content-cover" @click="hideComment"></div>
      <div class="comment-content">
        <textarea rows='3' cols='20' class="comment-text" v-focus="isShowComment" v-model="commentText"></textarea>
        <div class="comment-tools">
          <a href="javascript:;" class="publish-btn" @click="publishComment">发表</a>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  .article-detail {
    background: #eceef0;
  }

  .article-head {
    padding: 0.8rem;
    background: #fff;
    .title {
      padding: 0.66rem 0;
      font-size: 1.3rem;
    }
    .time {
      padding: .4rem 0;
    }
    .desc {
      padding: .66rem 0;
    }
  }

  .article-content {
    padding: .8rem;

  }

  .comment-content-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 42px;
    width: 100%;
    background: #fff;
    z-index: 101;
    border-top: 1px solid #ececec;
    display: box;
    display: -webkit-box;
    padding-left: 1rem;
    padding-right: 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .left {
      -webkit-box-flex: 1.0;
      display: box;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: start;
    }
    .right {
      width: 30%;
      display: box;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: end;
    }
  }
  .comment-content {
    background: #fff;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 104;
    .comment-text {
      resize: none;
      display: block;
      margin: auto;
      width: 100%;
      border: none;
      background: #ececec;
      outline: none;
      padding: .5rem;
      box-sizing: border-box;
    }
    .comment-tools {
      padding: 1rem 0;
      text-align: right;
      .publish-btn {
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #a5a2a2;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        padding: 5px 10px;
        color: #a5a2a2;
      }
    }

  }

  .comment-content-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 102;
    background: transparent;
  }

  .comment-content-cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 103;
    background: rgba(0, 0, 0, 0.67);
  }

</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

    export default{
        data(){
            return{
              isShowComment : false
            }
        },
        mounted () {
          var id = this.$route.params.id;
          this.$store.dispatch('fetchArticleDetail',id)
           let obj = {
              articleId : id,
              userId : "",
              commentText : ""
            };

          this.$store.commit("UPDATE_ARTICLE_COMMENT",obj)
        },
        computed : {
          ...mapGetters({
            detail : "getArticleDetail",
            comment : "getArticleComment"
          }),
          commentText : {
            get () {
              return this.$store.state.article.comment.commentText;
            },
            set (value) {
              this.$store.commit('UPDATE_ARTICLE_COMMENT_TEXT',value);
            }
          }
        },
        methods : {
        /*  ...mapActions ({
          }),*/
          showComment (){
            this.isShowComment = true;
          },
          hideComment () {
            this.isShowComment = false;
          },
          publishComment () {
            this.$store.dispatch('submitArticleComment',this.$store.state.article.comment)
          }
        },
        directives: {
            focus: {
                update: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        }
    }

</script>
