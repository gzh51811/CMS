//1.引入模块
const koa = require('koa');
const static = require('koa-static');

//5.引入组件路由
const routers = require('./api/routers')

//2.创建应用
const app = new koa();

//4.静态资源服务器
app.use(static('./'));
app.use(routers.routes());

//3.监听端口
app.listen(1811,()=>{
    console.log('the server is running is localhost:1811!');
})