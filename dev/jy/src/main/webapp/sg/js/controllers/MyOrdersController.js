angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService,$sessionStorage,httpClient,AddressService,OrderService) {

        $scope.goToAddressList = function(){
            $state.go('userAddressList', null, { reload: true });
        }

        $scope.backToHome = function(){
            $state.go('productList');
        }

        function transformOrderData(orders){
            if(!orders) return;
            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                try{
                    order.items = JSON.parse(order.snapshot);
                }catch (e){

                }
            }
        }

        $scope.shop = localStorageService.get('MMMETA_shop');

        $scope.info = {};
        $scope.info.hasOrder = true;
        $scope.info.hasAddress = true;

        $scope.addressls = $sessionStorage.MMMETA_OrderAddresses || [];
        $scope.orders = $sessionStorage.MMMETA_OrderOrders || [];
        transformOrderData($scope.orders);

        function reloadInfo(addr){

            if(addr){

                $scope.addressls = $scope.addressls || [];
                $scope.addressls[0] = addr;
                $scope.info.address = $scope.addressls[0];

            }else{

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

        }

        OrderService.orderChangeEventSuccess();

        AddressService.onAddressChangeEventSwitchDefault($scope,function(message){
            reloadInfo(message.item);
        });

        AddressService.onAddressChangeEventAddNew($scope,function(message){
            reloadInfo(message.item);
        });

        $scope.$on("$ionicView.enter", function () {
            reloadInfo();
        });

        $scope.$on('$ionicView.beforeLeave', function(){
            $ionicLoading.hide();
        });
    });

