angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $ionicLoading,$ionicPopup, $http, $state, localStorageService, httpClient) {

        $scope.shoppingCartItems = localStorageService.get('shoppingCart');
        $scope.shop = localStorageService.get('shop');

        $ionicLoading.show({
            template: 'Loading Data...'
        });

        httpClient.getConfirmCartList($scope.shop.id, $scope.shoppingCartItems, function(data, status){

            $ionicLoading.hide();

            var code = data.code, dataDetail = data.data;
            if (!code == 0) {
                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                return;
            }

            $scope.shop = dataDetail.shop;
            $scope.checkedShoppingCartItems = dataDetail.itemls;
            $scope.addressls = dataDetail.addressls;

        },function(data, status){
            $ionicLoading.hide();
        });

        $scope.goToAddressList = function(){
            $state.go('addressList');
        }

    });

