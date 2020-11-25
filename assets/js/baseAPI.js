var baseURL = 'http://ajax.frontend.itheima.net'
//拦截ajax请求 处理参数 拼接地址
$.ajaxPrefilter(function (params) {
    params.url=baseURL+params.url
})