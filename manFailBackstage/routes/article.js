var express = require('express');
var router = express.Router();
var articleCtrl = require('../controllers/articleCtrl');
var userCtrl = require('../controllers/userCtrl');
var multipart = require('connect-multiparty');
//设置跨域访问
/*router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/
router.get('/add', userCtrl.loginRequired,articleCtrl.add);
router.get('/list',userCtrl.loginRequired,userCtrl.adminRequired,articleCtrl.list);
router.get('/update/:id',articleCtrl.update);
router.get('/detail/:id',articleCtrl.detail);
router.post('/addSubmit',multipart(), articleCtrl.addSubmit);
router.post('/del',articleCtrl.del);

/*json 传递到前台api*/
router.get('/apiList',articleCtrl.apiList);
router.get('/apiDetail/:id',articleCtrl.apiDetail);

router.post('/apiSubmitComment',articleCtrl.submitComment);
router.post('/apiCommentList',userCtrl.jwtAuth,articleCtrl.commentList);
router.post('/apiLikes',articleCtrl.likes);
router.post('/apiAddLike',userCtrl.jwtAuth,articleCtrl.addLike);

module.exports = router;
