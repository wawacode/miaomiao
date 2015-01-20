angular.module('miaomiao.shop')
    .controller('OrderSuccessCtrl', function ($scope, $ionicLoading, $http, $state, $timeout,localStorageService) {

        $scope.counter = 3;


        $scope.onTimeout = function(){

            mytimeout = $timeout($scope.onTimeout,1000);

            $scope.counter--;

            if($scope.counter == 0){

                $timeout.cancel(mytimeout);

                $state.go('myOrders');

            }
        }

        var mytimeout = $timeout($scope.onTimeout,1000);

    });

