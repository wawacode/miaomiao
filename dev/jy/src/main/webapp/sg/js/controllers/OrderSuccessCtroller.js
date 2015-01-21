angular.module('miaomiao.shop')
    .controller('OrderSuccessCtrl', function ($scope, $ionicPopup, $ionicLoading, $http, $state, $timeout, httpClient, localStorageService, $sessionStorage) {

        $scope.shop = localStorageService.get('MMMETA_shop');

        httpClient.getMyOrders($scope.shop.id ,function(data, status){

            var code = data.code, dataDetail = data.data;
            if (code == 500) {
                $ionicPopup.alert({
                    title: '加载数据失败:' + data.msg,
                    template: ''
                });
                return;
            }

            $scope.shop = dataDetail.shop;
            $scope.addressls = dataDetail.addressls;
            $scope.orders = dataDetail.orders;

            $sessionStorage.orderAddresses = $scope.addressls;
            $sessionStorage.orderOrders = $scope.orders;

            $state.go('myOrders');


        },function(data, status){

            $ionicPopup.alert({
                title: '加载数据失败,请刷新',
                template: ''
            });
        })

    });

