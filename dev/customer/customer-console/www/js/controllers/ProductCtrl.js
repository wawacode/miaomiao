angular.module('miaomiao.console.controllers')

    .controller('ProductCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate, localStorageService, httpClient,MMShopService) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.info = {};
        $scope.pageName = '商品';

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};


        function initData(){

            $scope.LoadingMessage = '正在加载,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.getProductList($scope.info.shop.id, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败',
                        template: ''
                    });
                    return;
                }

                $scope.info.categoryls = dataDetail.categoryls;

                // extend for use
                /*
                 {"category_id":15,"category_sub_id":0,"id":0,
                 "itemls":[{"category_id":15,"category_sub_id":0,"count":956,"create_time":1419821656000,"ext":0,"id":28062,"name":"哈哈镜鸭爪买一赠一",
                 "pic_url":"http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 "score":99999,"serialNo":"HHJ001","shop_id":1,"status":0}
                 * */
                if (!$scope.info.categoryls || !$scope.info.categoryls.length)return;

                for (var idx = 0; idx < $scope.info.categoryls.length; idx++) {

                    $scope.info.categoryls[idx].selected = 0;
                    $scope.info.categoryls[idx].scrollIndex = $scope.info.categoryls[idx].itemls.length;
                    $scope.info.categoryls[idx].canLoadMore = 1;
                    if (idx == 0) {
                        $scope.info.categoryls[idx].selected = 1;
                        $scope.info.categoryls[idx].select_a = 'shop-categray-selected';
                        $scope.info.categoryls[idx].select_b = 'shop-categray-item-decorate-show';
                        $scope.info.categoryls[idx].select_c = 'shop-categray-item-selected';
                    }
                }

                $scope.info.currentDisplayCategory = $scope.info.categoryls[0];
                $scope.info.currentDisplayItems = $scope.info.currentDisplayCategory.itemls;

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                return;
            });
        }

        initData();

        $scope.refreshAll = function(){
            initData();
        }

        $scope.selectedIndex = 0;
        $scope.selectCategory = function ($index) {

            // if in loading more, can't select
            if (inLoadingMore)return;

            $scope.info.currentDisplayCategory = $scope.info.categoryls[$index];

            if($scope.selectedIndex != $index){

                var current = $scope.info.currentDisplayCategory;
                current.select_a = 'shop-categray-selected';
                current.select_b = 'shop-categray-item-decorate-show';
                current.select_c = 'shop-categray-item-selected';

                var last = $scope.info.categoryls[$scope.selectedIndex];
                last.select_a = '';
                last.select_b = '';
                last.select_c = '';

                $scope.selectedIndex = $index;
            }

            $scope.info.currentDisplayItems = $scope.info.categoryls[$index].itemls;

            $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();
        }

        $scope.moreDataCanBeLoaded = function () {
            return $scope.info.currentDisplayCategory && $scope.info.currentDisplayCategory.canLoadMore;
        }

        var inLoadingMore = false;

        $scope.addItems = function () {

            var cateId = $scope.info.currentDisplayCategory.category_id,
                from = $scope.info.currentDisplayCategory.scrollIndex,  //$scope.info.currentDisplayItems.length,
                offset = 20;

            inLoadingMore = true;
            httpClient.getMoreProductList($scope.info.shop.id, cateId, from, offset, function (data, status) {

                /*
                 * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
                 * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

                var code = data.code, dataDetail = data.data;
                if (!code == 0 || dataDetail.itemls.length == 0) {
                    inLoadingMore = false;
                    $scope.info.currentDisplayCategory.canLoadMore = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;

                }

                inLoadingMore = false;

                $scope.info.currentDisplayItems = $scope.info.currentDisplayItems.concat(dataDetail.itemls);

                $scope.info.currentDisplayCategory.scrollIndex += dataDetail.itemls.length;
                $scope.info.currentDisplayCategory.itemls = $scope.info.currentDisplayItems;

                $scope.info.currentDisplayCategory.totalCnt = 0;

                $scope.$broadcast('scroll.infiniteScrollComplete');

            }, function (data, status) {
                inLoadingMore = false;
                $scope.info.currentDisplayCategory.canLoadMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        $scope.$on('modal.hidden', function () {

        });

        $scope.deleteItemFromCurrentCategory = function (item) {

            var index = $scope.info.currentDisplayItems.indexOf(item);
            if (index > -1) {
                $scope.info.currentDisplayItems.splice(index, 1);
            }
        }

        $scope.stickItemFromCurrentCategory = function (item) {

            var index = $scope.info.currentDisplayItems.indexOf(item);
            if (index != -1) {
                $timeout(function () {
                    $scope.info.currentDisplayItems.splice(index, 1);
                    $scope.info.currentDisplayItems.unshift(item);
                })
            }

        }

        $scope.updateItemFromCurrentCategory = function (item) {

            var index = $scope.info.currentDisplayItems.indexOf(item);
            if (index != -1) {
//                $timeout(function () {
//                    // delete one and insert one
//                    $scope.info.currentDisplayItems.splice(index, 1,item);
//                })
            }
        }

        $scope.addProducteForCurrentCategory = function (cateId,item) {

            for (var idx = 0; idx < $scope.info.categoryls.length; idx++) {
                if(cateId == $scope.info.categoryls[idx].category_id){
                    //insert here
                    $timeout(function () {
                        $scope.info.categoryls[idx].itemls.push(item);
                    })
                    break;
                }
            }
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        MMShopService.onSwitchDefaultShopNotification($scope,function(){

            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
            initData();

        });

    })
