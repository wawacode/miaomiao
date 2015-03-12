;angular.module('miaomiao.shop').controller('SearchCtrl', function ($scope, $rootScope, $ionicLoading,$ionicScrollDelegate, $ionicPopup, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart,ShopService,MMUtils) {



    $scope.shop = ShopService.getDefaultShop() || {};

    $scope.info = {};

    $scope.performSearch = function (key,$event) {

        $event.target.blur();

        var KEY = key || $scope.info.key;

        MMUtils.showLoadingIndicator('正在搜索...',$scope);

        $scope.info.showSearchSuggestion = false;
        $scope.info.showSearchResult = true;

        httpClient.getSearchResults($scope.shop.id, KEY, function (data, status) {

            /*
             * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
             * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

            $ionicLoading.hide();

            var code = data.code, dataDetail = data.data;
            if (!code == 0 || dataDetail.length == 0) {
                $scope.searchResultsItems = [];
                $scope.info.hasNoResults = true;
                return;
            }

            $scope.info.hasNoResults = false;
            for (var item_idx = 0; item_idx < dataDetail.length; item_idx++) {

                var item =  dataDetail[item_idx];
                item.count = ShoppingCart.getCountForItem(item);

            }
            $scope.searchResultsItems = dataDetail;

            $ionicScrollDelegate.$getByHandle('searchResultScroll').scrollTop();

        }, function (data, status) {
            $ionicLoading.hide();
            $scope.info.hasNoResults = true;
        });
    };


    $scope.getSearchSuggestions = function(){

        httpClient.getSearchSuggestion($scope.shop.id, $scope.info.key, function (data, status) {

            /*
             * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
             * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

            var code = data.code, dataDetail = data.data;
            $timeout(function(){
                $scope.info.search_suggestions = dataDetail;
            })

        }, function (data, status) {
        });

    };

    $scope.goToSearchItem = function(item,$event){

        $scope.info.showSearchSuggestion = false;
        $scope.info.showSearchResult = true;

        $event.stopPropagation();

        $scope.performSearch(item.key,$event);

    };
    function updateShoppingCart(){

        $timeout(function(){
            $scope.info.shoppingCartItems = ShoppingCart.getAllItems();
            $scope.info.cartReadyToShip = ShoppingCart.cartReadyToShip();
            $scope.info.checkoutHintMessage = $scope.info.cartReadyToShip? "去结算" : "差 " + ShoppingCart.cartNotReadyLeftPrice() + " 元起送";
        });
    }

    updateShoppingCart();

    $scope.selectItem = function (item) {

        item.count += 1;

        ShoppingCart.addItemToCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

    };

    $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

        item.count -= 1;
        item.count = item.count <= 0 ? 0: item.count;

        ShoppingCart.removeItemFromCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

    };

    $scope.startSearch = function(){
        $scope.info.showSearchSuggestion = true;
        $scope.info.showSearchResult = false;
    };

    $scope.clearSearch = function(){
        $scope.info.key = '';
        $scope.info.showSearchSuggestion = true;
        $scope.info.showSearchResult = false;
    };

    $scope.checkout = function () {

        if (!$scope.info.cartReadyToShip)return;

        $state.go('checkout',null, { reload: true });

    };

    $scope.showShoppingCart = function(){
        $scope.info.showCart = ! $scope.info.showCart;
    };


    // we update item slection in shopping car ,will have to update shop list

    ShoppingCart.onItemChangeEventInShoppingCart($scope, function (message) {

        var item = message.item;
        updateShoppingCart();

        // update items
        for (var item_idx = 0; item_idx < $scope.searchResultsItems.length; item_idx++) {
            var item =  $scope.searchResultsItems[item_idx];
            item.count = ShoppingCart.getCountForItem(item);
        }

    });

    $scope.$on("$ionicView.afterEnter", function () {
        // force update shop
        $scope.shop = ShopService.getDefaultShop() || {};
    });

});

