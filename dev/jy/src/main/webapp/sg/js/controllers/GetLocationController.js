angular.module('miaomiao.shop').
    controller('LoadingCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService, $timeout,httpClient,MMUtils) {

    $scope.info = {};
    $scope.info.getGeolocationTitle = "定位中...";
    $scope.info.getGeolocationTitleClass = 'blink_me';
    $scope.info.showLocateImg = true;

    function showPosition(position) {

        if (position) {

            $scope.info.getGeolocationTitle = "定位成功，正在加载请稍候...";
            $scope.info.getGeolocationTitleClass = 'getGeolocation-title-success';

            httpClient.getShopByGEOLocation(position.coords.latitude, position.coords.longitude,function(data,status){

                var code = data.code, dataDetail = data.data;
                if (code != 0 || MMUtils.isEmptyObject(dataDetail)) {

                    $scope.info.getGeolocationTitle = "没有找到最近的店...";

                    $state.go('findshop');
                    return;
                }
                var shop = dataDetail.shop;

                localStorageService.set('MMMETA_shop',shop);

                $state.go('productList');

            },function(data,status){
                $state.go('findshop');
            });

        } else {
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
        $state.go('findshop');

    }

    function getLocation() {
        if (navigator.geolocation) {
            var position_option = {
                timeout: 10000
            };

            navigator.geolocation.getCurrentPosition(showPosition, showError, position_option);

        } else {
            $scope.info.showLocateImg = false;
            $scope.info.getGeolocationTitle = "您的浏览器不支持定位！";
            $state.go('findshop');
        }
    }

    $timeout(function() {
            var shop = localStorageService.set('MMMETA_shop');
            if(shop && shop.id){
                $state.go('productList');
            }else{
                getLocation();
            }
        }
    );

});