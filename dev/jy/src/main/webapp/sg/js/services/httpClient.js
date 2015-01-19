angular.module('miaomiao.shop', ['ionic'])
    .factory('httpClient', ['$http', function ($http) {

        var doRequest = function (path,params,success,fail) {
            $http({
                method: 'GET',
                url: path + '?' + params
            }).
                success(function (data, status, headers, config) {
                    success(data, status, headers, config)
                }).
                error(function (data, status, headers, config) {
                    fail (data, status, headers, config)
                });;
        }
        return {
            getProductList: function (shopId,success,fail) {
                return doRequest('category/get','shop_id='+shopId,success,fail);
            }
        };
    }]);