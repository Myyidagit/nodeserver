var express = require('express');
var app = express();
//连接数据库
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "first_shujuku"
})
connection.connect();

var sql = 'SELECT * FROM xinxi';
// var res;
// //查
// connection.query(sql, function(err, result) {
//     if (err) {
//         console.log('[SELECT ERROR] - ', err.message);
//         return;
//     }
//     console.log('--------------------------SELECT----------------------------');
//     console.log(result);
//     res = result
//     console.log(res)
//     console.log('------------------------------------------------------------\n\n');
// });

// connection.end();
//如果输入为空则弹出登录页面
app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/view/index.html`);
});

app.get("/data", function(req, res) {
    // res.sendFile(`${__dirname}/data/data.json`);
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.send(result)
        console.log(res)
        console.log('------------------------------------------------------------\n\n');
    });

    // connection.end();
})
var bsql = "INSERT INTO xinxi ( name, age ) VALUES ( '名', 28 );"
app.get("/add", function(req, res) {
        // res.sendFile(`${__dirname}/data/data.json`);
        connection.query(bsql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            res.send(result)
            console.log(res)
            console.log('------------------------------------------------------------\n\n');
        });

        // connection.end();
    })
    //登录窗口处理
    //输后台接收账号密码进行判断，并返回数据
app.post("/login", function(req, res) {
    //定义一个空字符串
    var query = '';


    req.addListener("data", function(d) {
        query += d;
        // console.log(d);
    })



    //如果数据接收完毕
    req.addListener('end', function() {
        // 将字符串解析为对象
        var params = require('querystring').parse(query);
        console.log(query)
        if (params.username == "admin" && params.pwd == '123456') {
            res.send('{"code":1,"msg":"ok"}');
        } else {
            res.send('{"code":0,"msg":"!ok"}');
        }

    })




});
app.get("*", function(req, res) {
    res.sendFile(`${__dirname}/view${req.url}`);
})

app.listen(8888, 'localhost', function() {
    console.log('服务器开启成功');
})