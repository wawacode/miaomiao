angular.module("miaomiao.shop").factory("WeiChatPay",function($http,MMUtils,httpClient){if(!wx){console.log("Error微信js-sdk 没有加载");return;}var weiChatPayUtils={},wechatConfig={appId:"wx762f832959951212",mch_id:"1233699402",appsecret:"914f4388312ca90e4cb750b817d15368"};weiChatPayUtils.getNonceStr=function(){return Math.random().toString(36).substr(2,15);};weiChatPayUtils.getHashCondidate=function(params){var objKeys=Object.keys(params);objKeys=objKeys.sort();var str="";for(var i=0;i<objKeys.length;i++){str+=objKeys[i]+"="+params[objKeys[i]]+"&";}var stringSignTemp=str+"key="+wechatConfig.appsecret;console.log("after sort the sing tmp is: "+stringSignTemp);return stringSignTemp;};weiChatPayUtils.getHash=function(params){var objKeys=Object.keys(params);objKeys=objKeys.sort();var str="";for(var i=0;i<objKeys.length;i++){str+=objKeys[i]+"="+params[objKeys[i]]+"&";}var stringSignTemp=str+"key="+wechatConfig.appsecret;console.log("after sort the sing tmp is: "+stringSignTemp);return MMUtils.hex_md5(stringSignTemp).toUpperCase();};weiChatPayUtils.getTimestamp=function(){return parseInt(new Date().getTime()/1000)+"";};var config={debug:true,appId:wechatConfig.appId,timestamp:weiChatPayUtils.getTimestamp(),nonceStr:weiChatPayUtils.getNonceStr(),jsApiList:["chooseWXPay"]};config.signature=weiChatPayUtils.getHash(config);httpClient.getJsapi_ticket(function(data,status){if(data&&data.data&&data.data.ticket){config.signature=data.data.ticket;}wx.config(config);},function(){});wx.error(function(res){MMUtils.alert("微信JS-API 配置失败："+res);});wx.ready(function(){weiChatPayUtils.checkPayAPI=function(success,fail){wx.checkJsApi({jsApiList:["chooseWXPay"],success:function(res){if(res.checkResult.chooseWXPay){success();}else{fail();}},fail:function(){fail();}});};weiChatPayUtils.chooseWXPay=function(info,beforeHandoverToWCPay,success,fail){var pkg="";for(var p in info){pkg+=p+"="+info[p]+"&";}pkg=pkg.slice(0,-1);var info={appId:wechatConfig.appId,timestamp:this.getTimestamp(),nonceStr:this.getNonceStr(),"package":pkg,signType:"MD5"};var string=this.getHashCondidate(info);httpClient.getHashFromServer(string,function(data,status){info.paySign=data.data;onHashReady();},function(data,status){info.paySign=this.getHash(info);onHashReady();});function onHashReady(){info.success=function(res){if(res.err_msg=="get_brand_wcpay_request:ok"){success(res);}else{fail(res);}};if(beforeHandoverToWCPay){beforeHandoverToWCPay();}wx.chooseWXPay(info);}};});return weiChatPayUtils;});