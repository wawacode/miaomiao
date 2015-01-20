angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $ionicLoading,$ionicPopup, $http, $state, localStorageService, httpClient,ShoppingCart) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
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

            // check results
            for(var i=0;i< dataDetail.itemls.length;i++){

            }

            $scope.addressls = dataDetail.addressls;

        },function(data, status){
            $ionicLoading.hide();
        });

        $scope.goToAddressList = function(){
            $state.go('addressList');
        }


        $scope.cartReadyToShip = function(){

            return ShoppingCart.cartReadyToShip();

        }


        $scope.confirmCheckout = function(){

            $ionicLoading.show({
                template: '正在生成订单...'
            });

            httpClient.getOrderSave($scope.shop.id, $scope.checkedShoppingCartItems, function(data, status){

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    $ionicPopup.alert({
                        title: '生成订单失败，请重新购买',
                        template: ''
                    });
                    return;
                }
                $state.go('orderSuccess');

            },function(data, status){
                $ionicLoading.hide();
            })
        }


    });

