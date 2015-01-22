angular.module('miaomiao.shop').controller('ProductCtrl', function ($scope, $rootScope, $window, $ionicLoading, $ionicPopup, $ionicModal,
                                                                    $ionicScrollDelegate, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart, OrderService) {

    // get shop info from local storage cause in locate page we have got one
    $scope.shop = localStorageService.get('MMMETA_shop');
    $scope.info = {};
    $scope.currentDisplayCategory = {};
    $scope.currentDisplayItems = [];
    $scope.categoryls = [];

    function initShopData(){

        $scope.LoadingMessage = '正在为您加载商品 ...';
        $ionicLoading.show({
            templateUrl: '/views/sg/templates/loadingIndicator.html',
            scope: $scope,
            noBackdrop: true
        });

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
                    var item = $scope.categoryls[idx].itemls[item_idx];
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
    }

    $timeout(function () {
        initShopData();
    });

    $scope.selectCategory = function (category) {

        for (var idx = 0; idx < $scope.categoryls.length; idx++) {
            $scope.categoryls[idx].selected = 0;
        }
        category.selected = 1;

        $scope.currentDisplayCategory = category;
        $scope.currentDisplayItems = category.itemls;

        $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();

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

                var item = dataDetail.items[item_idx];
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


    function updateShoppingCart() {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();
        $scope.cartReadyToShip = ShoppingCart.cartReadyToShip();
        $scope.checkoutHintMessage = $scope.cartReadyToShip ? "去结算" : "差 " + ShoppingCart.cartNotReadyLeftPrice() + " 元起送";
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
        item.count = item.count <= 0 ? 0 : item.count;

        ShoppingCart.removeItemFromCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

        $scope.currentDisplayCategory.totalCnt -= 1;
        $scope.currentDisplayCategory.totalCnt = $scope.currentDisplayCategory.totalCnt >= 0 ? $scope.currentDisplayCategory.totalCnt : 0;

    }


    $scope.checkout = function () {

        localStorageService.set('MMMETA_shop', $scope.shop);

        if (!$scope.cartReadyToShip)return;

        $state.go('checkout', null, { reload: true });

    }

    $scope.goToSearch = function () {
        $state.go('search', null, { reload: true });
    }

    $scope.showShoppingCart = function () {
        $scope.info.showCart = !$scope.info.showCart;
    }

    $ionicModal.fromTemplateUrl('/views/sg/templates/switchShop.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.switchShop = function () {
        $scope.modal.show();
    }

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        console.log('dddddebug');

        var shop = localStorageService.get('MMMETA_shop');
        if(shop.id != $scope.shop.id){

            $scope.shop = shop;

            // clear all data if switch shop
            ShoppingCart.clearAll();
            updateShoppingCart();

            $timeout(function () {
                initShopData();
            });
        }
    });

    function fullyUpdateForProductList() {

        if (!$scope.categoryls)return;

        for (var idx = 0; idx < $scope.categoryls.length; idx++) {
            $scope.categoryls[idx].totalCnt = ShoppingCart.getCountForCategroy($scope.categoryls[idx].category_id);

            for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                var itm = $scope.categoryls[idx].itemls[item_idx];
                itm.count = ShoppingCart.getCountForItem(itm);
            }
        }
        updateShoppingCart();
    }

    function partUpdateForProductList(item) {

        if (!$scope.categoryls)return;
        // handle item change event

        for (var idx = 0; idx < $scope.categoryls.length; idx++) {

            if ($scope.categoryls[idx].category_id == item.category_id) {

                $scope.categoryls[idx].totalCnt = ShoppingCart.getCountForCategroy($scope.categoryls[idx].category_id);

                for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                    var itm = $scope.categoryls[idx].itemls[item_idx];
                    if (itm.id == item.id) {
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
        if (item) {
            partUpdateForProductList(item);
        } else {
            fullyUpdateForProductList();
        }
    });

    // when back from checkout or other state, just refresh the numbers
    $scope.$on("$ionicView.enter", function () {

        updateShoppingCart();
        if ($scope.categoryls) {
        }
        fullyUpdateForProductList();

    });

});

