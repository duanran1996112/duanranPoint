var koa = require('koa');
var Router = require('koa-router');
var static = require('koa-static');
var Pug = require('koa-pug');
var _ = require('lodash');
var path = require('path');      
var io = require('socket.io');

var app = new koa();
var router = new Router();
var pug = new Pug(_.assign({}, '', {
    viewPath: './views/'
}));  


app.use(static(path.join(__dirname,'/src')));
app.use(router.routes()).use(router.allowedMethods());
pug.use(app);

var i = io(app.listen(3000));

var userInf = 0;

i.on('connection', function (socket) {
    userInf++;
    socket.emit('userInf',userInf);

    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    });
});

router.get('/', async function (ctx,next) { 
    ctx.render('test.pug');
});

