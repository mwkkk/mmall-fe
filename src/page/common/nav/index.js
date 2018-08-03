require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init: function() {
        this.bindEven();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEven: function() {
        //点击登录
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //点击注册
        $('.js-register').click(function(){
            window.loaction.href = './register.html';
        });
        //退出按钮
        $('.js-logout').click(function(){
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })    
        });
    },
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function(errMsg) {
            //do nothing
        })
    },
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.cart-count').text(res || 0);
        }, function(errMsg) {
            $('.cart-count').text(0);
        })
    }
}
module.exports = nav.init();