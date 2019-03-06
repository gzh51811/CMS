const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

//验证名字是否被注册
router.get('/checkname', async (ctx,next)=>{
    let {userName} = ctx.query;

    let res = await db.find("admins",{userName});
    res = res[0];
    console.log(res);
    if(res){
        ctx.body = {
            list:userName,
            code:0,
            msg:"当前名字已经被注册"
        }
    }else{
        ctx.body = {
           
            code:1,
            msg:"当前名字可以使用"
        }
    }

});
//添加管理员
router.post('/add', async (ctx,next)=>{
    
    let {userName,password,permission,Mobile,E_mail,regDate} = ctx.request.body;

    let res = await db.insert("admins",{userName,password,permission,Mobile,E_mail,regDate});

    ctx.body = res;
});


//显示管理员
router.post('/show', async (ctx,next)=>{
    
    let {page,qty} = ctx.request.body;

    let res = await db.find1("admins",{},(page-1)*qty,qty*1);
    console.log(ctx.request.body);

    let res1 = await db.find("admins",{});
    console.log(ctx.request.body);
    
    ctx.body = {
        list:res,
        qty:qty,
        page:page,
        zongshu:res1.length
    };
});

//查找管理员

router.get('/find', async (ctx,next)=>{
    
    let {userName} = ctx.query;
    let res = await db.find("admins",{userName});
    
    ctx.body = {
        list:res
    }
   
});
//单个删除管理员
router.get('/del', async (ctx,next)=>{
    let {userName} = ctx.query;
    console.log(userName);
    let res = await db.delete("admins",{userName});
    ctx.body = "删除功能";
    
});
//多个删除管理员
router.post('/delall', async (ctx,next)=>{
    console.log(ctx.request.body);
    let {userName} = ctx.request.body;

   console.log(userName);
    let res;

    for(let i=0;i<userName.length;i++){
        await db.delete("admins",{userName:`${userName[i]}`});
    }
     
    ctx.body = "duoge删除功能";
    
    
});



//修改信息
router.post('/xiugai', async (ctx,next)=>{
    let {userName,password,Mobile,E_mail,oldname}=ctx.request.body;
    // console.log(ctx.request.body);
    // console.log({userName,password,Mobile,E_mail});
    // console.log({oldname});
    console.log({userName:`${oldname}`});
    let res = await db.update("admins",{userName:`${oldname}`},{$set:{userName,password,Mobile,E_mail}});



    ctx.body = "xiugai功能";
    
    
});



module.exports = router;