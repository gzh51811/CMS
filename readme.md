```
/*
 * @writer: 黄理强
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-02-27 16:48:57
 * @LastEditTime: 2019-03-01 14:39:35
 * @项目readme
 */
```
## Nodejs项目

>  基于 NodeJS + MongoDB + layUI 开发的 CMS

### 使用技术

     UI框架 : layUI
     后端语言 : NodeJS
     数据库 : MongoDB

### 说明
     项目名称 : 后台管理系统
     人员结构 : 郑晓锋 黄理强 李明钢
     演示地址 : xxx

### 模块分配

* 数据可视化
    * 数据统计

****

* 商品管理
    * 列表展示
        * ID
        * 图片
        * 名字
        * 分类
        * 价格
        * 库存
        * 状态 (是否上架)

    * 添加
    * 编辑
    * 删除

****

* 用户管理（管理员）
    * 添加
    * 编辑
    * 删除
* 用户管理（普通用户）
      * 修改用户信息


****

* 订单管理
    * 订单展示
    * 订单状态修改
        * 未付款
        * 付款成功
        * 发货
        * 签收

****

### 数据表格

* 超级管理员    (Admins)
    * 用户名    userName
    * 权限      permission
    * 手机号    Mobile
    * 邮箱      E-mail
    * 地址      site
    * 注册时间  regDate

* 普通用户表    (users)
    * 用户名    userName
    * 性别      gender
    * 手机号    Mobile
    * 邮箱      E-mail
    * 地址      site
    * 注册时间  regDate

****

* 商品列表      goods
    * 商品名称  gName
    * 商品分类  sort
    * 价格      price
    * 添加时间  addDate
    * 状态      status

****

* 商品分类      sort

****

* 订单列表      cart
    * 订单号    cNum
    * 收货人    buyer
    * 金额      total
    * 支付状态  pay
    * 发货状态  send_out
    * 签收状态  arrive
    * 下单时间  buying_time

****


