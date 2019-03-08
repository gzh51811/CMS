//1.引入模块
const Router = require('koa-router');
const db = require('../db');

//2.创建路
let router = new Router();

//3.中间件写法编写各类型的请求路由
router.get('/',async (ctx,next)=>{
    // ctx.body = '商品列表';
    let {page,limit,key} = ctx.request.body;

    let res = await db.find('goods',{page,limit,key});

    res = res[0];

    if(res){
        ctx.body = {
            code:100,
            msg:'',
            data:res
        }
    }else{
        ctx.body = {
            code:200,
            msg:'',
            data:[]
        }
    }
})

router.route('/:id')
    .get(async(req, res) => {
        let {id,state} = req.query;
        // console.log(id);
        let data
        try{
            data = await db.find('list',{_id:ObjectID(id)},{state});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    //修改商品信息
    .post(urlencodedParser,async(req, res) => {
        let {id,goods,priceOld,priceNow,stock,state,classify} = req.body;
        // console.log(id);
        let data
        try{
            data = await db.update('list',{_id:ObjectID(id)},{goods,priceOld,priceNow,stock,state,classify});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    //添加商品信息
    .put(urlencodedParser,async(req, res) => {
        let {goods,priceOld,priceNow,stock,state,classify,url} = req.body;
        // console.log(url)
        let data
        try{
            data = await db.insert('list',{goods,priceOld,priceNow,stock,state,classify,url,time:show()});
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //删除商品信息
    .delete(urlencodedParser,async(req, res) => {
        let {id} = req.body;
        console.log(id);
        let data
        try{
            data = await db.delete('list',{_id:ObjectID(id)});
        }catch(err){
            data = err;
        }

        res.send(data);
    })

function show() {
    var mydate = new Date();
    var str = mydate.getFullYear() +'-' ;
    str += (mydate.getMonth() + 1) +'-' ;
    str += mydate.getDate();
    return str;
}

//4.暴露
module.exports = router;