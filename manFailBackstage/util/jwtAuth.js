/**
 * Created by hui on 2017-01-11.
 */
var jwt = require('jwt-simple');
var userDao = require('../dao/userDao');
module.exports = function (req,res,next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);
    if(token){
        try{
            var decoded = jwt.decode(token,app.get('jwtTokenSecret'));
            if(decoded.exp <= Date.now()){
                res.end('Access token has expired',400);
            }

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
                        return next()
                    }

                }

            })

        } catch (err){
            return next();
        }
    }else{
        next();
    }
}
