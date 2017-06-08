var moogoose = require('mongoose');
var Schema = new moogoose.Schema({ // 数据库的图纸
    name: String,
    englishName: String,
    studyId: String,
    age: String,
    sex: String,
    height: String,
    weight: String,
    math: String,
    chinese: String,
    english: String,
    pic: String,
    newDateTime: String
})

Schema.pre('save',function (next) { // 注册存储事件,当外部 实例化 执行
    this.newDateTime = new Date(); // 拼接上当前时间戳
    next(); // 剩下操作继续执行
})

module.exports = Schema;