/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-03-01 22:51:52
 * @LastEditTime: 2019-03-06 17:56:44
 * @ 订单模块
 */

//引入模块
const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

router.get("/", async (ctx, next) => {
  let {
    a
  } = ctx.query;
  let res = "";
  if (a === "total") {
    res = await db.find_1({
      colName: "cart",
      query: {}
    });
  }
  if (a === "Status") {
    let {
      _id
    } = ctx.query;
    let key_ = "";
    let keyValue = "";
    for (const key in ctx.query) {
      key_ = key;
      keyValue = ctx.query[key];
    }
    // console.log(_id);
    if (keyValue == "1") {
      keyValue = "0"
    } else {
      keyValue = "1"
    }
    console.log(key_, keyValue);
    res = await db.update("cart", {
      _id
    }, {
      $set: {
        [key_]: keyValue
      }
    });
  }
  if (a == "query") {
    let {
      number
    } = ctx.query;
    res = await db.find_1({
      colName: "cart",
      query: {
        cNum: `${number}`
      },
    });
  };

  if (res) {
    ctx.body = {
      code: 1,
      data: res
    }
  } else {
    ctx.body = {
      code: 0
    }
  }

});
// router.post("/", async (ctx, next) => {
//   let {
//     a
//   } = ctx.request.body;
//   let res = 0;
//   if (a == "query") {
//     let {
//       number
//     } = ctx.query;
//     res = await db.find_1({
//       colName: "cart",
//       query: {
//         cNum: `${number}`
//       },
//     });
//   };
//   ctx.body = res;
//   if (res) {
//     ctx.body = {
//       code: 1,
//       data: res
//     }
//   } else {
//     ctx.body = {
//       code: 0
//     }
//   }
// })
module.exports = router;
