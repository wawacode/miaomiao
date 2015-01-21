angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService,$sessionStorage,httpClient,AddressService,OrderService) {

        $scope.goToAddressList = function(){
            $state.go('userAddressList', null, { reload: true });
        }

        $scope.backToHome = function(){
            $state.go('productList');
        }

        function transformOrderData(orders){

            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                order.items = JSON.parse(order.snapshot);
            }
        }

        $scope.info = {};
        $scope.info.hasOrder = true;
        $scope.info.hasAddress = true;

        $scope.addressls = $sessionStorage.MMMETA_OrderAddresses;
        $scope.orders = $sessionStorage.MMMETA_OrderOrders;
        transformOrderData($scope.orders);

        function reloadInfo(){

            $scope.LoadingMessage = '正在加载,请稍候...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.getMyOrders($scope.shop.id ,function(data, status){

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;

                $scope.shop = dataDetail.shop;

                $scope.addressls = dataDetail.addressls;
                if($scope.addressls.length)$scope.info.hasAddress = true;

                $scope.orders = dataDetail.orders;
                transformOrderData($scope.orders);

                if($scope.orders.length)$scope.info.hasOrder = true;

                $sessionStorage.orderAddresses = $scope.addressls;
                $sessionStorage.orderOrders = $scope.orders;

            },function(data, status){

                $scope.info.hasOrder = false;
                $scope.info.hasAddress = false;

                $ionicLoading.hide();
            });
        }

//        reloadInfo();

        OrderService.orderChangeEventSuccess();

        AddressService.onAddressChangeEventSwitchDefault($scope,function(){
            reloadInfo();
        });

        AddressService.onAddressChangeEventAddNew($scope,function(){
            reloadInfo();
        });

    });

