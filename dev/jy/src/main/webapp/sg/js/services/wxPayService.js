;angular.module('miaomiao.shop').factory('WeiChatPay', function ($http,MMUtils) {

    if (!wx) {
        console.log('Error' + "微信js-sdk 没有加载");
        return;
    }

    var weiChatPayUtils = {};
    var wechatConfig = {
        appId: 'wx762f832959951212',
        mch_id: '1233699402',
        appsecret:'914f4388312ca90e4cb750b817d15368'
    };

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    }).ready(function () {

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

            weiChatPayUtils.getNonceStr = function () {
                return Math.random().toString(36).substr(2, 15);
            };

            function objToString (obj) {
                var str = '';
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        str += p + '=' + obj[p] + '&';
                    }
                }
                return str.slice(0,-1);
            }

            weiChatPayUtils.getHash = function (paramsArray) {

                var params = paramsArray.sort(); // 默认字典序
                var stringAllKeys = objToString(params);
                var stringSignTemp= stringAllKeys + "&key=" + wechatConfig.appsecret; //  our key

                return MMUtils.hex_md5(stringSignTemp).toUpperCase();
            };

            weiChatPayUtils.getTimestamp = function () {
                return parseInt(new Date().getTime() / 1000) + '';
            };


            //TODO: move this api call to server
            weiChatPayUtils.unifiedorder = function (success, fail) {
                var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

                // see http://pay.weixin.qq.com/wiki/doc/api/index.php?chapter=9_1
                var params = {
                    appId: 'wx762f832959951212', // 必填，公众号的唯一标识
                    mch_id: '1233699402', //商户号
                    nonce_str: '',
                    sign: '',
                    body: '',
                    attach: '', // 附加数据，可以放置优惠券信息
                    out_trade_no: '', //商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
                    total_fee: '', // 订单总金额，只能为整数
                    spbill_create_ip: '', //APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
                    notify_url: '',
                    trade_type: 'JSAPI',
                    openid: '' //trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识
                };

                $http.post(url, params,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).
                    success(function (data, status, headers, config) {
                        //return_code : SUCCESS/FAIL
                        console.log(data);
                        success(data, status, headers, config)
                    }).
                    error(function (data, status, headers, config) {
                        fail(data, status, headers, config)
                    });
            };

            weiChatPayUtils.chooseWXPay = function (success, fail) {

                var info = {
                    "appId": wechatConfig.appId,
                    "timestamp": this.getTimestamp(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    "nonceStr": this.getNonceStr(), // 支付签名随机串，不长于 32 位
                    "package": 'prepay_id=test12121212', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    "signType": 'MD5' // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                };

                info.paySign = this.getHash(info); // 支付签名
                info.success = function (res) {
                    // 支付成功后的回调函数

                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        success(res);
                    } else{
                        fail(res);
                    }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                };

                wx.chooseWXPay(info);

            };

        }).error(function (res) {

            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

        });

    return weiChatPayUtils;

});
