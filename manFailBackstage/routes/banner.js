/**
 * Created by hui on 2016-12-28.
 */
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var bannerCtrl = require('../controllers/bannerCtrl');

router.get('/add', bannerCtrl.add);
router.get('/list', bannerCtrl.list);
router.post('/addSubmit', multipart(),bannerCtrl.addSubmit);
router.post('/del',bannerCtrl.del)

/*json 传递到前台api*/
router.get('/apiList',bannerCtrl.apiList);


module.exports = router;