var express = require('express');  
var app = express();  
var expressWs = require('express-ws')(app);  
var util = require('util'); 

app.set('views','./views');
app.set('view engine','jade');

app.use(express.static('./static'));  

var userMessage = [{
    user: 'duanran',
    psw: '123456'
},{
    user: 'youshuo',
    psw: '111111'
}]

function ifLogin (user,psw,userMessage) {
    for(var i = 0 ; i < userMessage.length ; i++) {
        if(userMessage[i].user == user && userMessage[i].psw == psw)
            return true
    }
    return false
}

function ifSign (msg) {
    if(msg.split('#')[0] == 'newUser') {
        return true
    }
    return false
}

function addUser (msg) {
    var obj = {};
    obj.user = msg.split('#')[1];
    obj.psw = msg.split('#')[2];
    userMessage.push(obj);
}

app.ws('/ws', function(ws, req) {  
    util.inspect(ws);  
    ws.on('message', function(msg) {  
        if(ifSign(msg)) {
            addUser(msg);
            ws.send('success');
        } else {
            console.log(userMessage);
            if(ifLogin(msg.split('#')[1],msg.split('#')[2],userMessage)) {
                ws.send('success')
            }
            else {
                ws.send('error'); 
            }
        }
    });  
}) 

app.get('/',function (req,res) {
    res.render('index.jade')
})

app.get('/success',function (req,res) {
    res.render('return.jade')
})

app.get('/sign',function (req,res) {
    res.render('demo.jade')
})

app.listen(3000)