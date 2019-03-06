```javascript
/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-03-05 17:33:54
 * @LastEditTime: 2019-03-06 00:43:37
 * @用户和订单api文档
 */
```

## api文档

> server 链接的路由位置及使用方法

    路由存放位置 : ./api/routers

###  使用


##### 用户路由 :
    注意:url 是相对于根目录,所以要从根目录进行访问
    例 : ../../user

* 渲染用户列表及分页功能

```
type : get

url = "/user";

data :
    {
      a : "show", //渲染
      page : 0,   //页码
      row : 7     //行数
    }
```

* 获取用户总数

```
type : get

url = "/user";

data :
    {
      a : "total", //总数
    }
```
* 查询用户名

```
type : get

url = "/user";

data :
    {
      a : "buyer",
      name : userName  //用户名
    }
```
* 修改密码

```
type : POST

url = "/user";

data :
    {
      a : "alterPass",
      name : userName,  //用户名
      newPass:"223344"  //新密码
    }
```

##### 订单路由 :
    注意:url 是相对于根目录,所以要从根目录进行访问
    /**
     * @description:
     * @param {type}
     * @return:
     */
    例 : ../../order

* 查询所有订单

```
type : GET

url = "/order";

data :
    {
      a : "total", //查询全部
    }
```

* 修改状态

```
type : GET

url = "/order";

data :
    {
      a : "Status",
      _id, //选项id
      [要修改属性的变量名]:修改属性的值 //要修改的状态(0/1);

    }
```

* 查询订单号

```
type : GET

url = "/order";

data :
    {
      a : "query",
      number:订单号 //订单号


    }
```
