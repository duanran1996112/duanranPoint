var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ // 9000端口监听服务器
    port: 9000 
});
wss.on('connection',function (ws) {
    ws.on('message',function (message) { // 客户端传递的信息
        if(!isNaN(message)) { // 判断是不是数字,是则排序
            var arr = message.split('');
            sort(arr);
            message = arr.join('');
            ws.send(message);
            console.log(message);
        } else { // 不是数字
            var messageArr = message.split(' '); 
            if(messageArr.length > 1) { // 判断字符串有无空格
                var markNumber = 0;
                for(var i = 0 ; i < markNumber.length ; i++) {
                    if(isNaN(messageArr[i])) {
                        markNumber = 1;
                    }
                }
                if(markNumber == 0) { // 若拆分字符串的都是数字,则排序
                    sort(messageArr);
                    ws.send(JSON.stringify(messageArr));
                    console.log(messageArr);
                }
            } else { // 若无空格,将字符串变大写
                ws.send(message.toUpperCase());
                console.log(message.toUpperCase());
            }
            
        }        
    })
    ws.on('close',function () { // 客户端关闭连接
        console.log('leave');
    })
})
function sort(arr) { // 冒泡排序
    for(var i = 0 ; i < arr.length ; i++) {
        for(var j = 0 ; j < arr.length - 1 ; j++) {
            if(parseInt(arr[j]) > parseInt(arr[j + 1])) {
                var t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t; 
            }
        }
    }
}