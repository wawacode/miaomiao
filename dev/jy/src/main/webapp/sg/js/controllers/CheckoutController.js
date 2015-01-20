angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $ionicLoading,$ionicPopup, $http, $state, localStorageService, httpClient,ShoppingCart) {


        $scope.shop = localStorageService.get('shop');

        $ionicLoading.show({
            template: 'Loading Data...'
        });

        httpClient.getConfirmCartList($scope.shop.id, ShoppingCart.getAllItems(), function(data, status){

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
            $scope.shoppingCartItems = ShoppingCart.getAllItems();

            // check results
            for(var i=0;i< dataDetail.itemls.length;i++){
                var item = dataDetail.itemls[i];
                for(var j=0; j < $scope.shoppingCartItems.length;j++ ){
                    if(item.id == $scope.shoppingCartItems[j].id){
                        if(item.ext != item.count){
                            $scope.shoppingCartItems[j].message = '库存不足';
                        }
                    }
                }
            }

            $scope.addressls = dataDetail.addressls;

        },function(data, status){

            $scope.shoppingCartItems = ShoppingCart.getAllItems();
            $ionicLoading.hide();
        });

        $scope.goToAddressList = function(){
            $state.go('addressList', null, { reload: true });
        }

        $scope.goback = function(){
            $state.go('productList', null, { reload: true });
        }

        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

        $scope.selectItem = function (item) {

            item.count += 1;

            //TODO: emit to let shop controller know the category changed
//            $scope.currentDisplayCategory.totalCnt += 1;

//            ShoppingCart.addItemToCart(item);

//            updateShoppingCart();

        }

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            //TODO: emit to let shop controller know the category changed
//            $scope.currentDisplayCategory.totalCnt -= 1;
//            $scope.currentDisplayCategory.totalCnt = $scope.currentDisplayCategory.totalCnt >= 0 ? $scope.currentDisplayCategory.totalCnt : 0;

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

