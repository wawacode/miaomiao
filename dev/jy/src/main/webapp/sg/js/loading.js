angular.module('ionic.loading', ['ionic', 'LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('locate', {
                url: '/locate',
                templateUrl: 'templates/locate.html'
            })
            .state('findshop', {
                url: '/findshop',
                templateUrl: 'templates/findshop.html'
            });

        $urlRouterProvider.otherwise('/locate');
    })

    .controller('LoadingCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService, $timeout) {


        $scope.getGeolocationTitle = "定位中......";
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
            $timeout(function () {

                $scope.shop_data = {};
                $scope.showShopList = false;
                $scope.showShopHistory = true;
                $scope.shop_items = [
                    { id: '1', text: '海淀' },
                    { id: '1', text: '朝阳' },
                    { id: '1', text: '大行' },
                    { id: '1', text: '丰台' },
                    { id: '1', text: '东城' },
                    { id: '1', text: '西城' }
                ];

                $scope.shop_history = [
                    { id: '1', text: '回龙观' },
                    { id: '1', text: '霍营' },
                    { id: '1', text: '望京' }
                ];

                $scope.clearSearch = function () {
                    $scope.shop_data.searchQuery = '';
                    $scope.showShopList = false;
                    $scope.showShopHistory = true;
                };

                $scope.startSearch = function () {
                    $scope.showShopList = true;
                    $scope.showShopHistory = false;
                };

                $scope.goToShop = function(shop){

                    window.location.url = window.location.origin + "/sg/shop?shop_id=" + shop.id;
                }
                $scope.relocation = function(){
                    $state.go('locate');
                    getLocation();
                }

                var info = {};
                $http.post('shop/shopList', info).
                    success(function (data, status, headers, config) {

                        $state.go('findshop');
                    }).
                    error(function (data, status, headers, config) {

                        $state.go('findshop');
                    });
            }, 500);


        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $scope.showLocateImg = false;
                $scope.getGeolocationTitle = "您的浏览器不支持定位！";
                $state.go('findshop');
            }
        }

        window.addEventListener('load', getLocation, true);

    });