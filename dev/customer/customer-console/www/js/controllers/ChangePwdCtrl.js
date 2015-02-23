angular.module('miaomiao.console.controllers')
    .controller('ChangePwdCtrl', function ($scope, $ionicLoading, $compile, $ionicPopup, $timeout, $ionicScrollDelegate, $http, $state, localStorageService, httpClient, MMUtils, MMPushNotification, MMUtils) {

        $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};

        $scope.changepwd = function (user) {

            if (!$scope.user.old_password || !$scope.user.new_password || !$scope.user.new_password_confirm) {
                MMUtils.showAlert('密码输入不能为空');
                return;
            }

            if ($scope.user.old_password == $scope.user.new_password) {
                MMUtils.showAlert('新密码不能与旧密码相同');
                return;
            }

            if ($scope.user.new_password != $scope.user.new_password_confirm) {
                MMUtils.showAlert('新密码两次输入不一致');
                return;
            }

            MMUtils.showLoadingIndicator('正在修改密码,请稍候...', $scope);

            httpClient.changePwd($scope.user.phone, $scope.user.old_password, $scope.user.new_password, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('修改密码失败:' + data.msg);
                    return;
                }

                $state.go('signin', null, {reload: true})

                // subscribe current device

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('修改密码失败');
            });
        };

    });