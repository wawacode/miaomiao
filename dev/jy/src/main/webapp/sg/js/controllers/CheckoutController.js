angular.module('miaomiao.shop')
    .controller('CheckoutCtrl', function ($scope, $rootScope, $timeout, $ionicLoading, $ionicPopup, $http, $state, localStorageService, httpClient, ShoppingCart, AddressService, OrderService, MMUtils) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.shop = localStorageService.get('MMMETA_shop');

        $scope.info = {};
        $scope.info.address = {};
        $scope.info.newOrderAddress = '';
        $scope.info.newOrderPhone = '';
        $scope.info.showAddNewAddress = false;

        function checkOrders() {

            $scope.info.remarks = "";
            $scope.LoadingMessage = '正在核对,请稍候...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.getConfirmCartList($scope.shop.id, ShoppingCart.getAllItems(), function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code == 500) {
                    $ionicPopup.alert({
                        title: '加载数据失败:' + data.msg,
                        template: ''
                    });
                    return;
                } else if (code == 100) {
                    $ionicPopup.alert({
                        title: '部分商品不足，请谨慎购买:' + data.msg,
                        template: ''
                    });
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
            });
        }


        $scope.goToAddressList = function () {
            $state.go('addressList', null, { reload: true });
        }

        $scope.goback = function () {
            $state.go('productList', null, { reload: true });
        }

        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

        $scope.selectItem = function (item) {

            item.count += 1;

            ShoppingCart.itemChangeEventInShoppingCart(item);
            updateShoppingCart();
        }

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventInShoppingCart(item);
            updateShoppingCart();
        }

        $scope.confirmCheckout = function () {

            if (!$scope.cartReadyToShip)return;

            if ($scope.addressls && $scope.addressls.length) {
                $scope.info.address = $scope.addressls[0];
            } else {
                $scope.info.address = {'id': '', 'address': $scope.info.newOrderAddress, 'phone': $scope.info.newOrderPhone};

                if (!$scope.info.newOrderAddress || !$scope.info.newOrderPhone || !MMUtils.isValidTelNumber($scope.info.newOrderPhone)) {
                    $ionicPopup.alert({
                        title: '请填写正确的地址电话',
                        template: ''
                    });
                    return;
                }

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = $scope.info.address;
                $scope.info.showAddNewAddress = false;
            }

            $scope.LoadingMessage = '正在生成订单,请稍候...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.getOrderSave($scope.shop.id, $scope.info.address.id, $scope.info.address.address, $scope.info.address.phone,
                $scope.info.remarks || '', $scope.shoppingCartItems, $scope.info.order_id, function (data, status) {

                    $ionicLoading.hide();

                    var code = data.code, dataDetail = data.data;
                    if (code == 500) {
                        $ionicPopup.alert({
                            title: '生成订单失败，请重新购买:' + data.msg,
                            template: ''
                        });
                        return;
                    } else if (code == 100) {
                        $ionicPopup.alert({
                            title: '部分商品不足，请重新购买:' + data.msg,
                            template: ''
                        });
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
                    $ionicPopup.alert({
                        title: '生成订单失败，请重新购买:' + data.msg,
                        template: ''
                    });

                })
        }


        function updateDefaultOrderAddress(addr) {


            if (addr) {

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = addr;
                $scope.info.address = $scope.addressls[0];

            } else {
                // update from server
                $scope.LoadingMessage = '正在更新地址...';
                $ionicLoading.show({
                    templateUrl: '/views/sg/templates/loadingIndicator.html',
                    scope: $scope
                });

                httpClient.getAddressList($scope.shop.id, function (data, status) {

                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        $ionicPopup.alert({
                            title: '加载数据失败:' + data.msg,
                            template: ''
                        });
                        return;
                    }

                    $ionicLoading.hide();

                    $scope.addressls = dataDetail.addressls || [];

                }, function (data, status) {
                    $scope.addressls = [];
                    $ionicPopup.alert({
                        title: '加载数据失败,请重试',
                        template: ''
                    });
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

        $scope.$on("$ionicView.enter", function () {
            updateShoppingCart();
            checkOrders();
        });
    });

