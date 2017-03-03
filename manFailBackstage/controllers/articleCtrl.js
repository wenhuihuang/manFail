var articleDao = require('../dao/articleDao');
var util = require('../util/util');

var articleCtrl = {
    add : function (req,res,next) {
        res.render('article/add',{
            title : '增加文章',
            article : { //初始化值 要不页面会报错
                id : '',
                articleTitle : '',
                articleDesc : '',
                articleContent : ''
            }
        })
    },
    addSubmit : function (req,res,next) {
        var params = req.body || req.params;
        if(params.id != null && params.id != "" && params.id != undefined){
            articleDao.update(req,res,next);
        }else{
            articleDao.add(req,res,next);
        }
        res.redirect('/newBack/article/list');
    },
    list : function (req,res,next) {
        articleDao.queryAll(req,res,function (result) {
           res.render('article/list',{
               title : '文章列表',
               lists : result,
               util : util
           })
        },next);

    },
    apiList : function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*");
        articleDao.queryAll(req,res,function (result) {
            util.responseJONS(res,result);
        },next);

    },
    apiDetail : function (req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        articleDao.qureyById(req,res,function (result) {
            console.log(result)
            util.responseJONS(res,result[0]);
        },next)
    },
    update : function (req,res,next) {
        articleDao.qureyById(req,res,function (result) {
            res.render('article/add',{
                title : '修改文章',
                article : result[0]
            })
        },next)
    },
    del : function (req,res,next) {
        articleDao.del(req,res,next);
    },
    detail : function (req,res,next) {
        
    },
    submitComment : function (req,res,next) {
       articleDao.addComment(req,res,next);
    },
    commentList : function (req,res,next) {
        articleDao.commentList(req,res,next);
    },
    likes : function (req,res,next) {
        articleDao.likes(req,res,next);
    },
    addLike : function (req,res,next) {
        articleDao.addLike(req,res,next)
    }
}
module.exports = articleCtrl;
