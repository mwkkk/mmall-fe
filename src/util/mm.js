var Hogan = require('hogan.js');

var conf = {
    serverHost: ''
};

var _mm = {
    request : function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                if(0 === res.status) {
                    typeof param.success ==='function' && param.success(res.data, res.msg);
                }else if(10 ===res.status) {
                    _this.doLogin();
                }else if(1 ===res.status) {
                    typeof param.error ==='function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error ==='function' && param.success(err.status);
            }
        })
    },
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    getUrlParam : function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)' );
        var result = window.location.search.substr(1).match(reg);
        // console.log(decodeURLComponent(result[2]));
        return result? decodeURIComponent(result[2]) : null;
    },
    renderHtml : function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    successTips: function(msg) {
        alert( msg || '操作成功！');
    },
    errorTips: function(msg) {
        alert( msg || '操作失败');
    },
    validate: function(value, type) {
        var value = $.trim(value);
        if('require' === type) {
            return !!value;
        }
        if('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if('email' ===type) {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function() {
        window.location.href = './index.html';
    }
}

module.exports = _mm;