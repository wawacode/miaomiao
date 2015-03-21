;angular.module('miaomiao.shop').
    controller('LoadingCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService, $timeout, ShopService ,httpClient, MMUtils) {

        $scope.info = {};

        $scope.info.showLocateImg = true;

        function showPosition(position) {

            if (position) {

                $scope.info.getGeolocationTitle = "定位成功，正在加载请稍候...";
                $scope.info.getGeolocationTitleClass = 'getGeolocation-title-success';

                localStorageService.set('MMMETA_location_pos_ready',1);
                localStorageService.set('MMMETA_location_pos_data',
                    {'lat':position.coords.latitude,'lng':position.coords.longitude});

                $state.go('findshop');

            } else {
                $scope.info.getGeolocationTitle = "定位失败...";
                localStorageService.set('MMMETA_location_pos_ready',0);
                $state.go('findshop');
            }
        }

        function showError(error) {

            $scope.info.getGeolocationTitleClass = 'getGeolocation-title-fail';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.info.getGeolocationTitle = "定位失败，请确认您开启位置服务";

                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.info.getGeolocationTitle = "定位失败，请确认您开启位置服务";

                    break;
                case error.TIMEOUT:
                    $scope.info.getGeolocationTitle = "定位超时，请您重试";

                    break;
                case error.UNKNOWN_ERROR:
                    $scope.info.getGeolocationTitle = "定位出现未知错误，请您重试";

                    break;
                default:
                    $scope.info.getGeolocationTitle = "定位失败，请您重试";
            }
            // let user see the error message
            localStorageService.set('MMMETA_location_pos_ready',0);
            $state.go('findshop');

        }

        function getLocation() {
            if (navigator.geolocation) {
                var position_option = {
                    enableHighAccuracy: true,
                    timeout: 10000
                };
                navigator.geolocation.getCurrentPosition(showPosition, showError, position_option);
            } else {
                $scope.info.showLocateImg = false;
                $scope.info.getGeolocationTitle = "您的浏览器不支持定位！";
                localStorageService.set('MMMETA_location_pos_ready',0);
                $state.go('findshop');
            }
        }

        $scope.$on("$ionicView.afterEnter", function () {

            $scope.info.getGeolocationTitle = "定位中...";
            $scope.info.getGeolocationTitleClass = 'blink_me';

            // make sure shop info from server is source of truth
            $scope.info.hasDefaultShop = false;
            ShopService.getDefaultShopFromServer(function(shop){
                $scope.info.hasDefaultShop = true;
                ShopService.setDefaultShop(shop);
                $state.go('productList');

            },function(){
                // for legalcy reasons ,if have local meta data
                var localDefaultShop = localStorageService.get('MMMETA_shop');
                if (localDefaultShop && localDefaultShop.id) {
                    $scope.info.hasDefaultShop = true;
                    ShopService.setDefaultShopAndSync(localDefaultShop);
                    $state.go('productList');
                } else {
                    $scope.info.hasDefaultShop = false;
                    $timeout(function () {
                        getLocation();
                    }, 500);
                }
            });
        });
    });