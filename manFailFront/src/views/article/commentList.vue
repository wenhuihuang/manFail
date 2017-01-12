<template>
    <div>
        <div>
          内容
        </div>
        <div>
          <span>作者</span>
          <span>2017.01.10</span>
        </div>
        <ul>
          <li v-for="comment in comments">
            <img>
            <div class="content">
              <p>姓名</p>
              <p>{{comment.createDate | time}}</p>
              <p v-text="comment.commentText"></p>
            </div>
            <div>
              <span>88</span>
              <span class="icon"></span>
            </div>
          </li>
        </ul>
    </div>
</template>
<style>

</style>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    export default{
        mounted () {
          var id = this.$route.params.id;
          this.$store.dispatch('fetchArticleCommentList',id)

        },
        computed : {
          ...mapGetters({
            comments : "getArticleComments"
          })
        }
    }
</script>
