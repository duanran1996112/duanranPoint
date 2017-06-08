$('.removeMessage').on('click',function () { // 获取到 dom 绑定点击事件
    var id = $(this).attr('id'); // 获取到该 dom id
    var _this = this;
    $.ajax({
        url: '/students/remove', // 向 students/remove 发送数据
        type: 'POST', // 方式为 post 
        data: {id: id}, // 发送的数据
        success: function (data) {
            if(data == "success") { // 若接收到的数据是 success
                $(_this).parents('tr').remove()
            }
        },
        err: function (err) {
            console.log(err);
        }
    })
})