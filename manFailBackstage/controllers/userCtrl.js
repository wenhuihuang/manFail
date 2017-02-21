var userDao = require('../dao/userDao');
var jwt = require('jwt-simple')
var moment = require('moment')


var userCtrl = {
    addUser : function (req,res,next) {
        res.render('user/userAdd',{
            title : '增加用户'
        })
    },
    addUserSubmit : function (req,res,next) {
        userDao.add(req,res,next);
        res.redirect('/user/list');
    },
    userList : function (req,res,next) {
       userDao.queryAll(req,res,function (result) {
           res.render('user/userList',{
               title : '用户列表',
               lists : result
           })
        },next);

    },
    updateUser : function (req,res,next) {
        userDao.update(req,res,next);
    },
    delUser : function (req,res,next) {
        userDao.del(req,res,next);
    },
    login : function (req,res,next) {
            res.render('user/login',{
                title : '用户登录'
            })
    },
    loginSubmit : function (req,res,next) {
        userDao.queryByUserName(req,res,function (result) {
            var params = req.body || req.params;
            var pwdText = params.password;
            console.log(pwdText)
            if(result.length > 0){
                var userName = result[0].userName;
                var pwd = result[0].password;
                console.log(pwd)
                if(pwdText == pwd){
                    req.session.user = {
                        userName : result[0].userName,
                        id : result[0].userId
                    }
                    res.redirect('/newBack/article/add');
                }

            }else{
                res.redirect('/newBack/user/login');
            }

        },next)
    },
    loginRequired : function (req,res,next) {
        var user = req.session.user;
        if(!user){
            res.redirect('/newBack/user/login');
        }else{
            next();
        }
    },
    adminRequired : function (req,res,next) {
        var user = req.session.user;
        console.log(user)
        if(user.userName != 'admin'){
            res.redirect('/newBack/user/login');
        }else{
            next();
        }
    },
    apiLogin : function (req,res,next) {
        var params = req.body || req.params;
        var pwdText = params.password;
        userDao.queryByUserName(req,res,function (result) {
            var params = req.body || req.params;
            var pwdText = params.password;
            console.log(pwdText)
            console.log(result)
            if(result.length > 0){
                var userName = result[0].userName;
                var pwd = result[0].password;
                console.log(pwd)
                if(pwdText == pwd){
                    console.log('成功')
                    //如果验证成功
                    var expires = moment().add(0.5,'days').valueOf();
                    /**
                     * 这个结构被称为JWT Claims Set。这个iss是issuer的简写，表明请求的实体，可以是发出请求的用户的信息。exp是expires的简写，是用来指定token的生命周期
                     * @type {String}
                     */
                    var token = jwt.encode({
                        iss : result[0].userId,
                        exp : expires
                    },
                        'newsFront' //newsFront
                    );
                    res.json({
                        token : token,
                        expires : expires,
                        user : {
                            userId : result[0].userId,
                            userName : result[0].userName
                        }
                    })
                }

            }else{
                res.send("登录失败",401)
            }

        },next)
    },
    jwtAuth : function (req,res,next) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        if(token){
            try{
                var decoded = jwt.decode(token,'newsFront') //newsFront
                if(decoded.exp <= Date.now()){
                    res.end('Access token has expired',400);
                }
                req.userId = decoded.iss
                userDao.queryById(req,res)

            }catch (err){
                return next();
            }
        }else{
            next();
        }
    },
    uploadHeadImg : function (req,res,next) {
        userDao.uploadHeadImg(req,res,next);
    },
    updateNickname : function (req,res) {
        userDao.updateNickname(req,res)
    },
    updateBirthday : function (req,res) {
        userDao.updateBirthday(req,res);
    },
    updatePhone : function (req,res) {
        userDao.updatePhone(req,res)
    }
}
module.exports = userCtrl;
