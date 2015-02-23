angular.module('miaomiao.console.controllers')
    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile, $ionicPopup, $timeout, $ionicScrollDelegate, $http, $state, localStorageService, httpClient, MMUtils, MMPushNotification) {

        $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};

        $scope.signIn = function (user) {

            if (!$scope.user.password || !$scope.user.name) {
                MMUtils.showAlert('请输入用户名和密码');
                return;
            }

            if (!MMUtils.isValidTelNumber($scope.user.phone)) {
                MMUtils.showAlert('电话号码格式不正确');
                return;
            }

            MMUtils.showLoadingIndicator('正在登陆,请稍候...', $scope);

            httpClient.login($scope.user.phone, $scope.user.password, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('登陆失败:' + data.msg);
                    return;
                }

                //success
                localStorageService.set('MMCONSOLE_METADATA_USER', {'name': $scope.user.name,
                    'phone': $scope.user.phone, 'identity': $scope.user.phone, 'token': dataDetail.token});
                localStorageService.set('MMCONSOLE_METADATA_SHOP_LIST', dataDetail.shop);
                localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP', dataDetail.shop[0]);

                MMPushNotification.subscribe();

                $state.go('tab.front-page', null, {reload: true})


            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('登陆失败');
            });
        };
    });