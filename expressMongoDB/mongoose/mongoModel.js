var mongoose = require('mongoose');
var Schema = require('./mongoSchema.js');

mongoose.Promise = global.Promise; // Promise 相互绑定

var db = mongoose.createConnection('localhost','duanran'); // 连接 duanran 数据库

var Student = db.model('Student',Schema); // 生成 名为 student 的 数据库 模型 

module.exports = Student;