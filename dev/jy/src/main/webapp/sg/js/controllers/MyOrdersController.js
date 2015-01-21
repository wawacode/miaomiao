angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService,$sessionStorage,httpClient,AddressService) {

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

        function reloadInfo(){

            $ionicLoading.show({
                template: '正在加载,请稍候...'
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

//                $sessionStorage.orderAddresses = $scope.addressls;
//                $sessionStorage.orderOrders = $scope.orders;


            },function(data, status){

                $scope.info.hasOrder = false;
                $scope.info.hasAddress = false;

                $ionicLoading.hide();
            });
        }

        reloadInfo();

        AddressService.onAddressChangeEventSwitchDefault($scope,function(){
            reloadInfo();
        });

        AddressService.onAddressChangeEventAddNew($scope,function(){
            reloadInfo();
        });

    });

