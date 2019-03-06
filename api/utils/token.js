const jwt = require('jsonwebtoken');

let privatekey= 'feibiubiu';

//生成token
exports.create = (userName,expiresIn='1h')=>{
    let token = jwt.sign({userName},privatekey,{expiresIn});
    return token;
}


//验证token
exports.verify=(token)=>{
    let res = false;
    try{
        res = jwt.verify(token,secret);
    }catch(err){
        res = false;
    }
    return res;
}