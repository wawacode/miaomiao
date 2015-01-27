angular.module('miaomiao.console.controllers')

    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile, cfpLoadingBar, $timeout, $ionicScrollDelegate , $http, $state, localStorageService) {

        $scope.user = localStorageService.get('user') || {};

        $scope.signIn = function (user) {

            // verity
            $ionicLoading.show({
                template: 'Sign-In...'
            });

            $ionicLoading.hide();

            $state.go('tab.front-page',null,{reload:true})
        };
    });