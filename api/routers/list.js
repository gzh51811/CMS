const Router = require('koa-router');

const db = require('../db');
// 创建路由
var router = new Router();

router.get('/show', async (ctx,next)=>{
    

    ctx.body = "将管理员全部呈现";
});

module.exports = router;