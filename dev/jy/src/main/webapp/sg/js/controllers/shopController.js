angular.module('miaomiao.shop', ['ionic', 'LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider) {

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

    }).controller('ProductCtrl', function ($scope, $ionicLoading, $ionicPopup, $http, $state, localStorageService, httpClient) {
        $scope.shop = $scope.shop || {};

        httpClient.getProductList($scope.shop.id, function (data, status) {

            var code = data.code, dataDetail = data.data;
            if (!code == 0) {
                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                return;
            }

            $scope.shop = dataDetail.shop;
            $scope.categoryls = dataDetail.categoryls;
            // extend for use
            /*
             {"category_id":15,"category_sub_id":0,"id":0,
             "itemls":[{"category_id":15,"category_sub_id":0,"count":956,"create_time":1419821656000,"ext":0,"id":28062,"name":"哈哈镜鸭爪买一赠一",
             "pic_url":"http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             "score":99999,"serialNo":"HHJ001","shop_id":1,"status":0}
             * */
           for(var idx=0;idx< $scope.categoryls.length;idx++){
               $scope.categoryls.totolCnt = 0;
               $scope.categoryls.selected = 0;
               if(idx == 0){
                   $scope.categoryls.selected = 1;
               }
               for(var item_idx =0;item_idx < $scope.categoryls.items.length;item_idx++){
                   $scope.categoryls.items.selectedCnt = 0;
               }
           }

           $scope.currentDisplayItems = $scope.categoryls.length && $scope.categoryls[0].items;

        }, function (data, status) {
            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            return;
        });
    })
    .controller('CheckoutCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService) {

    })
    .controller('AddressListCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService) {

    })
    .controller('AddAddressCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService) {

    })
    .controller('OrderSuccessCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService) {

    })
    .controller('MyOrdersCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService) {

    }).directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});

