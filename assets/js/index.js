$(function () {
    getUserInfo()
})
var layer = layui.layer
$('#btnLogOut').on('click', function () {
    layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
        //1.清空token
        localStorage.removeItem('token')
        //2.跳转到登录页面
        location.href='/login.html'
        //关闭提示框
        layer.close(index);
      });
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    //1.用户名
    var name = user.nickname || user.name
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    //2.头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var name = name[0].toUpperCase()
        $('.text-avatar').show().html(name)
    }
}