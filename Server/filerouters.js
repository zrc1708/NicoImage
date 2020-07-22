const Router = require('koa-router')
const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
const mysql_nico = require('./mysql.js') // 导入数据库登录信息
const fs = require("fs");
const path = require('path');
const send = require('koa-send');
const mime = require('mime-types')

const filerouters = new Router()



// 文件上传接口
filerouters.post('/uploadimage', async (ctx, next) => {
    let file,fileNames
    // 获取保存文件用的文件名, 获取文件
    if(ctx.request.files.file.length){
        file = [...ctx.request.files.file]
    }else{
        file = [ctx.request.files.file]
    }
    fileNames = [...ctx.request.body.fileNames.split(',')]

    // 保存文件
    file.forEach((item,index)=>{
        // 创建可读流
        const reader = fs.createReadStream(item.path);
        let filePath = path.join(__dirname+'/images') + `/${fileNames[index]}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    })

    var imageUrl = []
    // 将文件信息写入数据库
    const connection = await Mysql.createConnection(mysql_nico)
    fileNames.forEach(async (item)=>{
        let filepath = path.join(__dirname+'/images')+ `/${item}`
        // 顺便生成图片文件的访问地址
        let url = 'http://'+ctx.header.host+'/getimage/'+item
        imageUrl.push(url)
        const sql = `INSERT INTO image (filename, path,url) VALUES ( '${item}', '${filepath}','${url}');`
        const [rs] = await connection.query(sql);
    })
    connection.end(function(err){})

    return ctx.body = {
        message:"上传成功！",
        imageUrl,
        code:200,
    };
});

// 获取图片接口
filerouters.get('/getimage/:imageName', async (ctx, next) => {
    const imageName = ctx.params.imageName.trim()
    // 设置文件路径
    let filePath = path.join(__dirname)+'/images/'+imageName
	try {
	    //读取文件
        file = fs.readFileSync(filePath)
	} catch (error) {
		//如果服务器不存在请求的图片，返回默认图片
	    filePath = path.join(__dirname, '/404/404.png')
	    file = fs.readFileSync(filePath)    
    }
    //读取图片文件类型
    let mimeType = mime.lookup(filePath)
    //设置返回类型
    ctx.set('content-type', mimeType)
    //返回图片
	ctx.body = file
});

// 获取所有图片
filerouters.get('/getallimages', async (ctx, next) => {
    const connection = await Mysql.createConnection(mysql_nico)
    const sql = "SELECT * FROM image";
    const [rs] = await connection.query(sql);
    connection.end(function(err){})
    ctx.body = {
        code:200,
        message:"获取所有图片成功！",
        rs
    }
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