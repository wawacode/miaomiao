angular.module("miaomiao.shop").controller("MyOrdersCtrl",function(m,f,b,j,a,c,e,k,d,h,i,l){m.shop=e.get("MMMETA_shop")||{};m.goToAddressList=function(){a.go("userAddressList",null,{reload:true});};m.backToHome=function(){a.go("productList");};function g(q){if(!q){return;}for(var p=0;p<q.length;p++){var o=q[p];try{o.items=JSON.parse(o.snapshot);}catch(r){}}}m.info={};m.info.hasShop=m.shop&&m.shop.id!=null;m.addr={};m.addressls=k.MMMETA_OrderAddresses||[];m.orders=k.MMMETA_OrderOrders||[];g(m.orders);function n(o){if(o){m.addressls=m.addressls||[];m.addressls[0]=o;m.info.address=m.addressls[0];}else{m.LoadingMessage="正在加载,请稍候...";f.show({templateUrl:"/views/sg/templates/loadingIndicator.html",scope:m});m.info.hasShop=m.shop&&m.shop.id!=null;d.getMyOrders(m.shop.id,function(s,p){f.hide();var q=s.code,r=s.data;m.shop=r.shop;m.addressls=r.addressls;m.info.hasAddress=m.addressls.length>0?true:false;m.orders=r.orders;g(m.orders);m.info.hasOrder=m.orders.length>0?true:false;k.orderAddresses=m.addressls;k.orderOrders=m.orders;c.resize();},function(q,p){m.info.hasOrder=false;m.info.hasAddress=false;c.resize();f.hide();});}}m.addNewAddressInOrderPage=function(){if(!m.addr.address||!m.addr.phone||!l.isValidTelNumber(m.addr.phone)){b.alert({title:"请填写正确的地址电话",template:""});return;}m.LoadingMessage="正在添加新地址...";f.show({templateUrl:"/views/sg/templates/loadingIndicator.html",scope:m});var o=m.shop&&m.shop.id||1;d.addAddress(o,m.addr,function(s,p){var q=s.code,r=s.data;if(q!=0){b.alert({title:"添加新地址失败:"+s.msg,template:""});return;}f.hide();h.addressChangeEventAddNew(m.addr);c.resize();a.go("myOrders",null,{reload:true});},function(q,p){f.hide();b.alert({title:"添加新地址失败,重试",template:""});c.resize();});};m.switchToAddressList=function(o){o.target.blur();o.stopPropagation();a.go("userAddressList",null,{reload:true});};m.goToShopOrFindShop=function(){var o=e.get("MMMETA_shop");if(o&&o.id){a.go("productList",null,{reload:true});}else{a.go("findshop",null,{reload:true});}};i.orderChangeEventSuccess();h.onAddressChangeEventSwitchDefault(m,function(o){n(o.item);});h.onAddressChangeEventAddNew(m,function(o){n(o.item);});m.$on("$ionicView.enter",function(){m.shop=e.get("MMMETA_shop")||{};n();});});