;angular.module('miaomiao.shop').controller('GoToShopCtrl', function ($scope, $stateParams, $rootScope, $window, $ionicLoading, $ionicPopup, $ionicModal,
                                                                    $ionicScrollDelegate, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart, OrderService,ShopService) {

    // get shop info from local storage cause in locate page we have got one

    $scope.LoadingMessage = '正在加载店铺信息 ...';
    $ionicLoading.show({
        templateUrl: '/views/sg/templates/loadingIndicator.html',
        scope: $scope,
        noBackdrop: true
    });

    // get shop info
    httpClient.getShopInfo($stateParams.shop_id, function (data, status) {

        $ionicLoading.hide();

        var code = data.code, dataDetail = data.data;
        if (!code == 0) {
            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            return;
        }

        $scope.shop = dataDetail.shop;

        ShopService.setDefaultShop(dataDetail.shop);

        $state.go('productList', null, { reload: true });

    },function(data, status){
        $ionicPopup.alert({
            title: '加载店铺信息失败，请刷新',
            template: ''
        });
        return;
    });

});

