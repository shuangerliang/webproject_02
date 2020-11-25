$(function () {
    //1.点击显示隐藏
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.自定义密码规则
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //再次确认密码
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return "两次输入密码不一致" 
            }
        }

    })

    //3.监听注册表单的事件
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //注册成功之后 手动跳转 清空表单
                layer.msg('注册成功')
                $('#link-login').click()
                $('#form_reg')[0].reset()

            }
        })
    })

    //登录表单
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //登录成功 获取token 跳转到index
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })
})