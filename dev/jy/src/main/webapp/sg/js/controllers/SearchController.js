angular.module('miaomiao.shop').controller('SearchCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart) {



    $scope.shop = localStorageService.get('MMMETA_shop') || {};

    $scope.info = {};
    $scope.info.hasNoResults = false;

    $scope.performSearch = function (key) {

        var KEY = key || $scope.info.key;

        $ionicLoading.show({
            template: '正在搜索...'
        });


        httpClient.getSearchResults($scope.shop.id, KEY, function (data, status) {

            /*
             * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
             * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

            $ionicLoading.hide();

            var code = data.code, dataDetail = data.data;
            if (!code == 0 || dataDetail.length == 0) {
                $scope.info.hasNoResults = true;
                return;
            }

            $scope.info.hasNoResults = false;
            for (var item_idx = 0; item_idx < dataDetail.length; item_idx++) {

                var item =  dataDetail[item_idx];
                item.count = ShoppingCart.getCountForItem(item);

            }
            $scope.searchResultsItems = dataDetail;

        }, function (data, status) {
            $ionicLoading.hide();
            $scope.info.hasNoResults = true;
        });
    }


    function updateShoppingCart(){

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

    }

    updateShoppingCart();

    $scope.selectItem = function (item) {

        item.count += 1;

        ShoppingCart.addItemToCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

    }

    $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

        item.count -= 1;
        item.count = item.count <= 0 ? 0: item.count;

        ShoppingCart.removeItemFromCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

    }

    $scope.clearSearch = function(){

    }

    $scope.checkout = function () {

        $state.go('checkout',null, { reload: true });

    }

    $scope.showShoppingCart = function(){
        $scope.info.showCart = ! $scope.info.showCart;
    }


    // we update item slection in shopping car ,will have to update shop list

    ShoppingCart.onItemChangeEventInShoppingCart($scope, function (message) {

        var item = message.item;
        if(item){
//            partUpdateForProductList(item);
        }else{
//            fullyUpdateForProductList();
        }
    });

});

