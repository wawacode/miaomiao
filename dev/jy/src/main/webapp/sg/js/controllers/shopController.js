angular.module('miaomiao.shop').controller('ProductCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart,OrderService) {

    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.currentDisplayCategory = {};
    $scope.currentDisplayItems = [];
    $scope.info = {};

    // save shop info for further use
    localStorageService.set('MMMETA_shop', $scope.shop);

    $timeout(function () {
        httpClient.getProductList($scope.shop.id, function (data, status) {
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
            $scope.categoryls = dataDetail.categoryls;

            // extend for use
            /*
             {"category_id":15,"category_sub_id":0,"id":0,
             "itemls":[{"category_id":15,"category_sub_id":0,"count":956,"create_time":1419821656000,"ext":0,"id":28062,"name":"哈哈镜鸭爪买一赠一",
             "pic_url":"http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             "score":99999,"serialNo":"HHJ001","shop_id":1,"status":0}
             * */
            for (var idx = 0; idx < $scope.categoryls.length; idx++) {

                $scope.categoryls[idx].totalCnt = ShoppingCart.getCountForCategroy($scope.categoryls[idx].category_id);
                $scope.categoryls[idx].selected = 0;
                $scope.categoryls[idx].canLoadMore = 1;
                if (idx == 0) {
                    $scope.categoryls[idx].selected = 1;
                }
                for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                    var item =  $scope.categoryls[idx].itemls[item_idx];
                    item.count = ShoppingCart.getCountForItem(item);
                }
            }

            $scope.currentDisplayCategory = $scope.categoryls.length && $scope.categoryls[0];
            $scope.currentDisplayItems = $scope.currentDisplayCategory && $scope.currentDisplayCategory.itemls;

        }, function (data, status) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            return;
        });
    }, 0);

    $scope.selectCategory = function (category) {

        for (var idx = 0; idx < $scope.categoryls.length; idx++) {
            $scope.categoryls[idx].selected = 0;
        }
        category.selected = 1;

        $scope.currentDisplayCategory = category;
        $scope.currentDisplayItems = category.itemls;

    }

    var canLoadMore = true, inLoadingMore = false;

    $scope.moreDataCanBeLoaded = function () {
        return $scope.currentDisplayCategory.canLoadMore;
    }

    $scope.addItems = function () {

        var cateId = $scope.currentDisplayCategory.category_id,
            from = $scope.currentDisplayItems.length,
            offset = 20;

        httpClient.getMoreProductList($scope.shopId, cateId, from, offset, function (data, status) {

            /*
             * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
             * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

            var code = data.code, dataDetail = data.data;
            if (!code == 0 || dataDetail.items.length == 0) {
                $scope.currentDisplayCategory.canLoadMore = false;
                return;
            }

            for (var item_idx = 0; item_idx < dataDetail.items.length; item_idx++) {

                var item =  dataDetail.items[item_idx];
                item.count = ShoppingCart.getCountForItem(item);

            }
            $scope.currentDisplayItems = $scope.currentDisplayItems.concat(dataDetail.items);
            $scope.currentDisplayCategory.totalCnt = ShoppingCart.getCountForCategroy($scope.currentDisplayCategory.category_id);

            $scope.$broadcast('scroll.infiniteScrollComplete');

        }, function (data, status) {

            $scope.currentDisplayCategory.canLoadMore = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    }


    function updateShoppingCart(){

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();

    }

    $scope.selectItem = function (item) {

        item.count += 1;
        $scope.currentDisplayCategory.totalCnt += 1;

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

        $scope.currentDisplayCategory.totalCnt -= 1;
        $scope.currentDisplayCategory.totalCnt = $scope.currentDisplayCategory.totalCnt >= 0 ? $scope.currentDisplayCategory.totalCnt : 0;

    }


    $scope.checkout = function () {

        localStorageService.set('MMMETA_shop', $scope.shop);

        if(!$scope.cartReadyToShip)return;

        $state.go('checkout',null, { reload: true });

    }

    $scope.goToSearch = function(){
        $state.go('search',null, { reload: true });
    }

    $scope.showShoppingCart = function(){
        $scope.info.showCart = ! $scope.info.showCart;
    }


    function fullyUpdateForProductList(){
        for (var idx = 0; idx < $scope.categoryls.length; idx++) {
            $scope.categoryls[idx].totalCnt = ShoppingCart.getCountForCategroy($scope.categoryls[idx].category_id);

            for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                var itm =  $scope.categoryls[idx].itemls[item_idx];
                itm.count = ShoppingCart.getCountForItem(itm);
            }
        }
        updateShoppingCart();
    }

    function partUpdateForProductList(item){

        // handle item change event
        for (var idx = 0; idx < $scope.categoryls.length; idx++) {

            if($scope.categoryls[idx].category_id == item.category_id){

                $scope.categoryls[idx].totalCnt = ShoppingCart.getCountForCategroy($scope.categoryls[idx].category_id);

                for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                    var itm =  $scope.categoryls[idx].itemls[item_idx];
                    if(itm.id == item.id){
                        itm.count = ShoppingCart.getCountForItem(itm);
                    }
                }
                break;
            }
        }

        updateShoppingCart();
    }


    // we update item slection in shopping car ,will have to update shop list

    ShoppingCart.onItemChangeEventInShoppingCart($scope, function (message) {

        var item = message.item;
        if(item){
            partUpdateForProductList(item);
        }else{
            fullyUpdateForProductList();
        }
    });

    $scope.$on( "$ionicView.enter",function(){

        updateShoppingCart();
        fullyUpdateForProductList();

    });

});

