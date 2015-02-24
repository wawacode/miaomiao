angular.module('miaomiao.console.controllers')

    .controller('ChangePwdCtrl', function ($scope, $ionicLoading, $compile,$ionicPopup, cfpLoadingBar, $timeout, $ionicScrollDelegate , $http, $state, localStorageService, httpClient,MMUtils,MMPushNotification) {

        $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};

        $scope.changepwd = function (user) {

            if(!$scope.user.old_password ||
                !$scope.user.new_password ||
                !$scope.user.new_password_confirm){
                $ionicPopup.alert({
                    title: '密码输入不能为空',
                    template: ''
                });
                return;
            }

            if($scope.user.old_password == $scope.user.new_password){
                $ionicPopup.alert({
                    title: '新密码不能与旧密码相同',
                    template: ''
                });
                return;
            }

            if($scope.user.new_password != $scope.user.new_password_confirm){
                $ionicPopup.alert({
                    title: '新密码两次输入不一致',
                    template: ''
                });
                return;
            }

            $scope.LoadingMessage = '正在修改密码,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.changePwd($scope.user.phone, $scope.user.old_password, $scope.user.new_password, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '修改密码失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                $state.go('signin',null,{reload:true})

                // subscribe current device

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '修改密码失败',
                    template: ''
                });
            });
        };

    });