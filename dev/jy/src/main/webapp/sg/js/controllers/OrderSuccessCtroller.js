;angular.module('miaomiao.shop')
    .controller('OrderSuccessCtrl', function ($scope, $rootScope, $ionicPopup, $ionicLoading, $http, $state, $timeout, httpClient, localStorageService, $sessionStorage,ShoppingCart,OrderService,ShopService,MMUtils) {

        // go to orders page
        $scope.shop = ShopService.getDefaultShop() || {};
        $scope.message = "订单成功，将为您跳转...";

        OrderService.onOrderChangeEventSuccess($scope,function(){
            $scope.message = "订单提交成功";
        });

        // when back from checkout or other state, just refresh the numbers
        $scope.$on("$ionicView.enter", function () {

            httpClient.getMyOrders($scope.shop.id ,function(data, status){

                var code = data.code, dataDetail = data.data;
                if (code == 500) {
                    MMUtils.showAlert('加载数据失败:' + data.msg);
                    return;
                }

                $scope.shop = dataDetail.shop;
                $scope.addressls = dataDetail.addressls;
                $scope.orders = dataDetail.orders;

                $sessionStorage.MMMETA_OrderAddresses = $scope.addressls;
                $sessionStorage.MMMETA_OrderOrders = $scope.orders;

                $state.go('myOrders',null,{reload:true});


            },function(data, status){
                MMUtils.showAlert('加载数据失败,请刷新');
            });

        });

    });

