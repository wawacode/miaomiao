angular.module('miaomiao.shop', ['ionic'])
    .factory('httpClient', ['$http', function ($http) {

        var doRequest = function (path) {
            return $http({
                method: 'GET',
                url: path
            });
        }
        return {
            getProductList: function () {
                return doRequest('productList');
            }
        };
    }]);