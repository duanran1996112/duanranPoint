var ws = new WebSocket('ws://localhost:3000/ws');  

ws.onmessage=function(e){  
    if(e.data == 'success') {
        $('<form class="submit" action="/success"></from>').appendTo('body');
        $('.submit').submit().remove();
    } else {
        alert('账号密码不对')
    }
     
};  
ws.onerror=function(err){  
    console.log('_error');  
    console.log(err);  
};  
ws.onopen=function(){  
    console.log('_connect')  
};  
ws.onclose=function(){  
    console.log('_close');  
};  

$('.login').on('click',function () {
    if($('.user').val() != "" && $('.psw').val() != "") {
        ws.send('#' + $('.user').val() + '#' + $('.psw').val());  
    }
})

$('.sign').on('click',function () {
    if($('.user').val() != "" && $('.psw').val() != "") {
        ws.send('newUser#' + $('.user').val() + '#' + $('.psw').val()); 
    } 
})