angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope,$rootScope, $ionicLoading,$ionicPopup, $http, $state, localStorageService, httpClient,ShoppingCart,AddressService) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.shop = localStorageService.get('MMMETA_shop');

        $scope.info = {};
        $scope.info.address = {};
        $scope.info.newOrderAddress = '';
        $scope.info.newOrderPhone = '';
        $scope.info.showAddNewAddress = true;

        function reloadInfo(){

            $ionicLoading.show({
                template: '正在核对,请稍候...'
            });

            httpClient.getConfirmCartList($scope.shop.id, ShoppingCart.getAllItems(), function(data, status){

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code == 500) {
                    $ionicPopup.alert({
                        title: '加载数据失败:' + data.msg,
                        template: ''
                    });
                    return;
                }else if(code == 100){
                    $ionicPopup.alert({
                        title: '部分商品不足，请谨慎购买:' + data.msg,
                        template: ''
                    });
                }

                $scope.shop = dataDetail.shop;

                // check results
                for(var i=0;i< dataDetail.itemls.length;i++){
                    var item = dataDetail.itemls[i];
                    for(var j=0; j < $scope.shoppingCartItems.length;j++ ){
                        if(item.id == $scope.shoppingCartItems[j].id){
                            if(item.info){
                                $scope.shoppingCartItems[j].message = item.info;
                            }
                        }
                    }
                }

                $scope.addressls = dataDetail.addressls;
                $scope.info.address = $scope.addressls && $scope.addressls[0];

                if($scope.info.address){
                    $scope.info.showAddNewAddress = false;
                }

            },function(data, status){

                $scope.shoppingCartItems = ShoppingCart.getAllItems();
                $ionicLoading.hide();
            });
        }

        reloadInfo();

        $scope.goToAddressList = function(){
            $state.go('addressList', null, { reload: true });
        }

        $scope.goback = function(){
            $state.go('productList', null, { reload: true });
        }

        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

        $scope.selectItem = function (item) {

            item.count += 1;

            ShoppingCart.itemChangeEventInShoppingCart(item);
        }

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventInShoppingCart(item);
        }

        function isValidTelNumber(number) {
            var regPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
            var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
            return regPhone.test(number) || regMobile.test(number);
        }



        $scope.confirmCheckout = function(){

            if($scope.addressls && $scope.addressls.length){
                $scope.info.address =  $scope.addressls[0];
            }else{
                $scope.info.address = {'address_id':'','address':$scope.info.newOrderAddress,'phone':$scope.info.newOrderPhone};

                if(!$scope.info.newOrderAddress || !$scope.info.newOrderPhone ||
                    ! isValidTelNumber($scope.info.newOrderPhone)){
                    $ionicPopup.alert({
                        title: '请填写正确的地址电话',
                        template: ''
                    });
                    return;
                }
            }

            $ionicLoading.show({
                template: '正在生成订单,请稍候...'
            });

            httpClient.getOrderSave($scope.shop.id,$scope.info.address.address_id,$scope.info.address.address,$scope.info.address.phone,
                $scope.info.remarks || '', $scope.shoppingCartItems,$scope.info.order_id, function(data, status){

                $ionicLoading.hide();

                    var code = data.code, dataDetail = data.data;
                    if (code == 500) {
                        $ionicPopup.alert({
                            title: '生成订单失败，请重新购买:' + data.msg,
                            template: ''
                        });
                        return;
                    }else if(code == 100){
                        $ionicPopup.alert({
                            title: '部分商品不足，请重新购买:' + data.msg,
                            template: ''
                        });
                        return;
                    }

                    $state.go('orderSuccess');

            },function(data, status){
                $ionicLoading.hide();
            })
        }


        AddressService.onAddressChangeEventSwitchDefault($scope,function(){
            reloadInfo();
        });

        AddressService.onAddressChangeEventAddNew($scope,function(){
            reloadInfo();
        });

    });

