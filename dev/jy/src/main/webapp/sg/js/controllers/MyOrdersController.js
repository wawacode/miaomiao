angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService,$sessionStorage,httpClient,AddressService) {

        function transformOrderData(){

            for(var i=0;i< $scope.orders.length;i++){
                var order = $scope.orders[i];

                order.items = JSON.parse(order.snapshot);

            }
        }

        $scope.addressls = $sessionStorage.orderAddresses || [];
        $scope.orders = $sessionStorage.orderOrders || [];

        transformOrderData();

        $scope.goToAddressList = function(){
            $state.go('userAddressList', null, { reload: true });
        }

        $scope.backToHome = function(){
            $state.go('productList');
        }

        function reloadInfo(){

            $ionicLoading.show({
                template: '正在加载,请稍候...'
            });

            httpClient.getMyOrders($scope.shop.id ,function(data, status){

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;

                $scope.shop = dataDetail.shop;

                $scope.addressls = dataDetail.addressls;
                $scope.orders = dataDetail.orders;
                transformOrderData();

                $sessionStorage.orderAddresses = $scope.addressls;
                $sessionStorage.orderOrders = $scope.orders;


            },function(data, status){
                $ionicLoading.hide();
            });
        }


        AddressService.onAddressChangeEventSwitchDefault($scope,function(){
            reloadInfo();
        });

        AddressService.onAddressChangeEventAddNew($scope,function(){
            reloadInfo();
        });

    });

