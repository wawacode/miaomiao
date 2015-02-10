angular.module('miaomiao.console.controllers')

    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile,$ionicPopup, cfpLoadingBar, $timeout, $ionicScrollDelegate , $http, $state, localStorageService, httpClient,MMUtils,MMPushNotification) {

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
                localStorageService.set('MMCONSOLE_METADATA_SHOP_LIST',dataDetail.shop);
                localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP',dataDetail.shop[0]);

                MMPushNotification.subscribe();

                $state.go('tab.front-page',null,{reload:true})

                // subscribe current device

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '登陆失败',
                    template: ''
                });
            });
        };

        // validate user login
        httpClient.islogin(function (data, status) {

            var code = data.code, dataDetail = data.data;
            if (code != 0 ) {
                return;
            }
            //success
            localStorageService.set('MMCONSOLE_METADATA_SHOP_LIST',dataDetail.shop);
            localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP',dataDetail.shop[0]);

            $state.go('tab.front-page',null,{reload:true})

        }, function (data, status) {
        });
    });