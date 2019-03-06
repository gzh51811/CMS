/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-03-01 11:20:35
 * @LastEditTime: 2019-03-06 19:31:50
 * @服务器模块
 */
//引入模块
const koa = require("koa");
const static = require("koa-static");

//引入组件路由
const routers = require("./api/routers");

//创建应用
const app = new koa();

//静态资源服务器
app.use(static("./"));

// 处理status为404或null时，完善response信息
app.use(routers.allowedMethods());
app.use(routers.routes());
//监听端口
app.listen(80, () => {
  console.log("the port is running!");
});
