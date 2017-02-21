var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
var multipart = require('connect-multiparty');

router.get('/add', userCtrl.addUser);
router.get('/list',userCtrl.userList);
router.get('/login',userCtrl.login);
router.post('/loginSubmit',userCtrl.loginSubmit);
router.post('/addUserSubmit', userCtrl.addUserSubmit);
router.post('/update',userCtrl.updateUser);
router.post('/del',userCtrl.delUser)

router.post('/apiLogin',userCtrl.apiLogin)
router.post('/apiUserInfo',userCtrl.jwtAuth)

router.patch('/apiUploadHeadImg',multipart(),userCtrl.uploadHeadImg)
router.post('/apiUpdateNickname',userCtrl.updateNickname)
router.post('/apiUpdateBirthday',userCtrl.updateBirthday)
router.post('/apiUpdatePhone',userCtrl.updatePhone)

module.exports = router;
