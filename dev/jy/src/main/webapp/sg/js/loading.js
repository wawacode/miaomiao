angular.module('ionic.loading', ['ionic', 'LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('locate', {
                url: '/',
                templateUrl: 'templates/locate.html',
                controller: 'LoadingCtrl'
            })
            .state('findshop', {
                url: '/findshop',
                templateUrl: 'templates/findshop.html',
                controller: 'FindShopCtrl'
            });

        $urlRouterProvider.otherwise('/');
    })

    .controller('LoadingCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService, $timeout) {


        $scope.getGeolocationTitle = "定位中...";
        $scope.getGeolocationTitleClass = 'blink_me';
        $scope.showLocateImg = true;

        var url = window.location.origin + "/sg/f";

        function forceUpdate(cb) {
            $scope.$apply(function () {
                cb();
            });
        }

        function showPosition(position) {
            if (position) {

                forceUpdate(function () {
                    $scope.getGeolocationTitle = "定位成功，正在加载请稍候...";
                    $scope.getGeolocationTitleClass = 'getGeolocation-title-success';
                })

                url = url + "?" + "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
                window.location.href = url;
            } else {
                window.location.href = url;
            }
        }

        function showError(error) {

            forceUpdate(function () {
                $scope.getGeolocationTitleClass = 'getGeolocation-title-fail';
            })

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    forceUpdate(function () {
                        $scope.getGeolocationTitle = "定位失败，请确认您开启位置服务";
                    })

                    break;
                case error.POSITION_UNAVAILABLE:
                    forceUpdate(function () {
                        $scope.getGeolocationTitle = "定位失败，请确认您开启位置服务";
                    })

                    break;
                case error.TIMEOUT:
                    forceUpdate(function () {
                        $scope.getGeolocationTitle = "定位超时，请您重试";
                    })

                    break;
                case error.UNKNOWN_ERROR:
                    forceUpdate(function () {
                        $scope.getGeolocationTitle = "定位出现未知错误，请您重试";
                    })

                    break;
                default:
                    forceUpdate(function () {
                        $scope.getGeolocationTitle = "定位失败，请您重试";
                    })

            }
            // let user see the error message
            $state.go('findshop');

        }

        function getLocation() {
            if (navigator.geolocation) {
                var position_option = {
                    timeout: 10000
                };

                navigator.geolocation.getCurrentPosition(showPosition, showError, position_option);
            } else {
                $scope.showLocateImg = false;
                $scope.getGeolocationTitle = "您的浏览器不支持定位！";
                $state.go('findshop');
            }
        }

        $timeout(function() {
                getLocation();
            },1000
        );
//        window.addEventListener('load', getLocation, true);

    }).controller('FindShopCtrl', function ($scope, $http, $state, localStorageService) {

        $scope.shop_data = {};
        $scope.showShopList = false;
        $scope.showShopHistory = false;
        $scope.showShopHot = true;

        $scope.shop_history = localStorageService.get('shop_history') || [];
        if($scope.shop_history.length){
            $scope.showShopHistory = true;
        }

        $scope.clearSearch = function () {
            $scope.shop_data.searchQuery = '';
            $scope.showShopList = false;
            $scope.showShopHistory = true;
            $scope.showShopHot = true;
        };

        $scope.startSearch = function () {
            $scope.showShopList = true;
            $scope.showShopHistory = false;
            $scope.showShopHot = false;
        };

        $scope.goToShop = function (shop) {

            if(shop.status4V !=undefined && shop.status4V != "营业中"){
                return;
            }

            var shopExist = false;
            for (var i = 0; i < $scope.shop_history.length; i++) {
                if (shop.id == $scope.shop_history[i].id) {
                    shopExist = true;
                    break;
                }
            }
            if (!shopExist) {
                $scope.shop_history.push(shop);
            }

            localStorageService.set('shop_history', $scope.shop_history);

            window.location.href = window.location.origin + "/sg/shop?shop_id=" + shop.id;
        }


        var params = 'from=0&offset=100';
        $http.get('shop/shopList?' + params).
            success(function (data, status, headers, config) {
                $scope.shop_items = data.data;
            }).
            error(function (data, status, headers, config) {

            });
    });