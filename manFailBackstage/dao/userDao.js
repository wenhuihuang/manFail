var mysql = require('mysql');
var db = require('../conf/db');
var userSql = require('../sqlMap/userSql');
var util = require('../util/util');
var fileUploadCtrl = require('../controllers/fileUploadCtrl');

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
        var _this = this
        pool.getConnection(function (err,connection) {
            if(err) console.log(err);
            var params={};
            if(req.userId){
                params.userId=req.userId
            }else{
                params = req.body || req.params;
            }
            _this._responseUserInfo(connection,userSql.queryById,params.userId,res)

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
    },
    uploadHeadImg : function (req,res,next) {
        var params = req.body || req.params;
        var userId = params.userId;
        var headImgOld = "";
        fileUploadCtrl.base64Upload(req,res,function (url) {
            pool.getConnection(function (err,connection) {
                if (err) console.log(err);
                connection.query(userSql.queryById,[userId],function (err,result) {
                    if(err) console.log(err);
                    if(result[0].headImg != null && result[0].headImg !="" && result[0].headImg != undefined){
                        headImgOld=result[0].headImg;
                    }
                })

                connection.query(userSql.updateHeadImg,[url,userId],function (err,result) {
                    if(err) console.log(err);
                    if(result){

                        if(headImgOld != null && headImgOld !="" && headImgOld != undefined){
                            fileUploadCtrl.delFileTwo(headImgOld)
                        }

                        res.send({"code":200,"msg":"修改头像成功！","headImg": url})
                    }

                    //释放连接
                    connection.release();
                })
            })

        })
    },
    updateNickname : function (req,res) {
        var _this = this;
        var params = req.body || req.params;
        pool.getConnection(function (err,connection) {
            if(err) console.log(err)
            connection.query(userSql.updateNickname,[params.nickname,params.userId],function(err,result){
                if(err) console.log(err);
                if(result){
                    _this._responseUserInfo(connection,userSql.queryById,params.userId,res)
                }

                //connection.release();
            })

        })
    },
    /**
     * 修改生日
     * @param req
     * @param res
     */
    updateBirthday : function (req,res) {
        var _this = this;
        var params = req.body || req.params;
        pool.getConnection(function (err ,connection) {
            if(err) console.log(err) ;
            connection.query(userSql.updateBirthday,[params.birthday,params.userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    _this._responseUserInfo(connection,userSql.queryById,params.userId,res)
                }
               // connection.release();
            })
        })
    },
    updatePhone : function (req,res) {
        var _this = this;
        var params = req.body || req.params;
        console.log(params)
        console.log(params.phone)
        pool.getConnection(function (err ,connection) {
            if(err) console.log(err) ;
            connection.query(userSql.updatePhone,[params.phone,params.userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    _this._responseUserInfo(connection,userSql.queryById,params.userId,res)
                }
                // connection.release();
            })
        })
    },
    /**
     * 查出用户信息 并返回
     * @param connection
     * @param sql
     * @param userId
     * @param res
     * @private
     */
    _responseUserInfo : function (connection,sql,userId,res) {
        connection.query(sql,[userId],function (err,result) {
            if(err) console.log(err);
            if(result){
                util.responseJONS(res,{
                    userId : result[0].userId,
                    userName : result[0].userName,
                    gender : result[0].gender,
                    phone : result[0].phone,
                    role : result[0].role,
                    headImg : result[0].headImg,
                    nickname : result[0].nickname,
                    birthday : result[0].birthday
                });
            }

            //释放连接
            connection.release();
        })
    }

}