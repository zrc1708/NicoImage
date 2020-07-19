const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js') // 导入数据库登录信息
const fs = require("fs");
const path = require('path');
const send = require('koa-send');


const filerouters = new Router()



// 文件上传接口
filerouters.post('/uploadimage', async (ctx, next) => {

    // 测试上传路径的获取
    // const savepath = ctx.request.body.savePath

    // 上传文件
    const file = ctx.request.files.file; // 获取上传文件
    console.log(file)

    // // 将文件信息写入数据库
    // let category = file.name.split('.')[file.name.split('.').length-1]
    // let date = getdate(file.lastModifiedDate)
    // let size = getsize(file.size+'')
    // const connection = await Mysql.createConnection(mysql_nico)
    // const sql = `INSERT INTO file ( name, path , type , size , birthtime ) 
    //             VALUES ( '${file.name}', './${savepath+'/'+file.name}','${category}','${size}','${date}' );`
    // const [rs] = await connection.query(sql);

    // connection.end(function(err){
    //     //连接结束
    // })

    // // 创建可读流
    // const reader = fs.createReadStream(file.path);

    // let filePath = path.join(__dirname, savepath+'') + `/${file.name}`;
    // // 创建可写流
    // const upStream = fs.createWriteStream(filePath);
    // // 可读流通过管道写入可写流
    // reader.pipe(upStream);
    return ctx.body = {
        message:"上传成功！",
        code:200,
        };
  });

// 文件下载接口(文件目录不包括自身)
filerouters.post('/download', async function (ctx) {
    const filename = ctx.request.body.filename
    const filepath = ctx.request.body.filepath
    // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
    // 也可以直接设置 ctx.set("Content-disposition", "attachment; filename=" + fileName);
    ctx.attachment(filename);
    await send(ctx, filename, { root: __dirname + '/'+filepath });
});

// 重命名文件接口
filerouters.post('/rename', async function (ctx) {
    const oldname = './'+ctx.request.body.oldname
    const newname = './'+ctx.request.body.newname
    const newfilename = newname.split('/')[newname.split('/').length-1]

    // 更改文件数据库状态
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE file SET name = '${newfilename}' , path = '${newname} '
                WHERE path = '${oldname}' and state = 1;`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    await fs.rename(oldname.trim(),newname,(error) => {
        if (error) {
            throw error
        } 
    })
    return ctx.body = {
        message:"重命名成功！",
        code:200,
    };
});

// 删除文件接口
filerouters.post('/remove', async function (ctx) {
    const path = './'+ctx.request.body.path
    const type = ctx.request.body.type

    // 更改文件数据库状态
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = `UPDATE file SET state = 0 WHERE 
                path like '%${path}%';`
    const [rs] = await connection.query(sql);

    connection.end(function(err){
        //连接结束
    })

    if(type==='dir'){
        await delDir(path);//删除文件夹
    }else{
        await fs.unlink(path.trim(), (err) => {
            if (err) throw err;
        });
    }
    return ctx.body = {
        message:"删除文件成功！",
        code:200,
    };
});

module.exports = filerouters