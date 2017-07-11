$(function () {
    var ioSocket = io.connect('ws://localhost:3000');
    var userInf;

    ioSocket.on('message',function (msg) {
        $('#chat_ul').append('<li style="color: red;">' + msg + '</li>');
    })

    ioSocket.on('userInf',function (msg) {
        userInf = msg + ' Say: '
    })

    $('#inp').on('keypress',function(e){
        if(e.keyCode == 13) {
            if($(this).val() != '') {
                $('#chat_ul').append('<li>' + userInf + $(this).val() + '</li>');
                ioSocket.send(userInf + $(this).val());
                $(this).val('');
            }
        }
    });
})


