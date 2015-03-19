;
angular.module('miaomiao.shop').factory('WeiChatPay', function ($http, MMUtils, httpClient) {

    if (!wx) {
        console.log('Error' + "微信js-sdk 没有加载");
        return;
    }

    var weiChatPayUtils = {}, wechatConfig = {
        appId: 'wx762f832959951212',
        mch_id: '1233699402',
        appsecret: '914f4388312ca90e4cb750b817d15368'
    };

    weiChatPayUtils.getNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };

    weiChatPayUtils.getHashCondidate = function (params) {

        var objKeys = Object.keys(params);
        objKeys = objKeys.sort();// 默认字典序

        var str = '';
        for (var i = 0; i < objKeys.length; i++) {
            str += objKeys[i].toLowerCase() + '=' + params[objKeys[i]] + '&';
        }

        var stringSignTemp = str + "key=" + wechatConfig.appsecret; //  our key

        return stringSignTemp;
    };

    weiChatPayUtils.getHash = function (params) {

        var objKeys = Object.keys(params);
        objKeys = objKeys.sort();// 默认字典序

        var str = '';
        for (var i = 0; i < objKeys.length; i++) {
            str += objKeys[i].toLowerCase() + '=' + params[objKeys[i]] + '&';
        }

        var stringSignTemp = str + "key=" + wechatConfig.appsecret; //  our key

        return MMUtils.hex_md5(stringSignTemp).toUpperCase();
    };

    weiChatPayUtils.getTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };

    var config = {
        'debug': true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        'appId': wechatConfig.appId, // 必填，公众号的唯一标识
        'jsApiList': ['chooseWXPay']
    };

    // config js-sdk for current page
    httpClient.getPageConfig(window.location.href.split('#')[0], function (data, status) {

        var detail = data.data;

        config.signature = detail.signature.toUpperCase();
        config.nonceStr = detail.nonceStr;
        config.timestamp = detail.timestamp;

        wx.config(config);

    }, function () {
        // may not be call api then
    });

    wx.error(function (res) {

//        MMUtils.showAlert('[DEBUG]微信JS-API 配置失败：' + JSON.stringify(res));
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });

    wx.ready(function () {

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

        weiChatPayUtils.checkPayAPI = function (success, fail) {
            wx.checkJsApi({
                jsApiList: ['chooseWXPay'],
                success: function (res) {
                    if (res.checkResult.chooseWXPay) {
                        success();
                    } else {
                        fail();
                    }
                },
                fail: function () {
                    fail();
                }
            });
        };

        weiChatPayUtils.chooseWXPay = function (info, beforeHandoverToWCPay, success, fail) {

            var pkg = '';
            for (var p in info) {
                pkg += p + '=' + info[p] + '&';
            }

            pkg = pkg.slice(0, -1);

            var info = {
                "signType": 'SHA1',
                "package": pkg   // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            };

            function onHashReady() {

                info.success = function (res) {
                    // 支付成功后的回调函数
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        success(res);
                    } else {
                        fail(res);
                    }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                };

                if (beforeHandoverToWCPay)beforeHandoverToWCPay();

                wx.chooseWXPay(info);
            }

            httpClient.getHashFromServer(info['package'], info['signType'], function (data, status) {

                var detail = data.data;

                info.paySign = detail.signature.toUpperCase();
                info.nonceStr = detail.nonceStr;
                info.timestamp = detail.timestamp;

                onHashReady();

            }, function (data, status) {
                fail();
            });
        };

    });

    return weiChatPayUtils;

});
