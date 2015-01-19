angular.module('miaomiao.shop', ['ionic', 'LocalStorageModule'])
    .controller('CheckoutCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService, httpClient) {

        $scope.shoppingCartItems = localStorageService.get('shoppingCart');
        $scope.shop = localStorageService.get('shop');

        $ionicLoading.show({
            template: 'Loading Data...'
        });

        httpClient.getConfirmCartList($scope.shop.id,$scope.shoppingCartItems, function(data, status){

        },function(data, status){

        });


        $scope.goToAddressList = function(){
            $state.go('addressList');
        }


    });

