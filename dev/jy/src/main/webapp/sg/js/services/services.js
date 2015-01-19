var miaomiao = angular.module('miaomiao.shop');

miaomiao.factory('httpClient', ['$http', function ($http) {

    var doGet = function (path, params, success, fail) {
        $http({
            method: 'GET',
            url: path + '?' + params
        }).
            success(function (data, status, headers, config) {
                success(data, status, headers, config)
            }).
            error(function (data, status, headers, config) {
                fail(data, status, headers, config)
            });
    }

    var doPost = function (path, params, success, fail) {

//        var transform = function(data){
//            return $.param(data);
//        }

        $http.post(path, params,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//                transformRequest: transform
            }).
            success(function (data, status, headers, config) {
                success(data, status, headers, config)
            }).
            error(function (data, status, headers, config) {
                fail(data, status, headers, config)
            });

    }

    return {

        getProductList: function (shopId, success, fail) {
            doGet('shop/category/get', 'shop_id=' + shopId, success, fail);
        },
        getMoreProductList: function (shopId, cateId, from, offset, success, fail) {

            doGet('shop/getitems', "shop_id=" + shopId +
                "&category_id=" + cateId + "&from=" + from +
                "&offset=" + offset, success, fail);
        },
        getAddressList: function (shopId, success, fail) {
            doGet('address', 'shop_id=' + shopId, success, fail);
        },
        getConfirmCartList: function (shopId, items, success, fail) {
            doPost('shopCar/confirm?shop_id=' + shopId, {'items': JSON.stringify(items)}, success, fail);
        },
        getOrderSave: function (shopId, items, success, fail) {
            doPost('order/save?shop_id=' + shopId, {'items': JSON.stringify(items)}, success, fail);
        }

    };
}]);

