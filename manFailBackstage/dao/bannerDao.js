var mysql = require('mysql');
var db = require('../conf/db');
var bannerSql = require('../sqlMap/bannerSql');
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
            params.createDate = nowDate.toLocaleDateString()+" "+nowDate.toLocaleTimeString();
            fileUploadCtrl.upload(req,res,function(result){
                params.url = result;
            })
            connection.query(bannerSql.insert,[params.title,params.url,params.createDate],function (err,result) {
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
            var url;
            connection.query(bannerSql.queryById,[params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    url = result[0].url;
                }
            })


            connection.query(bannerSql.delById,[params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    fileUploadCtrl.delFile(url)
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
            connection.query(bannerSql.update,[params.title,params.url,params.id],function (err,result) {
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
            connection.query(bannerSql.queryAll,function (err,result) {
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
            connection.query(bannerSql.queryById,[id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        })
    }
}