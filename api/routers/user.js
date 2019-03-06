/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-03-01 11:20:35
 * @LastEditTime: 2019-03-06 17:47:23
 * @用户路由
 */

//引入模块
const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

//渲染用户列表
router.get('/', async (ctx, next) => {
  //根据前端传入数据进行操作
  let {
    a
  } = ctx.query;
  let res = 0;
  //渲染接口

  if (a === "show") {
    let {
      page,
      row
    } = ctx.query;
    //分页算法
    uid = (page * row) - 1;
    // 查询结构

    res = await db.find_1({
      colName: "users",
      query: {
        _id: {
          $gt: uid
        },
      },
      row
    });

  };
  //查询总数接口
  if (a === "total") {
    res = await db.find_1({
      colName: "users",
      query: {},
    });
  }
  // 查询用户
  if (a === "buyer") {
    let {
      choice,
      name
    } = ctx.query;
    res = await db.find_1({
      colName: "users",
      query: {
        userName: `${name}`
      },
    });
  }
  ctx.body = res;
  // 输出
  if (res) {
    ctx.body = {
      code: 1,
      data: res
    }
  } else {
    ctx.body = {
      code: 0,
      data: res
    }
  }

});
router.post("/", async (ctx, next) => {
  let {
    a
  } = ctx.request.body;
  // 修改密码
  if (a === "alterPass") {
    console.log(ctx.request.body);
    let {
      name,
      newPass
    } = ctx.request.body;
    let res = await db.update("users", {
      userName: name
    }, {
      $set: {
        password: newPass
      }
    });
    ctx.body = res;
    // 输出
    if (res) {
      ctx.body = {
        code: 1,
      }
    } else {
      ctx.body = {
        code: 0,
      }
    }
  }
});
module.exports = router;
