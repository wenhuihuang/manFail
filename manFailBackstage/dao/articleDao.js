var mysql = require('mysql');
var db = require('../conf/db');
var articleSql = require('../sqlMap/articleSql');
var articleCommentSql = require('../sqlMap/articleCommentSql');
var likesSql = require('../sqlMap/likesSql');
var util = require('../util/util');

var fileUploadCtrl = require('../controllers/fileUploadCtrl');

//定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    add : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body || req.params;
            var nowDate = new Date();
            params.createTime = nowDate.toLocaleDateString()+" "+nowDate.toLocaleTimeString();
            params.updateTime = nowDate.toLocaleDateString()+" "+nowDate.toLocaleTimeString();
            if(req.session.user){
                params.articleAuthor = req.session.user.userName;
            }

            fileUploadCtrl.upload(req,res,function(result){
                params.minIcon = result;
            })

            connection.query(articleSql.insert,[params.articleTitle,params.createTime,params.updateTime,params.articleDesc,params.articleAuthor,params.articleContent,params.minIcon],function (err,result) {
                if(err) console.log(err);
                if(result){
                    result = {
                        code : 200,
                        msg : '增加成功！'
                    }
                }
               // util.responseJONS(res,result)
                //释放连接
                connection.release();

            })
        })
    },
    del : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var params = req.body || req.params;
            connection.query(articleSql.delById,[params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    result = {
                        code : 200,
                        msg : '删除成功！'
                    }
                    util.responseJONS(res,result);
                }
                //释放连接
                connection.release();
            })
        })
    },
    update : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var params = req.body || req.params;
            var nowDate = new Date();
            params.updateTime = nowDate.toLocaleDateString()+" "+nowDate.toLocaleTimeString();

            fileUploadCtrl.upload(req,res,function(result){

                if(result){
                    params.minIcon = result;
                }
            })

            connection.query(articleSql.update,[params.articleTitle,params.updateTime,params.articleDesc,params.articleAuthor,params.articleContent,params.minIcon,params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    result = {
                        code : 200,
                        msg : '修改成功！'
                    }

                }
                //释放连接
                connection.release();
            })
        })
    },
    queryAll : function (req,res,callback,exit) { // 这里要用一个回调函数将查询出来的值传出去到外面用  不能用return 因为这个是一个回调函数
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            connection.query(articleSql.queryAll,function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                    console.log(result.length)
                }

                //释放连接
                connection.release();
            })
        })
    },
    qureyById : function (req,res,callback,next) {
        var params = req.params;
        var id = params.id;
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            connection.query(articleSql.queryById,[id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        })
    },
    addComment : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body || req.params;
            console.log(params)
            var nowDate = new Date();
            params.createDate = nowDate.toLocaleDateString()+" "+nowDate.toLocaleTimeString();

            connection.query(articleCommentSql.insert,[params.articleId,params.userId,params.commentText,params.createDate],function (err,result) {
                if(err) console.log(err);
                if(result){
                    result = {
                        code : 200,
                        msg : '增加成功！'
                    }
                }
                 util.responseJONS(res,result)
                //释放连接
                connection.release();

            })
        })
    },
    commentList : function (req,res,next) {
        var params = req.body;
        var id = params.id;
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var allLikes;
            //查出文件的所有评论
            connection.query(articleCommentSql.queryByArticleId,[id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    //先按文章id查出评论点赞
                    connection.query(likesSql.queryByArticleId,[id],function (err,resu) {
                        if(err) console.log(err);

                        allLikes=resu;

                        for(var i = 0,resultLength=result.length; i < resultLength;i++){
                            for(var j = 0,likesLength=allLikes.length; j < likesLength;j++){
                                //匹配当前文章的每一条评论的点赞记录
                                if(result[i].id == allLikes[j].commentId && result[i].articleId == allLikes[j].articleId){
                                    result[i].likes= result[i].likes instanceof Array ?  result[i].likes.concat([allLikes[j]]) : [allLikes[j]];

                                    //判断当前的评论该用户是否点赞过
                                    console.log(allLikes[j].userId)
                                    console.log(req.userId)
                                    if(allLikes[j].userId == req.userId){
                                        result[i].like = true
                                    }else if(!result[i].like){
                                        result[i].like = false;
                                    }
                                }


                            }
                        }



                        util.responseJONS(res,result);

                    })

                }

                //释放连接
                connection.release();
            })
        })
    },
    addLike : function (req,res,next) {
        console.log(req.body)
        var params = req.body || req.params;
        var _this = this;
        pool.getConnection(function (err,connection) {

            connection.query(likesSql.queryBycommentIdArticleUserId,[params.commentId,params.articleId,req.userId],function (err,result) {
                if(err) console.log(err);
                if(result && result.length > 0){
                    //如果点赞了则取消点赞
                    connection.query(likesSql.delById,[result[0].id],function (err,result) {
                        if(err) console.log(err);
                        if(result){

                            /*res.json({
                                articleId : params.articleId,
                                commentId : params.commentId,
                                like : false
                            })*/
                            req.body.id=params.articleId;
                            _this.commentList(req,res,next)
                        }
                    })

                }else{
                    //如果没有点赞过则点赞
                    connection.query(likesSql.insert,[params.commentId,parseInt(params.articleId),1,util.formatDate(Date.now()),req.userId],function (err,result) {
                       /* res.json({
                            articleId : params.articleId,
                            commentId : params.commentId,
                            like : true
                        })*/
                        req.body.id=params.articleId;
                        _this.commentList(req,res,next)
                    })
                }

            })


        })
    },
    delLike : function (req,res,next) {
        var params = req.body || req.params;
        console.log(params)
        pool.getConnection(function (err,connection) {
            connection.query(likesSql.queryByArticleId,[params.commentId],function (err,result) {

            })
        })
    },
    _likeCount : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query(likesSql.count,[params.commentId],function (err,result) {

            })
        })
    }
}