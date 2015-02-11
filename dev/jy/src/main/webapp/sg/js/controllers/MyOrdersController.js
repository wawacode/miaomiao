angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading,$ionicPopup, $http, $state,$ionicScrollDelegate,localStorageService,$sessionStorage,httpClient,AddressService,OrderService,MMUtils) {

        $scope.shop = localStorageService.get('MMMETA_shop') || {};

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
        $scope.addr = {};
        $scope.addNewAddressInOrderPage = function(){

            if(!$scope.addr.address || !$scope.addr.phone || !MMUtils.isValidTelNumber($scope.addr.phone)){

                $ionicPopup.alert({
                    title: '请填写正确的地址电话',
                    template: ''
                });

                return;
            }

            $scope.LoadingMessage = '正在添加新地址...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            var shopId = $scope.shop && $scope.shop.id || 1 ; // make a default one
            httpClient.addAddress(shopId, $scope.addr, function(data, status){

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '添加新地址失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                $ionicLoading.hide();

                AddressService.addressChangeEventAddNew($scope.addr);

                $ionicScrollDelegate.resize();

                $state.go('myOrders',null, { reload: true });


            },function(data, status){

                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: '添加新地址失败,重试',
                    template: ''
                });

                $ionicScrollDelegate.resize();
            })
        }

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
                    $scope.info.hasAddress = $scope.addressls.length > 0? true: false;

                    $scope.orders = dataDetail.orders;
                    transformOrderData($scope.orders);

                    $scope.info.hasOrder = $scope.orders.length > 0? true : false;

                    $sessionStorage.orderAddresses = $scope.addressls;
                    $sessionStorage.orderOrders = $scope.orders;

                    $ionicScrollDelegate.resize();

                },function(data, status){

                    $scope.info.hasOrder = false;
                    $scope.info.hasAddress = false;
                    $ionicScrollDelegate.resize();

                    $ionicLoading.hide();
                });
            }

        }

        $scope.goToShopOrFindShop = function(){

            var lastShop = localStorageService.get('MMMETA_shop');
            if (lastShop && lastShop.id) {
                $state.go('productList',null,{reload:true});
            } else {
                $state.go('findshop',null,{reload:true});
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
            $scope.shop = localStorageService.get('MMMETA_shop') || {};
            reloadInfo();
        });
    });

