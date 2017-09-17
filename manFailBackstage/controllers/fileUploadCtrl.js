/**
 * Created by hui on 2016-12-29.
 */
var fs = require('fs');
var path = require('path');

var util = require('../util/util');
var multiparty = require('multiparty')

var fileUploadCtrl = {
    /**
     * 通过表单上传图片
     * @param req
     * @param res
     * @param callback
     */
    upload : function(req, res,callback){
        console.log(req.files.fileName)
        if(req.files.fileName.size <= 0){
            callback(false)
            return;
        }
        // res.send(req.body,req.files,req.files.file.path);
        //get filename
        var filename = req.files.fileName.originalFilename || path.basename(req.files.fileName.path);
        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        console.log(d.toString().length)
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length)

        //copy file to a common directory
        if(!fs.existsSync('public/images/'+subDir+'/')){
            fs.mkdirSync('public/images/'+subDir+'/')
        }
        var targetPath = 'public/images/'+subDir+'/' +subDir+t+'.'+ filename.split('.')[1];
        //copy file
        fs.createReadStream(req.files.fileName.path).pipe(fs.createWriteStream(targetPath));
        //return file url
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
        callback('/images/'+subDir+'/' + +subDir+t+ '.'+filename.split('.')[1])
    },
    base64Upload : function (req,res,callback) {
      /* var form = new multiparty.Form();
        form.parse(req,function (err,fields,files) {
            console.log(fields)
        })*/

        var params = req.body || req.params;
        var imgData = params.imgData.replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer = new Buffer(imgData,"base64");

        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length)
        //如果文件夹是空就创建文件夹
        if(!fs.existsSync('public/images/'+subDir+'/')){
            fs.mkdirSync('public/images/'+subDir+'/')
        }
        fs.writeFile('public/images/'+subDir+'/'+subDir+t+'.png',dataBuffer,function (err) {
            if(err){
                res.send(err)
            }else{
                callback('/images/'+subDir+'/'+subDir+t+'.png');
                //res.send('保存成功！')
            }
        })

    }, //用绝对路径删除文件
    delFile : function(url){
        var filePath = 'public'+url;
        fs.unlinkSync(filePath);
    }, //用相对路径删除文件
    delFileTwo : function (url) {
        fs.unlinkSync("public"+url);
    }
}

module.exports = fileUploadCtrl;
