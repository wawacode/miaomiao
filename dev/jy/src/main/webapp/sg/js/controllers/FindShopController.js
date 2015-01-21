angular.module('miaomiao.shop').
    controller('FindShopCtrl', function ($scope, $http, $state, localStorageService) {

    $scope.shop_data = {};
    $scope.showShopList = false;
    $scope.showShopHistory = false;
    $scope.showShopHot = true;

    $scope.shop_history = localStorageService.get('shop_history') || [];
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

        localStorageService.set('shop_history', $scope.shop_history);

        window.location.href = window.location.origin + "/sg/shop?shop_id=" + shop.id;
    }


    var params = 'from=0&offset=100';
    $http.get('shop/shopList?' + params).
        success(function (data, status, headers, config) {
            $scope.shop_items = data.data;
        }).
        error(function (data, status, headers, config) {

        });
});