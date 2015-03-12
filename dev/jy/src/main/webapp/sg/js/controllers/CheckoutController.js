;angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $rootScope, $timeout, $ionicLoading, $ionicPopup, $http, $state, localStorageService, httpClient, ShoppingCart, AddressService, OrderService,ShopService, MMUtils) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.shop = ShopService.getDefaultShop() || {};

        $scope.info = {};
        $scope.info.address = {};
        $scope.info.newOrderAddress = '';
        $scope.info.newOrderPhone = '';
        $scope.info.dataReady = false;

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

                    // goto order success
//                    $state.go('orderSuccess');

                    $state.go('myOrders', null, {reload: true});

                }, function (data, status) {
                    $ionicLoading.hide();
                    MMUtils.showAlert('生成订单失败，请重新购买');
                })
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


        function updateShoppingCart() {
            $timeout(function () {
                $scope.shoppingCartItems = ShoppingCart.getAllItems();
                $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();
                $scope.checkoutHintMessage = $scope.cartReadyToShip ? "货到付款" : "差 " + ShoppingCart.cartNotReadyLeftPrice() + " 元起送";
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

