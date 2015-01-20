var miaomiao = angular.module('miaomiao.shop', ['ionic', 'LocalStorageModule','ngStorage'], function($httpProvider) {

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

miaomiao.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('productList', {
                url: '/productlist',
                templateUrl: '/views/sg/templates/productList.html',
                controller: 'ProductCtrl'

            })
            .state('search', {
                url: '/search',
                templateUrl: '/views/sg/templates/search.html',
                controller: 'ProductCtrl'

            })
            .state('checkout', {
                url: '/checkout',
                templateUrl: '/views/sg/templates/checkout.html',
                controller: 'CheckoutCtrl'
            })
            .state('addressList', {
                url: '/addresslist',
                templateUrl: '/views/sg/templates/addressList.html',
                controller: 'AddressListCtrl'
            })
            .state('addAddress', {
                url: '/addaddress',
                templateUrl: '/views/sg/templates/addAddress.html',
                controller: 'AddAddressCtrl'
            })
            .state('orderSuccess', {
                url: '/ordersuccess',
                templateUrl: '/views/sg/templates/orderSuccess.html',
                controller: 'OrderSuccessCtrl'
            })
            .state('myOrders', {
                url: '/myorders',
                templateUrl: '/views/sg/templates/myOrders.html',
                controller: 'MyOrdersCtrl'
            });

        $urlRouterProvider.otherwise('/productlist');

    });

