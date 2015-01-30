angular.module('miaomiao.console.controllers')

    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile,$ionicPopup, cfpLoadingBar, $timeout, $ionicScrollDelegate , $http, $state, localStorageService, httpClient,MMUtils) {

        $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};

        $scope.signIn = function (user) {

            if(!$scope.user.password || !$scope.user.name){
                $ionicPopup.alert({
                    title: '请输入用户名和密码',
                    template: ''
                });
                return;
            }

            if(!MMUtils.isValidTelNumber($scope.user.phone)){
                $ionicPopup.alert({
                    title: '电话号码格式不正确',
                    template: ''
                });
                return;
            }

            $scope.LoadingMessage = '正在登陆,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });


            httpClient.login($scope.user.phone, $scope.user.password, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code == -1 || code == -2 ||code == -3 || code == 500 ) {
                    $ionicPopup.alert({
                        title: '登陆失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                //success
                localStorageService.set('MMCONSOLE_METADATA_USER',{'name':$scope.user.name , 'phone' : $scope.user.phone});
                localStorageService.set('MMCONSOLE_METADATA_SHOP',dataDetail.shop);

                $state.go('tab.front-page',null,{reload:true})

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '登陆失败',
                    template: ''
                });
            });
        };
    });