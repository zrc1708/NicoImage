# 妮可图床
## 项目介绍
闲来无事写的自用图床，用来存放一些小图片还是效果不错  
+ 前后端分离的单页面应用
+ 前端采用Vue与VueRouter
+ 后端采用koa和mysql
## 项目效果
[项目地址](http://img.jibei66.com)  
![](https://s1.ax1x.com/2020/07/26/aCB3bd.md.png)
![](https://s1.ax1x.com/2020/07/26/aCBY5t.md.png)
## 部署方法
+ 分别在nicoimage_web/server文件夹下通过命令行npm install/yarn install安装好项目文件
+ 使用Mysql文件夹下的sql文件创建数据库
+ 在server文件夹下创建一个mysql.js文件，格式如下，填写好自己的数据库信息
    ```js
    var mysql_nico = {
        host: '111.11.11.111',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'nicoimage'
    }
    module.exports = mysql_nico;
    ```
+ nicoimage_web为本项目前端文件，导入vue ui或者使用命令行启动
+ server为本项目后端文件，在server文件下，在命令行使用如下命令启动
    > node app