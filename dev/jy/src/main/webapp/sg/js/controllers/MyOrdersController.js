angular.module('miaomiao.shop')
    .controller('MyOrdersCtrl',function ($scope, $ionicLoading, $http, $state, localStorageService,$sessionStorage) {

        $scope.addressls = $sessionStorage.orderAddresses;
        $scope.orders = $sessionStorage.orderOrders;

        for(var i=0;i< $scope.orders.length;i++){
            var order = $scope.orders[i];

            order.items = JSON.parse(order.snapshot);

        }

        $scope.goToAddressList = function(){
            $state.go('userAddressList', null, { reload: true });
        }

        $scope.backToHome = function(){
            $state.go('productList');
        }

    });

