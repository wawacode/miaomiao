var miaomiao=angular.module("miaomiao.shop",["ionic","LocalStorageModule","ngStorage","ngAnimate","pasvaz.bindonce","QuickList","ionic.rating"],function(b,a){b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8";var c=function(g){var l="",d,m,h,e,j,k,f;for(d in g){m=g[d];if(m instanceof Array){for(f=0;f<m.length;++f){j=m[f];h=d+"["+f+"]";k={};k[h]=j;l+=c(k)+"&";}}else{if(m instanceof Object){for(e in m){j=m[e];h=d+"["+e+"]";k={};k[h]=j;l+=c(k)+"&";}}else{if(m!==undefined&&m!==null){l+=encodeURIComponent(d)+"="+encodeURIComponent(m)+"&";}}}}return l.length?l.substr(0,l.length-1):l;};b.defaults.transformRequest=[function(d){return angular.isObject(d)&&String(d)!=="[object File]"?c(d):d;}];});miaomiao.config(function(b,a){b.state("locate",{url:"/locate",templateUrl:"/views/sg/templates/locate.html",controller:"LoadingCtrl"}).state("findshop",{url:"/findshop",templateUrl:"/views/sg/templates/findShop.html",controller:"FindShopCtrl"}).state("productList",{url:"/productlist",templateUrl:"/views/sg/templates/productList.html",controller:"ProductCtrl"}).state("goToShop",{url:"/shop?shop_id",templateUrl:"/views/sg/templates/productList.html",controller:"GoToShopCtrl"}).state("search",{url:"/search",templateUrl:"/views/sg/templates/search.html",controller:"SearchCtrl"}).state("checkout",{url:"/checkout",templateUrl:"/views/sg/templates/checkout.html",controller:"CheckoutCtrl"}).state("addressList",{url:"/addresslist",templateUrl:"/views/sg/templates/addressList.html",controller:"AddressListCtrl"}).state("userAddressList",{url:"/useraddresslist",templateUrl:"/views/sg/templates/addressList.html",controller:"UserAddressListCtrl"}).state("myOrders",{url:"/myorders",templateUrl:"/views/sg/templates/myOrders.html",controller:"MyOrdersCtrl"});a.otherwise("/locate");}).config(function(a){a.decorator("$state",function(b,c){b.forceReload=function(){return b.go(b.current,c,{reload:true,inherit:false,notify:true});};return b;});});