var mysql = require('mysql');
var db = require('../conf/db');
var userSql = require('../sqlMap/userSql');
var util = require('../util/util');

//定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    add : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body || req.params;
            connection.query(userSql.insert,[params.userName,params.role,params.gender,params.phone,params.password],function (err,result) {
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
            connection.query(userSql.delById,[params.userId],function (err,result) {
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
            connection.query(userSql.update,[params.userName,params.role,params.gender,params.phone,params.password,params.userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    result = {
                        code : 200,
                        msg : '修改成功！'
                    }
                    util.responseJONS(res,result);
                }
                //释放连接
                connection.release();
            })
        })
    },
    queryAll : function (req,res,callback,next) { // 这里要用一个回调函数将查询出来的值传出去到外面用  不能用return 因为这个是一个回调函数
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            connection.query(userSql.queryAll,function (err,result) {
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
    queryById : function (req,res) {
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var params={};
            if(req.userId){
                params.userId=req.userId
            }else{
                params = req.body || req.params;
            }
            connection.query(userSql.queryById,[params.userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    util.responseJONS(res,{
                        userId : result[0].userId,
                        userName : result[0].userName,
                        gender : result[0].gender,
                        phone : result[0].phone,
                        role : result[0].role
                    });
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryByUserName : function (req,res,callback,next) {
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var params = req.body || req.params;
            connection.query(userSql.queryByUserName,[params.userName],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }

                //释放连接
                connection.release();
            })
        })
    }

}