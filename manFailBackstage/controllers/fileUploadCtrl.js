/**
 * Created by hui on 2016-12-29.
 */
var fs = require('fs');
var path = require('path');

var util = require('../util/util');

var fileUploadCtrl = {
    upload : function(req, res,callback){
        console.log('9090')
        console.log(req.files.fileName)
        // res.send(req.body,req.files,req.files.file.path);
        //get filename
        var filename = req.files.fileName.originalFilename || path.basename(req.files.fileName.path);
        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        console.log(d.toString().length)
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length)

        //copy file to a public directory
        if(!fs.existsSync(path.dirname(__filename).replace('\controllers','') + '/public/images/'+subDir+'/')){
            fs.mkdirSync(path.dirname(__filename).replace('\controllers','') + '/public/images/'+subDir+'/')
        }
        var targetPath = path.dirname(__filename).replace('\controllers','') + '/public/images/'+subDir+'/' + filename;
        //copy file
        fs.createReadStream(req.files.fileName.path).pipe(fs.createWriteStream(targetPath));
        //return file url
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
        callback('/images/'+subDir+'/' + filename)
    },
    delFile : function(url){
        console.log(path.dirname(__filename).replace('\controllers','')+ 'public')
        var filePath = path.dirname(__filename).replace('\controllers','') + 'public'+url;
        console.log(filePath)
        fs.unlinkSync(filePath);
    }
}

module.exports = fileUploadCtrl;

