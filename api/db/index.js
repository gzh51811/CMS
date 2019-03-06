/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 */
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const database_url = 'mongodb://localhost:27017';
const database_name = 'CMS';

async function connect(){
    let client = await MongoClient.connect(database_url,{ useNewUrlParser: true });
    let db = client.db(database_name);
    return {db,client}
}

//增加插入功能
exports.insert = async (colName,data)=>{

    let {db,client} = await connect();


    // console.log('client',client)
    // console.log('db',db)
    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data)?'insertMany':'insertOne'](data);

    client.close();

    return res;
}
//删除功能
exports.delete = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);

    client.close();

    return res;
}
//更新功能(不完善的，还要多一个$set:)
exports.update = async (colName,query,newData)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['updateMany'](query,newData);

    client.close();

    return res;
}
//查找功能
exports.find = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();

    // 返回查询结果
    return res;
}
//分页查找功能
exports.find1 = async (colName,query,page,qty)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).skip(page).limit(qty).toArray();
    client.close();

    // 返回查询结果
    return res;
}
// insert('user',[{name:'xxx',age:20},{name:'xx2',age:18}]);
// delete('user',{age:{$lt:18}});
