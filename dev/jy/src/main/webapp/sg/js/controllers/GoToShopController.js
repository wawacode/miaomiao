;angular.module('miaomiao.shop').controller('GoToShopCtrl', function ($scope, $stateParams, $rootScope, $window, $ionicLoading, $ionicPopup, $ionicModal,
                                                                    $ionicScrollDelegate, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart, OrderService,ShopService,MMUtils) {

    // get shop info from local storage cause in locate page we have got one

    MMUtils.showLoadingIndicator('正在加载店铺信息',$scope);

    // get shop info
    httpClient.getShopInfo($stateParams.shop_id, function (data, status) {

        $ionicLoading.hide();

        var code = data.code, dataDetail = data.data;
        if (!code == 0) {
            MMUtils.showAlert('加载数据失败');
            return;
        }

        $scope.shop = dataDetail.shop;

        ShopService.setDefaultShop(dataDetail.shop);

        $state.go('productList', null, { reload: true });

    },function(data, status){
        MMUtils.showAlert('加载店铺信息失败，请刷新');
        return;
    });

});

