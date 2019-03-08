//1.引入模块
const Router = require('koa-router');
const koaBody = require('koa-body');

//2.创建路由
var router = new Router(); 

//3.引入路由
const sortRouter = require('./sort');

//5.在所有路由前设置数据格式化处理
router.use(koaBody({
    //可以处理formdata、x-www-urlencoded、json文件数据，但formdata默认不处理，需要进行参数设置

    //5.1 设置对formdata数据的支持
    multipart:true,

    //5.2 设置对文件图片的支持
    formidable:{
        uploadDir:'../../uploads', //设置上传路径
        keepExtensions:true,    //设置是否保存后缀名，默认为false
        onFileBegin(oldname,file){  //设置上传文件的重命名
            /*
                * oldname：文件原名
                * file：文件信息，以对象形式存在
                    * path：重命名  
            */
           file.path = '../../uploads' + filename
        }
    }
}));

//4.进入路由
router.use('/sort',sortRouter.routes());

module.exports = router;
