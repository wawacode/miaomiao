var miaomiao = angular.module('miaomiao.console.services');

miaomiao.factory('httpClient', ['$http', 'serverInfo', function ($http, serverInfo) {

    var doGet = function (path, params, success, fail) {

        $http({
            method: 'GET',
            url: serverInfo.host + serverInfo.context + path + '?' + params
        }).
            success(function (data, status, headers, config) {
                success(data, status, headers, config)
            }).
            error(function (data, status, headers, config) {
                fail(data, status, headers, config)
            });
    }

    var doPost = function (path, params, success, fail) {


        $http.post(serverInfo.host + serverInfo.context + path, params,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).
            success(function (data, status, headers, config) {
                success(data, status, headers, config)
            }).
            error(function (data, status, headers, config) {
                fail(data, status, headers, config)
            });

    }

    var development = false;
    return {

        islogin: function (token,success, fail) {

            doGet('login/islogin','token='+ token, success, fail);
        },

        login: function (phone, pwd, success, fail) {

            doPost('login/valid', {'phone': phone, pwd: pwd}, success, fail);
        },

        logOut: function (phone,success, fail) {

            doGet('logout', 'phone=' + phone, success, fail);
        },

        changePwd: function (phone, old_pwd,new_pwd, success, fail) {

            doPost('login/change_pwd', {'phone': phone, old_pwd: old_pwd,new_pwd:new_pwd}, success, fail);
        },

        getSummary: function (shopId, beginDate, endDate, success, fail) {

//            if (development)return success(testdata.summary);

            doGet('order/summary', 'shop_id=' + shopId + '&beginDate=' + beginDate + "&endDate=" + endDate, success, fail);
        },

        getProductList: function (shopId, success, fail) {

//            if (development)return success(testdata.productInfo);

            doGet('shop/category/get', 'shop_id=' + shopId, success, fail);
        },

        getMoreProductList: function (shopId, cateId, from, offset, success, fail) {

//            if (development)return success(testdata.moreProductInfo);

            doGet('shop/getitems', "shop_id=" + shopId +
                "&category_id=" + cateId + "&from=" + from +
                "&offset=" + offset, success, fail);
        },


        getMyOrders: function (shopId, from, offset, success, fail) {

//            if (development)return success(testdata.orderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        orderHasbeenRead: function (shopId, order_id, success, fail) {

//            if (development)return success(testdata.orderInfo);

            doGet('order/read', 'shop_id=' + shopId + '&order_id=' + order_id, success, fail);
        },

        getMoreMyOrders: function (shopId, from, offset, success, fail) {

//            if (development)return success(testdata.moreOrderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        getSearchResults: function (shopId, key, success, fail) {
            doGet('shopItem/query', 'shop_id=' + shopId + '&query=' + key, success, fail);
        },


        getItemInfo: function (serialNo, success, fail) {
            doGet('product/get', 'serialNo=' + serialNo, success, fail);
        },

        deleteItem: function (itemId, shopId, success, fail) {
            doGet('shopItem/del', 'itemId=' + itemId + '&shop_id=' + shopId, success, fail);
        },

        stickItem: function (itemId,categoryId, shopId, success, fail) {
            doGet('shopItem/sticky', 'itemId=' + itemId + '&category_id='+ categoryId + '&shop_id=' + shopId, success, fail);
        },

        addItem: function (options, success, fail) {

            doPost('shopItem/addItem',

               options, success, fail);

        },

        updateItem: function (options, shopId, success, fail) {

            doPost('shopItem/update',

                {'itemName': options.itemName,
                    itemId: options.itemId,
                    serialNo: options.serialNo,
                    category_id: options.category_id,
                    count: options.count,
                    score: options.score,
                    price: options.price,
                    pic: options.pic,
                    shop_id:shopId
                },

                success, fail);

        },

        uploadPicForItem: function (serialNo,fileURI, shopId, success, fail) {

            var options = new FileUploadOptions();
            options.fileKey = "pic";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {serialNo:serialNo,pic:fileURI,shop_id:shopId}; // if we need to send parameters to the server request

            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI(serverInfo.host + serverInfo.context + "shopItem/ul_pic"), success, fail, options);

        },


        getShopList: function (from, offset, success, fail) {

            doGet('shop/shopList', 'from=' + from + '&offset=' + offset, success, fail);

        },

        updateShopInfo: function (options, success, fail) {

            doPost('shop/updateShopInfo', options, success, fail);

        },

        getShopInfo: function (shop_id, success, fail) {

            doGet('shop', 'shop_id=' + shop_id, success, fail);

        },
        getNearShopList: function (lat, lng, success, fail) {

            doGet('near', 'lat=' + lat + '&lng=' + lng, success, fail);

        },

        subscribeForCurrentDevice: function (ower_phone, chn, device_token, success, fail) {

            doGet('subscribe', 'ower_phone=' + ower_phone + '&chn=' + chn + '&device_token=' + device_token, success, fail);

        }

    };
}]);

miaomiao.factory('MMPushNotification', ['$rootScope','httpClient','localStorageService','$cordovaToast','$timeout', function ($rootScope,httpClient,localStorageService,$cordovaToast,$timeout) {
      return {
          subscribe: function(){
              var token = localStorageService.get('MMCONSOLE_META_PUSH_DEVICE_TOKEN');
              var user = localStorageService.get('MMCONSOLE_METADATA_USER');
              if(token && user && user.phone){
                  var chn = 'iOS';
                  if (ionic.Platform.isAndroid()) {
                      chn = 'adr'
                  }
                  httpClient.subscribeForCurrentDevice(user.phone, chn, token,function(){
//                      $cordovaToast.showShortCenter('注册通知成功，您将会在此应用中收到新订单通知~');
                      console.log('注册通知成功，您将会在此应用中收到新订单通知~');

                  },function(){

                  });
              }
         },
          newOrderNotificationReceived: function (data) {
                console.log('we see new orders and send broadcast');
              $timeout(function(){
                  $rootScope.$broadcast('MMEVENT_NewOrderNotificationReceived', {
                      data: data
                  });
              });
          },

          onNewOrderNotificationReceived: function ($scope, handler) {
              console.log('we see new orders and listened it');
              $scope.$on('MMEVENT_NewOrderNotificationReceived', function (event, message) {
                  handler(message);
              });
          }
      }
}]);

miaomiao.factory('MMShopService', ['$rootScope','httpClient','localStorageService','$timeout', function ($rootScope,httpClient,localStorageService,$timeout) {
    return {

        switchDefaultShopNotification: function (data) {
            $timeout(function(){
                $rootScope.$broadcast('MMEVENT_switchDefaultShopNotification', {
                    data: data
                });
            });
        },

        onSwitchDefaultShopNotification: function ($scope, handler) {
            $scope.$on('MMEVENT_switchDefaultShopNotification', function (event, message) {
                handler(message);
            });
        }
    }
}]);


