//1.引入模块
const Router = require('koa-router');
const db = require('../db');

//2.创建路
let router = new Router();

//3.中间件写法编写各类型的请求路由
router.get('/',(ctx,next)=>{
    ctx.body = '分类';
})

//4.暴露
module.exports = router;