var koa = require('koa');
var Router = require('koa-router');

var app = new koa();
var router = new Router();

app.use(router.routes()).use(router.allowedMethods());

var Pug = require('koa-pug');
var _ = require('lodash')

var pug = new Pug(_.assign({}, '', {
    viewPath: './views/'
}));    

pug.use(app);

var mysql = require('mysql');
var wrapper = require('co-mysql');
var options = {
  host : 'localhost',
  port : 3306 ,
  database : 'student',
  user: 'root',
  password : '123456'
};

var pool = mysql.createPool(options);
var p = wrapper(pool);

router.get('/', async function (ctx,next) { 
    var rows = await p.query('select * from `studentMessage`');
    await ctx.render('index.pug',{
        message: rows
    });
});



router.get("/test", async function (ctx,next) {
    ctx.body = await "Test";
})

app.listen(3000);

