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

var page = {
    data : {
        useranme: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function(){
        this.bindEvent();
        this.load();
    },
    load: function(){
        this.loadStepUserame();
    },
    bindEvent: function(){
        var _this = this;
        //提交用户名的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username,
                    _this.data.question = res,
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名');
            }
        });
        //提交密码问题答案按钮点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                var formData = {
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }
                _user.checkAnswer(formData,function(res){
                    _this.data.token = res;
                    _this.data.answer = answer;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入密码提示问题答案');
            }
        });
        //提交新密码点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >= 6){
                var formData = {
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }
                console.log(formData)
                _user.resetPassword(formData,function(res){
                    window.location.href = './result.html?type=pass-reset'
                },function(errMsg){
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    //加载用户名页面
    loadStepUserame: function(){
        $('.step-username').show();
    },
    //加载密码提示问题页面
    loadStepQuestion: function(){
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    //加载新密码页面
    loadStepPassword: function(){
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show()
    }
}

$(function(){
    page.init();
})