var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/add', userCtrl.addUser);
router.get('/list',userCtrl.userList);
router.get('/login',userCtrl.login);
router.post('/loginSubmit',userCtrl.loginSubmit);
router.post('/addUserSubmit', userCtrl.addUserSubmit);
router.post('/update',userCtrl.updateUser);
router.post('/del',userCtrl.delUser)

router.post('/apiLogin',userCtrl.apiLogin)
router.post('/apiUserInfo',userCtrl.jwtAuth)

module.exports = router;
