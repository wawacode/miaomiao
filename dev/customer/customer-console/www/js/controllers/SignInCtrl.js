angular.module('miaomiao.console.controllers')

    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile,$ionicPopup, cfpLoadingBar, $timeout, $ionicScrollDelegate , $http, $state, localStorageService, httpClient) {

        $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};

        $scope.signIn = function (user) {

            $scope.LoadingMessage = '正在核对,请稍候...';
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

                $state.go('tab.front-page',null,{reload:true})

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '登陆失败',
                    template: ''
                });

                $state.go('tab.front-page',null,{reload:true})

            });
        };
    });