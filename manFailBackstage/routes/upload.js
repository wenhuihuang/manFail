/**
 * Created by hui on 2016-12-29.
 */
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path');
var fileUploadCtrl = require('../controllers/fileUploadCtrl');

//router.post('/fileUpload', multipart(),fileUploadCtrl.upload)
router.post('/fileUpload', multipart(), fileUploadCtrl.upload);

module.exports = router;
