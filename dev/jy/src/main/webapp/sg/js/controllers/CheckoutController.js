angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $ionicLoading,$ionicPopup, $http, $state, localStorageService, httpClient,ShoppingCart) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.shop = localStorageService.get('shop');

        $ionicLoading.show({
            template: '正在加载，请稍候...'
        });

        $scope.info = {};
        $scope.info.address = {};
        $scope.info.newOrderAddress = '';
        $scope.info.newOrderPhone = '';

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
            $scope.info.address = $scope.addressls && $scope.addressls[0];

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

            ShoppingCart.itemChangeEventTriggered(item);
        }

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventTriggered(item);
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
                template: '正在生成订单...'
            });

            httpClient.getOrderSave($scope.shop.id,$scope.info.address.address_id,$scope.info.address.address,$scope.info.address.phone,
                $scope.info.remarks, $scope.shoppingCartItems,$scope.info.order_id, function(data, status){

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

