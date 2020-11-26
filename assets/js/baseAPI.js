//1.开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//拦截ajax请求 处理参数 拼接地址
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url

    //有权限再给headers 身份认证
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //登录拦截不管是否成功 都有complete函数 判断身份信息 responseJSON获取信息
    params.complete = function (res) {
        //判断是否身份认证信息
        // if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！")
        if (res.responseJSON.message === "身份认证失败！") {
            //1.清空token
            localStorage.removeItem('token')
            //2.跳转到登录
            location.href = '/login.html'
        }
    }
})
