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


        function updateShoppingCart(){

            var totalCnt = 0,totalPrice = 0.0;
            for (var item_idx = 0; item_idx < $scope.checkedShoppingCartItems.length; item_idx++) {
                totalCnt += parseInt($scope.checkedShoppingCartItems[item_idx].count || 0);
                totalPrice += parseFloat($scope.checkedShoppingCartItems[item_idx].price || 0.0) * parseInt($scope.checkedShoppingCartItems[item_idx].count || 0);
            }

            $scope.shoppingCartTotalCount = totalCnt;
            $scope.shoppingCartTotalPrice = totalPrice/100.0;

        }

        $scope.cartReadyToShip = function(){
            updateShoppingCart();
            return $scope.shoppingCartTotalPrice >= 20.0;
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

