;
angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl', function ($scope, $ionicLoading, $ionicPopup, $timeout, $http, $state, $ionicScrollDelegate, localStorageService, $sessionStorage, httpClient, AddressService, OrderService, ShopService, MMUtils) {

        $scope.shop = ShopService.getDefaultShop() || {};

        $scope.goToAddressList = function () {
            $state.go('userAddressList', null, { reload: true });
        };

        $scope.backToHome = function () {
            $state.go('productList');
        };

        function transformOrderData(orders) {
            if (!orders) return;
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                try {
                    order.items = JSON.parse(order.snapshot);
                } catch (e) {

                }
            }
        }

        $scope.info = {};
        $scope.info.hasShop = $scope.shop && $scope.shop.id != null;

        $scope.addr = {};
        $scope.addressls = $sessionStorage.MMMETA_OrderAddresses || [];
        $scope.orders = $sessionStorage.MMMETA_OrderOrders || [];
        transformOrderData($scope.orders);

        function reloadInfo(addr) {

            if (addr) {

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = addr;
                $scope.info.address = $scope.addressls[0];

            } else {

                MMUtils.showLoadingIndicator('正在加载,请稍候...', $scope);

                $scope.info.hasShop = $scope.shop && $scope.shop.id != null;

                httpClient.getMyOrders($scope.shop.id, function (data, status) {

                    $ionicLoading.hide();

                    var code = data.code, dataDetail = data.data;

                    $scope.shop = dataDetail.shop;

                    $scope.addressls = dataDetail.addressls;
                    $scope.info.hasAddress = $scope.addressls.length > 0 ? true : false;

                    $scope.orders = dataDetail.orders;
                    transformOrderData($scope.orders);

                    $scope.info.hasOrder = $scope.orders.length > 0 ? true : false;

                    $timeout(function () {
                        if ($scope.orders.length >= 1) {
                            $scope.latestOrder = $scope.orders.slice(0, 1);
                        }
                        if ($scope.orders.length > 1) {
                            $scope.historyOrder = $scope.orders.slice(1);
                        }

                    });

                    $scope.myCouponsCount = dataDetail.coupon_count;

                    $sessionStorage.orderAddresses = $scope.addressls;
                    $sessionStorage.orderOrders = $scope.orders;

                    $ionicScrollDelegate.resize();

                }, function (data, status) {

                    $scope.info.hasOrder = false;
                    $scope.info.hasAddress = false;
                    $ionicScrollDelegate.resize();

                    $ionicLoading.hide();
                });
            }

        }

        $scope.addNewAddressInOrderPage = function () {

            if (!$scope.addr.address || !$scope.addr.phone || !MMUtils.isValidTelNumber($scope.addr.phone)) {

                MMUtils.showAlert('请填写正确的地址电话');

                return;
            }

            MMUtils.showLoadingIndicator('正在添加新地址...', $scope);

            var shopId = $scope.shop && $scope.shop.id || 1; // make a default one
            httpClient.addAddress(shopId, $scope.addr, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('添加新地址失败:' + data.msg);
                    return;
                }

                $ionicLoading.hide();

                AddressService.addressChangeEventAddNew($scope.addr);

                $ionicScrollDelegate.resize();

                $state.go('myOrders', null, { reload: true });


            }, function (data, status) {

                $ionicLoading.hide();

                MMUtils.showAlert('添加新地址失败,请重试');

                $ionicScrollDelegate.resize();
            })
        };

        $scope.switchToAddressList = function ($event) {

            $event.target.blur();
            $event.stopPropagation();

            $state.go('userAddressList', null, {reload: true});
        };

        $scope.goToShopOrFindShop = function () {

            var lastShop = ShopService.getDefaultShop();
            if (lastShop && lastShop.id) {
                $state.go('productList', null, {reload: true});
            } else {
                $state.go('findshop', null, {reload: true});
            }
        };

        $scope.confirmOrder = function (order) {

            MMUtils.showLoadingIndicator('正在确认订单...', $scope);
            httpClient.confirmMyOrders(order.shop_id || $scope.shop.id, order.order_id, 'done', function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('确认订单失败,请重试:' + data.msg);
                    return;
                }

                function confirmOrders(userOrders) {
                    if (userOrders && userOrders.length) {
                        for (var i = 0; i < userOrders.length; i++) {
                            if (userOrders[i].order_id == order.order_id) {
                                order.confirm = true;
                                userOrders[i] = order;
                            }
                        }
                    }
                }

                $timeout(function () {
                    confirmOrders($scope.latestOrder);
                    confirmOrders($scope.historyOrder);
                });

            }, function (data, status) {
                MMUtils.showAlert('确认订单失败,请重试');
            });
        };

        $scope.goToCouponList = function(){

        };

        OrderService.orderChangeEventSuccess();

        AddressService.onAddressChangeEventSwitchDefault($scope, function (message) {
            reloadInfo(message.item);
        });

        AddressService.onAddressChangeEventAddNew($scope, function (message) {
            reloadInfo(message.item);
        });

        $scope.$on("$ionicView.enter", function () {
            $scope.shop = ShopService.getDefaultShop() || {};
            reloadInfo();
        });
    });

