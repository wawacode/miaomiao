angular.module('miaomiao.shop').controller('ProductCtrl', function ($scope, $ionicLoading, $ionicPopup, $http, $state, $timeout,localStorageService, httpClient) {

        $ionicLoading.show({
            template: 'Loading...'
        });

        $scope.currentDisplayCategory = {};
        $scope.currentDisplayItems = [];

        $scope.shoppingCartTotalCount = 0;
        $scope.shoppingCartTotalPrice = 0;
        $scope.shoppingCartItems = $scope.shoppingCartItems || [];

        $timeout(function(){
            httpClient.getProductList($scope.shopId, function (data, status) {
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
                    $scope.categoryls[idx].totalCnt = 0;
                    $scope.categoryls[idx].selected = 0;
                    $scope.categoryls[idx].canLoadMore = 1;
                    if (idx == 0) {
                        $scope.categoryls[idx].selected = 1;
                    }
                    for (var item_idx = 0; item_idx < $scope.categoryls[idx].itemls.length; item_idx++) {
                        $scope.categoryls[idx].itemls[item_idx].selectedCnt = 0;
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
        },0);

        $scope.selectCategory = function(category){

            for (var idx = 0; idx < $scope.categoryls.length; idx++) {
                $scope.categoryls[idx].selected = 0;
            }
            category.selected = 1;

            $scope.currentDisplayCategory = category;
            $scope.currentDisplayItems = category.itemls;

        }

        var canLoadMore = true, inLoadingMore = false;

        $scope.moreDataCanBeLoaded = function(){
            return $scope.currentDisplayCategory.canLoadMore;
        }

        $scope.addItems = function () {

            var cateId =  $scope.currentDisplayCategory.category_id,
                from  = $scope.currentDisplayItems.length,
                offset = 20;

            httpClient.getMoreProductList($scope.shopId, cateId, from, offset,function(data, status){

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
                    dataDetail.items[item_idx].selectedCnt = 0;
                }
                $scope.currentDisplayItems =  $scope.currentDisplayItems.concat(dataDetail.items);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            },function(data, status){

                $scope.currentDisplayCategory.canLoadMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        $scope.shoppingCartItems = [];

        function updateShoppingCart(){

            var totalCnt = 0,totalPrice = 0.0;
            for (var item_idx = 0; item_idx < $scope.shoppingCartItems.length; item_idx++) {
                totalCnt += parseInt($scope.shoppingCartItems[item_idx].selectedCnt || 0);
                totalPrice += parseFloat($scope.shoppingCartItems[item_idx].price || 0.0) * parseInt($scope.shoppingCartItems[item_idx].selectedCnt || 0);
            }

            $scope.shoppingCartTotalCount = totalCnt;
            $scope.shoppingCartTotalPrice = totalPrice/100.0;

        }

        $scope.cartReadyToShip = function(){
            updateShoppingCart();
            return $scope.shoppingCartTotalPrice >= 20.0;
        }

        $scope.selectItem = function(item){

            item.selectedCnt += 1;
            $scope.currentDisplayCategory.totalCnt += 1 ;

            var index = $scope.shoppingCartItems.indexOf(item);
            if (index == -1) {
                $scope.shoppingCartItems.push(item);
            }
        }


        $scope.removeItem = function(item, removeUIElementWhenEmtpy){

            item.selectedCnt -= 1;
            if(item.selectedCnt <= 0){
                item.selectedCnt = 0;
                var index = $scope.shoppingCartItems.indexOf(item);
                if (index > -1) {
                    $scope.shoppingCartItems.splice(index, 1);
                }
            }

            $scope.currentDisplayCategory.totalCnt -= 1 ;
            $scope.currentDisplayCategory.totalCnt = $scope.currentDisplayCategory.totalCnt >= 0 ?$scope.currentDisplayCategory.totalCnt : 0;

        }

        $scope.checkout = function(){

            localStorageService.set('shoppingCart',$scope.shoppingCartItems);
            localStorageService.set('shop',$scope.shop);

            $state.go('checkout');

        }

    });

