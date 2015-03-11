;angular.module('miaomiao.shop').controller('ProductCtrl', function ($scope, $rootScope, $window, $ionicLoading, $ionicPopup, $ionicModal,
                                                                    $ionicScrollDelegate, $http, $state, $timeout, localStorageService, httpClient, ShoppingCart, OrderService,ShopService,MMUtils) {

    // get shop info from local storage cause in locate page we have got one
    $scope.shop = ShopService.getDefaultShop() || {};

    if(!$scope.shop){

        MMUtils.showAlert('加载店铺失败,请重新选择店铺');
        $state.go('findshop');
        return;
    }

    $scope.info = {};
    $scope.currentDisplayCategory = {};
    $scope.currentDisplayItems = [];
    $scope.categoryls = [];

    function initShopData(){

        MMUtils.showLoadingIndicator('正在加载商品...',$scope);

        httpClient.getProductList($scope.shop.id, function (data, status) {
            $ionicLoading.hide();

            var code = data.code, dataDetail = data.data;
            if (!code == 0) {
                MMUtils.showAlert('加载数据失败');
                return;
            }

            // force update shop info
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

                if($scope.categoryls[idx].name.length == 2){
                    $scope.categoryls[idx].name = $scope.categoryls[idx].name.charAt(0)
                            + "  " + $scope.categoryls[idx].name.charAt(1);
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
            MMUtils.showAlert('加载数据失败');
            return;
        });
    }

    $timeout(function () {
        initShopData();
    });


    var canLoadMore = true, inLoadingMore = false;

    $scope.selectCategory = function (index) {

        // if in loading more, can't select
        if(inLoadingMore)return;

        var category = $scope.categoryls[index];
        for (var idx = 0; idx < $scope.categoryls.length; idx++) {
            $scope.categoryls[idx].selected = 0;
        }
        category.selected = 1;

        $scope.currentDisplayCategory = category;
        $scope.currentDisplayItems = category.itemls;

        $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();

    };

    $scope.moreDataCanBeLoaded = function () {
        return $scope.currentDisplayCategory.canLoadMore;
    };

    $scope.addItems = function () {

        var cateId = $scope.currentDisplayCategory.category_id,
            from = $scope.currentDisplayItems.length,
            offset = 20;

        inLoadingMore = true;
        httpClient.getMoreProductList($scope.shop.id, cateId, from, offset, function (data, status) {

            /*
             * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
             * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
             * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

            var code = data.code, dataDetail = data.data;
            if (!code == 0 || dataDetail.items.length == 0) {

                $scope.currentDisplayCategory.canLoadMore = false;
                inLoadingMore = false;
                return;

            }

            for (var item_idx = 0; item_idx < dataDetail.items.length; item_idx++) {

                var item = dataDetail.items[item_idx];
                item.count = ShoppingCart.getCountForItem(item);

            }
            $scope.currentDisplayItems = $scope.currentDisplayItems.concat(dataDetail.items);

            // update category data
            $scope.currentDisplayCategory.itemls = $scope.currentDisplayItems;
            $scope.currentDisplayCategory.totalCnt = ShoppingCart.getCountForCategroy($scope.currentDisplayCategory.category_id);

            inLoadingMore = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        }, function (data, status) {

            inLoadingMore = false;
            $scope.currentDisplayCategory.canLoadMore = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


    function updateShoppingCart() {

        $timeout(function(){

            $scope.info.shoppingCartItems = ShoppingCart.getAllItems();
            $scope.info.cartReadyToShip = ShoppingCart.cartReadyToShip();
            $scope.info.checkoutHintMessage = $scope.info.cartReadyToShip ? "去结算" : "差 " + ShoppingCart.cartNotReadyLeftPrice() + " 元起送";

        });
    }

    $scope.selectItem = function (item) {

        item.count += 1;
        $scope.currentDisplayCategory.totalCnt += 1;

        ShoppingCart.addItemToCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

    };

    $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

        item.count -= 1;
        item.count = item.count <= 0 ? 0 : item.count;

        ShoppingCart.removeItemFromCart(item);
        updateShoppingCart();

        ShoppingCart.itemChangeEventInProductList(item);

        $scope.currentDisplayCategory.totalCnt -= 1;
        $scope.currentDisplayCategory.totalCnt = $scope.currentDisplayCategory.totalCnt >= 0 ? $scope.currentDisplayCategory.totalCnt : 0;

    };


    $scope.checkout = function () {

        if (!$scope.info.cartReadyToShip)return;

        $state.go('checkout', null, { reload: true });

    };

    $scope.goToSearch = function () {
        $state.go('search', null, { reload: true });
    };

    $scope.showShoppingCart = function () {
        $scope.info.showCart = !$scope.info.showCart;
    };

    $ionicModal.fromTemplateUrl('templates/switchShop.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.switchShop = function () {
        $scope.modal.show();
    };

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {

        var shop = ShopService.getDefaultShop() || {};
        if(shop.id != $scope.shop.id){

            $timeout(function () {
                $scope.shop = shop;
            });

            checkShopStatus();

            // clear all data if switch shop
            ShoppingCart.clearAll();
            updateShoppingCart();

            $timeout(function () {
                initShopData();
            });
        }
    });


    // for image preview
    $ionicModal.fromTemplateUrl('templates/productPreview.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
            $scope.previewModal = modal;
        });

    $scope.openPreviewModal = function() {
        $scope.previewModal.show();
    };

    $scope.closePreviewModal = function() {
        $scope.previewModal.remove();
    };

    $scope.showImage = function(item) {
        $scope.imageSrc = item.pic_url;
        $ionicModal.fromTemplateUrl('templates/productPreview.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.previewModal = modal;
                $scope.openPreviewModal();
        });
    };

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

    function checkShopStatus(){
        // must check shop status

        var shopInfo = ShopService.getDefaultShop() || {};
        $timeout(function () {
            $scope.shop = shopInfo;
        });

        httpClient.getShopInfo(shopInfo.id, function (data, status) {
            var code = data.code, dataDetail = data.data;
            if (dataDetail && dataDetail.shop && dataDetail.shop.status != 0) {

                var alertPopup = $ionicPopup.alert({
                    title: dataDetail.shop.name + '打烊啦，去其他店铺看看？',
                    template: ''
                });
                alertPopup.then(function(res) {
                    // clear current display items so when it come back ,will refresh the view
                    $scope.currentDisplayItems = [];
                    $state.go('findshop' ,null, { reload: true });
                    return;
                });
            }
        },function(data, status){

        });
    }

    // when back from checkout or other state, just refresh the numbers
    $scope.$on("$ionicView.afterEnter", function () {

        checkShopStatus();

        updateShoppingCart();

        fullyUpdateForProductList();

        if(!$scope.currentDisplayItems || !$scope.currentDisplayItems.length){
            $timeout(function () {
                initShopData();
            });
        }
    });

});

