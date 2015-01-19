var miaomiao = angular.module('miaomiao.shop', ['ionic', 'LocalStorageModule']);

miaomiao.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('productList', {
                url: '/productlist',
                templateUrl: 'templates/productlist.html',
                controller: 'ProductCtrl'

            })
            .state('search', {
                url: '/search',
                templateUrl: 'templates/search.html',
                controller: 'ProductCtrl'

            })
            .state('checkout', {
                url: '/checkout',
                templateUrl: 'templates/checkout.html',
                controller: 'CheckoutCtrl'
            })
            .state('addressList', {
                url: '/addresslist',
                templateUrl: 'templates/addresslist.html',
                controller: 'AddressListCtrl'
            })
            .state('addAddress', {
                url: '/addaddress',
                templateUrl: 'templates/addaddress.html',
                controller: 'AddAddressCtrl'
            })
            .state('orderSucess', {
                url: '/ordersuccess',
                templateUrl: 'templates/ordersuccess.html',
                controller: 'OrderSuccessCtrl'
            })
            .state('myOrders', {
                url: '/myorders',
                templateUrl: 'templates/myorders.html',
                controller: 'MyOrdersCtrl'
            });

        $urlRouterProvider.otherwise('/productlist');

    });

