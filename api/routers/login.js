const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

router.post('/', async (ctx, next) => {
    ctx.body = ctx.request.body;

    let {
        userName,
        password
    } = ctx.request.body;

    console.log(ctx.request.body);
    let res = await db.find('admins', {
        userName,
        password
    });

    res = res[0];

    if (res) {
        ctx.body = {
            _id: res._id,
            userName: res.userName,
            permission: res.permission,
            regDate: res.Date
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }


});
router.post('/user', async (ctx, next) => {
    ctx.body = ctx.request.body;

    let {
        userName,
        password
    } = ctx.request.body;

    console.log(ctx.request.body);
    let res = await db.find('users', {
        userName,
        password
    });

    res = res[0];

    if (res) {
        ctx.body = {
            _id: res._id,
            userName: res.userName,
            permission: res.permission,
            regDate: res.Date
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }


});


module.exports = router;
