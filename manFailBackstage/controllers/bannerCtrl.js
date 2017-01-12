var bannerDao = require('../dao/bannerDao');
var util = require('../util/util');

var bannerCtrl = {
    add : function (req,res,next) {
        res.render('banner/add',{
            title : '增加banner图片',
            banner : { //初始化值 要不页面会报错
                id : '',
                title : '',
                url : ''
            }
        })
    },
    addSubmit : function (req,res,next) {
        var params = req.body || req.params;
        console.log(params.id)


        if(params.id != null && params.id != "" && params.id != undefined){
            bannerDao.update(req,res,next);
        }else{
            bannerDao.add(req,res,next);
        }
        res.redirect('/newBack/banner/list');
    },
    list : function (req,res,next) {
        bannerDao.queryAll(req,res,function (result) {
           res.render('banner/list',{
               title : 'banner列表',
               lists : result,
               util : util
           })
        },next);

    },
    apiList : function (req,res,next) {
        res.header("Access-Control-Allow-Origin", "*");
        bannerDao.queryAll(req,res,function (result) {
            util.responseJONS(res,result);
        },next);

    },
    apiDetail : function (req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        bannerDao.qureyById(req,res,function (result) {
            console.log(result)
            util.responseJONS(res,result[0]);
        },next)
    },
    update : function (req,res,next) {
        bannerDao.qureyById(req,res,function (result) {
            res.render('banner/add',{
                title : '修改文章',
                banner : result[0]
            })
        },next)
    },
    del : function (req,res,next) {
        bannerDao.del(req,res,next);
    },
    detail : function (req,res,next) {
        
    }
}
module.exports = bannerCtrl;
