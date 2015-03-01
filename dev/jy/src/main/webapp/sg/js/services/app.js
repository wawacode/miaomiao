var miaomiao = angular.module('miaomiao.shop', ['ionic',
    'LocalStorageModule',
    'ngStorage',
    'ngAnimate',
    'pasvaz.bindonce',
    'QuickList',
    'ionic.rating'],

    function($httpProvider,$provide) {

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
            .state('locate', {
                url: '/locate',
                templateUrl: '/views/sg/templates/locate.html',
                controller: 'LoadingCtrl'
            })
            .state('findshop', {
                url: '/findshop',
                templateUrl: '/views/sg/templates/findShop.html',
                controller: 'FindShopCtrl'
            })
            .state('productList', {
                url: '/productlist',
                templateUrl: '/views/sg/templates/productList.html',
                controller: 'ProductCtrl'

            })
            .state('goToShop', {
                url: "/shop?shop_id",
                templateUrl: '/views/sg/templates/productList.html',
                controller: 'GoToShopCtrl'

            })
            .state('search', {
                url: '/search',
                templateUrl: '/views/sg/templates/search.html',
                controller: 'SearchCtrl'

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
            .state('userAddressList', {
                url: '/useraddresslist',
                templateUrl: '/views/sg/templates/addressList.html',
                controller: 'UserAddressListCtrl'
            })
            .state('userAddAddress', {
                url: '/useraddaddress',
                templateUrl: '/views/sg/templates/addAddress.html',
                controller: 'UserAddAddressCtrl'
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

        $urlRouterProvider.otherwise('/locate');

    }).config(function($provide) {
        $provide.decorator('$state', function($delegate, $stateParams) {
            $delegate.forceReload = function() {
                return $delegate.go($delegate.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            };
            return $delegate;
        });
    });

