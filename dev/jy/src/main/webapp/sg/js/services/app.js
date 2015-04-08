;
angular.module('miaomiao.shop', ['ionic',
        'LocalStorageModule',
        'ngStorage',
        'ngAnimate',
        'pasvaz.bindonce',
        'QuickList'
    ])
    .config(function ($httpProvider, $provide) {

        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
        $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

        $stateProvider
            .state('locate', {
                url: '/locate',
                templateUrl: 'templates/locate.html',
                controller: 'LoadingCtrl'
            })
            .state('findshop', {
                url: '/findshop',
                templateUrl: 'templates/findShop.html',
                controller: 'FindShopCtrl'
            })
            .state('productList', {
                url: '/productlist',
                templateUrl: 'templates/productList.html',
                controller: 'ProductCtrl'

            })
            .state('goToShop', {
                url: "/shop?shop_id",
                templateUrl: 'templates/locate.html',
                controller: 'GoToShopCtrl'

            })
            .state('search', {
                url: '/search',
                templateUrl: 'templates/searchProduct.html',
                controller: 'SearchCtrl'

            })
            .state('checkout', {
                url: '/checkout',
                templateUrl: 'templates/checkoutOrder.html',
                controller: 'CheckoutCtrl'
            })
            .state('addressList', {
                url: '/addresslist',
                templateUrl: 'templates/addressList.html',
                controller: 'AddressListCtrl'
            })
            .state('userAddressList', {
                url: '/useraddresslist',
                templateUrl: 'templates/addressList.html',
                controller: 'UserAddressListCtrl'
            })
            .state('myOrders', {
                url: '/myorders',
                templateUrl: 'templates/myOrders.html',
                controller: 'MyOrdersCtrl'
            })
            .state('myOrdersClear', {
                url: '/orders',
                templateUrl: 'templates/myOrdersClear.html',
                controller: 'MyOrdersCtrl'
            })
            .state('myCoupons', {
                url: '/mycoupons',
                templateUrl: 'templates/couponList.html',
                controller: 'CouponListCtrl'
            });

        $urlRouterProvider.otherwise('/locate');

    }).config(function ($provide) {
        $provide.decorator('$state', function ($delegate, $stateParams) {
            $delegate.forceReload = function () {
                return $delegate.go($delegate.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            };
            return $delegate;
        });
    });

