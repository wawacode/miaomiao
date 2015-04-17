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

        var StatsEnum = $scope.StatsEnum = {
            'toBeConfirmed': 0,
            'inShipping':1,
            'canceledByUser':2,
            'canceledByShop':3,
            'confirmedByUser':4,
            'canceledByCatStaff':5
        };

        function updateOrderStatus(order){
            // two fileds need to set here
            // 1. can use cancel order,2, can push order

            order.canCancelOrder = false;
            order.canRemindShipping = false;
            order.canShowAction = true;

            var creationTime = new Date(order.create_time),
                nowtime = new Date(),
                timeeplise = nowtime.getTime()-creationTime.getTime(); // mini secs

            if(order.order_status == StatsEnum.toBeConfirmed ||
                order.order_status == StatsEnum.inShipping){

                if(timeeplise/1000 >= 20 * 60){ // 20 minutes
                    order.canRemindShipping = true;
                }
            }

            // order create/confired by shop, user can apply for refund after 60 minutes
            if(order.order_status == StatsEnum.toBeConfirmed ||
                order.order_status == StatsEnum.inShipping){
                if(timeeplise/1000 >= 60 * 60){ // 60 minutes
                    order.canCancelOrder = true;
                }
            }

            // canceled by user/shop/catstaff ,user can do nothing
            if(order.order_status == StatsEnum.canceledByShop ||
                order.order_status == StatsEnum.canceledByCatStaff||
                order.order_status == StatsEnum.confirmedByUser ||
                order.order_status == StatsEnum.canceledByUser){
                order.canShowAction = false;
            }
        }

        function transformOrderData(orders) {
            if (!orders) return;
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                try {
                    order.items = JSON.parse(order.snapshot);
                } catch (e) {
                }
                //update order status by
                updateOrderStatus(order);
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

        function updateOrderAction(userOrders, updatingOrder) {
            if (userOrders && userOrders.length) {
                for (var i = 0; i < userOrders.length; i++) {
                    if (userOrders[i].order_id == updatingOrder.order_id) {
                        userOrders[i] = updatingOrder;
                        updateOrderStatus(updatingOrder);
                    }
                }
            }
        }

        $scope.confirmOrder = function (order) {

            MMUtils.showLoadingIndicator('正在确认订单...', $scope);
            httpClient.confirmMyOrders(order.shop_id || $scope.shop.id, order.order_id, 'done', function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('确认订单失败,请重试:' + data.msg);
                    return;
                }
                order.order_status = dataDetail.order.order_status;
                $timeout(function () {
                    updateOrderAction($scope.latestOrder,order);
                    updateOrderAction($scope.historyOrder,order);
                });

            }, function (data, status) {
                MMUtils.showAlert('确认订单失败,请重试');
            });
        };

        $scope.cancelOrder = function (order) {

            if(!order.canCancelOrder)return;

            // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
                title: '取消订单',
                template: '确定要取消订单？微信支付用户可以退款～'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    MMUtils.showLoadingIndicator('正在取消订单...', $scope);
                    httpClient.cancelMyOrders(order.shop_id || $scope.shop.id, order.order_id, 'done', function (data, status) {

                        $ionicLoading.hide();

                        var code = data.code, dataDetail = data.data;
                        if (code != 0) {
                            MMUtils.showAlert('取消订单失败,请重试:' + data.msg);
                            return;
                        }

                        order.order_status = dataDetail.order.order_status;
                        $timeout(function () {
                            updateOrderAction($scope.latestOrder,order);
                            updateOrderAction($scope.historyOrder,order);
                        });

                        MMUtils.showAlert('您已经取消订单，微信支付用户喵喵客服会联系您退款');

                    }, function (data, status) {
                        MMUtils.showAlert('取消订单失败,请重试');
                    });
                }
            });
        };

        $scope.remindShipping = function (order) {

            if(!order.canRemindShipping)return;

            MMUtils.showLoadingIndicator('正在提醒店家发货...', $scope);
            httpClient.remindShippingMyOrders(order.shop_id || $scope.shop.id, order.order_id, 'done', function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('提醒发货失败,请重试:' + data.msg);
                    return;
                }

                MMUtils.showAlert('商家已经收到通知，正在为您发货啦～');

            }, function (data, status) {
                MMUtils.showAlert('提醒发货失败,请重试');
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

