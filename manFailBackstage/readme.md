express 4.0
express node.js 应用框架
body-parser node.js 中单件，用于处理json，raw，text，和URL编码数据
cookie-parser 是一个解析cookie工具。通过req.cookies可以取到传过来的cookie，并把它们历转成对象
multer node.js 中间件，用于处理enctype="multipart/form-data"(设置的MIME编码)的表单数据

使用express-generator初始化项目目录  这个是全局安装了  使用 express + 项目目录名

启动命令放在bin下面的www脚本中  启动服务 npm start


//bower 前端包管理
.bowerrc 配置bower安装路径

localhost:3000


# 用token 做前后端加密验证 JWT   #JSON Web Tokens，简写为JWTs
JWT 分成成三个部分
JWT的第一部分是对一个简单js对象的编码后的字符串，这个js对象是用来描述这个token类型以及使用的hash算法
JWT的第二部分是token的核心，这部分同样是对一个js对象的编码，包含了一些摘要信息。  iss  这个是保存与服务器通信的信息
JWT的第三个部分，是JWT根据第一部分和第二部分的签名（Signature）
encode decode

