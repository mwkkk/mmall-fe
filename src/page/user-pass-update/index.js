require('./index.css');
require('../index/index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    init: function(){
        this.onload();
        this.bindEvent();
    },
    onload: function(){
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            }
            validateResult = _this.formValidate(userInfo)
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld : userInfo.password,  
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.successTips(errMsg);
                });
            }else{
                _mm.successTips(validateResult.msg);
            }
        })
    },
    formValidate: function(formData) {
        console.log(formData.password,formData.passwordNew, formData.passwordConfirm)
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码的长度不得少于6位';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function () {;
    page.init();
})
