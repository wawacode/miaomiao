angular.module('miaomiao.shop', ['ionic', 'LocalStorageModule'])
  .factory('httpClient', ['$http', function ($http) {

        var doRequest = function (path, params, success, fail) {
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
            ;
        }

        return {
            getProductList: function (shopId, success, fail) {
                doRequest('shop/category/get', 'shop_id=' + shopId, success, fail);
            },
            getMoreProductList: function (shopId, cateId,from,offset, success, fail) {

                doRequest('shop/getitems', "shop_id=" + shopId +
                    "&category_id=" + cateId + "&from=" + from +
                    "&offset=" + offset, success, fail);
            },
            getAddressList: function (shopId, success, fail) {
                doRequest('address', 'shop_id=' + shopId, success, fail);
            },
            getConfirmCartList: function (shopId, items, success, fail) {
                doRequest('shopCar/confirm', 'shop_id=' + shopId, success, fail);
            }
        };
    }]);

