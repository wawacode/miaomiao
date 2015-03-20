;angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $rootScope, $timeout, $ionicLoading, $ionicPopup,
                                          $http, $state, localStorageService, httpClient, ShoppingCart, AddressService,
                                          OrderService,ShopService, MMUtils,WeiChatPay) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.shop = ShopService.getDefaultShop() || {};

        $scope.info = {};
        $scope.info.address = {};
        $scope.info.newOrderAddress = '';
        $scope.info.newOrderPhone = '';
        $scope.info.dataReady = false;

        $scope.CheckoutTypeEnum = {
            CHECKOUTTYPE_CASH:01,
            CHECKOUTTYPE_WXPAY:02,
            CHECKOUTTYPE_ALIPAY:03
        };

        $scope.checkoutType = [{
            'id': $scope.CheckoutTypeEnum.CHECKOUTTYPE_CASH,'name': '货到付款','selected':true
        },{
            'id': $scope.CheckoutTypeEnum.CHECKOUTTYPE_WXPAY,'name': '微信支付','selected':false
        }];

        function checkOrders() {

            $scope.info.remarks = "";

            MMUtils.showLoadingIndicator('正在查看库存,请稍候...',$scope);

            httpClient.getConfirmCartList($scope.shop.id, ShoppingCart.getAllItems(), function (data, status) {

                $ionicLoading.hide();
                $scope.info.dataReady = true;

                var code = data.code, dataDetail = data.data;
                if (code == 500) {
                    MMUtils.showAlert('加载数据失败:' + data.msg);
                    return;
                } else if (code == 100) {
                    MMUtils.showAlert('部分商品不足，您可以购买部分商品:' + data.msg);
                }

                $scope.shop = dataDetail.shop;

                // check results
                for (var i = 0; i < dataDetail.itemls.length; i++) {
                    var item = dataDetail.itemls[i];
                    for (var j = 0; j < $scope.shoppingCartItems.length; j++) {
                        if (item.id == $scope.shoppingCartItems[j].id) {
                            if (item.info) {
                                $scope.shoppingCartItems[j].message = item.info;
                            }
                        }
                    }
                }

                $scope.addressls = dataDetail.addressls;
                $scope.info.address = $scope.addressls && $scope.addressls.length && $scope.addressls[0];

                if (!$scope.info.address) {
                    $scope.info.showAddNewAddress = true;
                }

            }, function (data, status) {
                $ionicLoading.hide();
                $scope.info.dataReady = true;
            });
        }

        $scope.selectCheckoutType = function(index){

            for(var i=0;i< $scope.checkoutType.length;i++){
                if(index != i){
                    $scope.checkoutType[i].selected = false;
                }
            }

            $scope.checkoutType[index].selected = true;

            _updateCheckoutHintMessage();
        };

        $scope.goToAddressList = function () {
            $state.go('addressList', null, { reload: true });
        };

        $scope.goback = function () {
            $state.go('productList', null, { reload: true });
        };

        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

        $scope.selectItem = function (item) {

            item.count += 1;

            ShoppingCart.itemChangeEventInShoppingCart(item);
            updateShoppingCart();
        };

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventInShoppingCart(item);
            updateShoppingCart();
        };

        $scope.confirmCheckout = function () {

            if (!$scope.cartReadyToShip)return;

            if ($scope.addressls && $scope.addressls.length) {
                $scope.info.address = $scope.addressls[0];
            } else {
                $scope.info.address = {'id': '', 'address': $scope.info.newOrderAddress, 'phone': $scope.info.newOrderPhone};

                if (!$scope.info.newOrderAddress || !$scope.info.newOrderPhone || !MMUtils.isValidTelNumber($scope.info.newOrderPhone)) {
                    MMUtils.showAlert('请填写正确的地址电话');
                    return;
                }

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = $scope.info.address;
                $scope.info.showAddNewAddress = false;
            }

            var selectCheckoutType = $scope.checkoutType[0];
            for(var i=0;i< $scope.checkoutType.length;i++){
                if($scope.checkoutType[i].selected){
                    selectCheckoutType = $scope.checkoutType[i];
                    break;
                }
            }

            if(selectCheckoutType.id == $scope.CheckoutTypeEnum.CHECKOUTTYPE_CASH){

                MMUtils.showLoadingIndicator('正在生成订单,请稍候...',$scope);

                httpClient.getOrderSave($scope.shop.id, $scope.info.address.id, $scope.info.address.address, $scope.info.address.phone,
                    $scope.info.remarks || '', $scope.shoppingCartItems, $scope.info.order_id, function (data, status) {

                        $ionicLoading.hide();

                        var code = data.code, dataDetail = data.data;
                        if (code == 500) {
                            MMUtils.showAlert('生成订单失败，请重新购买:' + data.msg);
                            return;
                        } else if (code == 100) {
                            MMUtils.showAlert('部分商品不足，请重新购买:' + data.msg);
                            return;
                        }

                        // clear all shopping cart
                        ShoppingCart.clearAll();

                        updateShoppingCart();

                        $state.go('myOrders', null, {reload: true});

                    }, function (data, status) {
                        $ionicLoading.hide();
                        MMUtils.showAlert('生成订单失败，请重新购买');
                    })
            }else if(selectCheckoutType.id == $scope.CheckoutTypeEnum.CHECKOUTTYPE_WXPAY){

                function onWeixinPaySuccess(){
                    // clear all shopping cart
                    ShoppingCart.clearAll();

                    updateShoppingCart();

                    $state.go('myOrders', null, {reload: true});
                }

                httpClient.getOrderPrepayInfo($scope.shop.id, $scope.info.address.id, $scope.info.address.address, $scope.info.address.phone,
                    $scope.info.remarks || '', $scope.shoppingCartItems, $scope.info.order_id, function (data, status) {

                        $ionicLoading.hide();

                        var code = data.code, dataDetail = data.data;
                        if (code != 0) {
                            MMUtils.showAlert('生成订单失败，请重新购买:' + data.msg);
                            return;
                        }

                        dataDetail = {'prepay_id':dataDetail.pre_id};

                        if(!WeiChatPay.chooseWXPay){
                            MMUtils.showAlert('暂时无法使用微信购买,请选择其他支付方式');
                            return;
                        }

                        MMUtils.showLoadingIndicator('请稍候...',$scope);

                        WeiChatPay.chooseWXPay(dataDetail,function(){

                            $ionicLoading.hide();

                        },function(){

                            MMUtils.showAlert('微信支付成功');
                            onWeixinPaySuccess();

                        },function(){
                            MMUtils.showAlert('微信支付失败');
                        })

                    }, function (data, status) {
                        $ionicLoading.hide();
                        MMUtils.showAlert('生成订单失败，请重试');
                    });

            }

        };


        function updateDefaultOrderAddress(addr) {
            if (addr) {

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = addr;
                $scope.info.address = $scope.addressls[0];

            } else {
                // update from server
                MMUtils.showLoadingIndicator('正在更新地址...',$scope);

                httpClient.getAddressList($scope.shop.id, function (data, status) {

                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        MMUtils.showAlert('加载数据失败:' + data.msg);
                        return;
                    }

                    $ionicLoading.hide();

                    $scope.addressls = dataDetail.addressls || [];

                }, function (data, status) {
                    $scope.addressls = [];
                    MMUtils.showAlert('加载数据失败,请重试');
                })
            }
        }

        function _getCheckoutTypeDisplayMessage(){

            for(var i=0;i< $scope.checkoutType.length;i++){
                if($scope.checkoutType[i].selected){
                    return $scope.checkoutType[i].name;
                }
            }

            return "货到付款";
        }

        function _updateCheckoutHintMessage(){
            $scope.checkoutHintMessage = $scope.cartReadyToShip ? _getCheckoutTypeDisplayMessage() : "差 " + ShoppingCart.cartNotReadyLeftPrice() + " 元起送";
        }

        function updateShoppingCart() {
            $timeout(function () {
                $scope.shoppingCartItems = ShoppingCart.getAllItems();
                $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();
                _updateCheckoutHintMessage();
            });

        }

        AddressService.onAddressChangeEventSwitchDefault($scope, function (message) {
            updateDefaultOrderAddress(message.item);
        });

        AddressService.onAddressChangeEventAddNew($scope, function (message) {
            updateDefaultOrderAddress(message.item);
        });

        OrderService.onOrderChangeEventSuccess($scope, function () {
            updateShoppingCart();
        });

        $scope.$on("$ionicView.afterEnter", function () {

            // force update shop
            $scope.shop = ShopService.getDefaultShop() || {};
            updateShoppingCart();
            checkOrders();
        });
    });

