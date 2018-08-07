require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show: function(Msg) {
        $('.error-item').show().find('.err-msg').text(Msg);
    },
    hide: function(Msg) {
        $('.error-item').hide().find('.err-msg').text('');
    }
}

var login = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(e.keycode === 13){
                _this.submit();
            }
        });
    },
    submit: function(){
        var formData = {
            username : $('#username').val(),
            password : $('#password').val()
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.login(formData,function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            },function(errMsg){
                formError.show(errMsg);
            })
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function(){
    login.init();
})