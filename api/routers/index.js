/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-03-01 22:51:52
 * @LastEditTime: 2019-03-02 16:34:04
 * @路由分配
 */
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router();

// 引入页面路由
const userRouter = require('./user');
//post传输支持
router.use(koaBody({
  // 支持formData
  multipart: true,
}));

router.use('/user', userRouter.routes())

module.exports = router;
