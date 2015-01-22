angular.module('miaomiao.shop').
    controller('FindShopCtrl', function ($scope, $http, $state, localStorageService,httpClient,MMUtils,$timeout) {

    $scope.shop_data = {};
    $scope.showShopList = false;
    $scope.showShopHistory = false;
    $scope.showShopHot = true;

    $scope.shop_history = localStorageService.get('MMMETA_shop_history') || [];
    if($scope.shop_history.length){
        $scope.showShopHistory = true;
    }

    $scope.clearSearch = function () {
        $scope.shop_data.searchQuery = '';
        $scope.showShopList = false;
        $scope.showShopHistory = true;
        $scope.showShopHot = true;
    };

    $scope.startSearch = function () {
        $scope.showShopList = true;
        $scope.showShopHistory = false;
        $scope.showShopHot = false;
    };

    $scope.goToShop = function (shop) {

        if(shop.status4V !=undefined && shop.status4V != "营业中"){
            return;
        }

        var shopExist = false;
        for (var i = 0; i < $scope.shop_history.length; i++) {
            if (shop.id == $scope.shop_history[i].id) {
                shopExist = true;
                break;
            }
        }
        if (!shopExist) {
            $scope.shop_history.push(shop);
        }

        localStorageService.set('MMMETA_shop_history', $scope.shop_history);
        localStorageService.set('MMMETA_shop',shop);

        if($scope.modal){
            $scope.modal.hide();
        }else{
            $state.go('productList');
        }
    }

    $timeout(function(){

        httpClient.getShopList(0, 100,function(data,status){
            var code = data.code, dataDetail = data.data;
            if (code == 0 || ! MMUtils.isEmptyObject(dataDetail)) {
                $scope.shop_items = dataDetail.shop;
            }
        },function(data,status){

        });
    });

});