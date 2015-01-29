var miaomiao = angular.module('miaomiao.console.services');

miaomiao.factory('httpClient', ['$http','serverInfo', function ($http,serverInfo) {

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

    return {

        login:function(phone,pwd, success, fail){

            doPost('login/valid',{'phone': phone, pwd: pwd},success, fail);
        },

        getProductList: function (shopId, success, fail) {

            return success(testdata.productInfo);

            doGet('shop/category/get', 'shop_id=' + shopId, success, fail);
        },
        getMoreProductList: function (shopId, cateId, from, offset, success, fail) {

            return success(testdata.moreProductInfo);

            doGet('shop/getitems', "shop_id=" + shopId +
                "&category_id=" + cateId + "&from=" + from +
                "&offset=" + offset, success, fail);
        },

        getMyOrders: function (shopId,from,offset, success, fail) {

            return success(testdata.orderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        getMoreMyOrders: function (shopId,from,offset, success, fail) {

            return success(testdata.moreOrderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        getSearchResults: function (shopId, key, success, fail) {
            doGet('search/query', 'shop_id=' + shopId + '&key=' + key, success, fail);
        },

        getShopList: function (from, offset, success, fail) {

            doGet('shop/shopList', 'from=' + from + '&offset=' + offset, success, fail);

        },
        getShopInfo: function (shop_id, success, fail) {

            doGet('shop', 'shop_id=' + shop_id, success, fail);

        },
        getNearShopList: function (lat, lng, success, fail) {

            doGet('near', 'lat=' + lat + '&lng=' + lng, success, fail);

        }

    };
}]);

