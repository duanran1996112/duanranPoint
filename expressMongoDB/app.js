var express = require('express');
var serveStatic = require('serve-Static');
var path = require('path');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var Student = require('./mongoose/mongoModel.js');

var app = express(); // 使用 express 框架

app.set('views','./views/pages'); // 在 views/pages 寻找模板
app.set('view engine','jade'); // 使用 jade 模板

app.use(serveStatic(path.join(__dirname,'static'))); 
// 在当前 文件夹 + static 目录下寻找 静态 资源

app.use(bodyParser.json()); // 解析 post 传递过来的 json 格式的数据
app.use(bodyParser.urlencoded({extended: false})); // 解析 post 传递过来的 urlencoded 字符

// var studentMessage = [{ // 伪装数据
//         id: 1,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 2,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 3,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 4,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 5,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 6,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 7,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
//     },{
//         id: 8,
//         name: '段然',
//         studyId: '20145845',
//         pic: '/img/yangmi.jpg'
// }]
// var studentLongMessage = { // 伪装数据
//     id: 1,
//     name: '段然',
//     englishName: 'randuan',
//     studyId: '20145845',
//     age: 18,
//     sex: '男',
//     height: 178,
//     weight: 120,
//     math: 100,
//     chinese: 100,
//     english: 100,
//     pic: '/img/yangmi.jpg'
// }

app.get('/',function (req,res) { // 根目录路由
    Student.find({},function (err,data) { // 在数据库中获取所有数据
        if(err) {
            console.log(err);
            return;
        }
        res.render('index.jade',{ // 用 index.jade 渲染,并传入数据库获取到的数据
            studentMessage: data
        });
    }) 
})

app.get('/student/:id',function (req,res) { // student/xxx 路由
    var id = req.params.id;
    Student.findById({_id: id},function (err,data) { // 获取到 student 后跟着 id 的数据
        if(err) {
            console.log(err);
            return;
        }
        res.render('student.jade',{ // 用 student.jade 渲染,并传入数据库获取到的数据
            studentLongMessage: data
        })
    }) 
})

app.get('/addMessage',function (req,res) { // addMessage 路由
    res.render('addMessage.jade');
})

app.get('/students/list',function (req,res) { // students/list 路由
    Student.find({},function (err,data) { // 在数据库中获取所有数据
        if(err) {
            console.log(err);
            return;
        }
        res.render('studentList.jade',{ // 用 student.jade 渲染,并传入数据库获取到的数据
            studentListMessage: data
        })
    }) 
})

app.post('/students/add',function (req,res) { // students/add 路由
    var studentAddMessage = req.body; // 获取到 post 传输的 请求主体 中的 数据
    var obj = { // 准备写入数据库的对象
        name: studentAddMessage.name,
        englishName: studentAddMessage.englishName,
        studyId: studentAddMessage.studyId,
        age: studentAddMessage.age,
        sex: studentAddMessage.sex,
        height: studentAddMessage.height,
        weight: studentAddMessage.weight,
        math: studentAddMessage.math,
        chinese: studentAddMessage.chinese,
        english: studentAddMessage.english,
        pic: studentAddMessage.pic,
    }
    var newStudent = new Student(obj); // 建立数据库对象
    newStudent.save(function (err,data) {// 存储数据库
        if(err) {
            console.log(err);
            return;
        }
        res.redirect('/student/' + data._id) // 重定向到 student/xxx 页面
    })
})

app.post('/students/remove',function (req,res) { // students/remove 路由
    var id = req.body.id; // 获取到 post 传递的 请求主体 中 属性值为 id 的数据 
    Student.remove({_id: id},function (err,data) { // 在数据库中 删除 该 id 的数据
        if(err) {
            console.log(err);
            return;
        }
        res.send('success') // 向客户端返回 success 
    })
})

app.listen(3000); // 监听localhost:3000端口