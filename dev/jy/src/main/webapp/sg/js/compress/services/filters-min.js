angular.module("miaomiao.shop").filter("getTotolCount",function(){return function(a){a=a||[];var b=0;for(var c=0;c<a.length;c++){b+=parseInt(a[c].count||0);}return b;};}).filter("getTotolPrice",function(){return function(a){a=a||[];var b=0;for(var c=0;c<a.length;c++){b+=parseFloat(a[c].price||0)*parseInt(a[c].count||0);}return b/100;};}).filter("removeAMPM",function(){return function(a){if(!a){return;}return a.replace(/AM/,"").replace(/PM/,"");};}).filter("getShopStatusString",function(){return function(a){return a==0?"营业中":"打烊了";};}).filter("getShopMinPrice",function(){return function(a){return a?a/100:20;};}).filter("insertSpaceForShortName",function(){return function(a){return a.length==2?a.charAt(0)+"    "+a.charAt(1):a;};});