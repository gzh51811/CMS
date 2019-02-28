//1.引入模块
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

//2.创建路由
var router = new Router(); 

//3.页面路由
const loginRouter = require('./login');

//4.
router.use('/login',loginRouter.routes());

module.exports = router;