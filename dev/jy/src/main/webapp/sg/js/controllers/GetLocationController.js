angular.module('miaomiao.shop').
    controller('LoadingCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService, $timeout) {


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

});