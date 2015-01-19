angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService, httpClient) {

        $scope.shoppingCartItems = localStorageService.get('shoppingCart');
        $scope.shop = localStorageService.get('shop');

        $ionicLoading.show({
            template: 'Loading Data...'
        });

        httpClient.getConfirmCartList($scope.shop.id, $scope.shoppingCartItems, function(data, status){

            $ionicLoading.hide();

        },function(data, status){
            $ionicLoading.hide();
        });

        $scope.goToAddressList = function(){
            $state.go('addressList');
        }

    });

