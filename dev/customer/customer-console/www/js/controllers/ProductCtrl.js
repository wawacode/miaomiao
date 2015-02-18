angular.module('miaomiao.console.controllers')

    .controller('ProductCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate, localStorageService, httpClient,MMShopService, Camera) {
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

                var retCategoryls = dataDetail.categoryls;

                // extend for use
                /*
                 {"category_id":15,"category_sub_id":0,"id":0,
                 "itemls":[{"category_id":15,"category_sub_id":0,"count":956,"create_time":1419821656000,"ext":0,"id":28062,"name":"哈哈镜鸭爪买一赠一",
                 "pic_url":"http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 "score":99999,"serialNo":"HHJ001","shop_id":1,"status":0}
                 * */
                if (!retCategoryls || !retCategoryls.length)return;
                var retCategorylNames = [];
                for (var idx = 0; idx < retCategoryls.length; idx++) {

                    var curCategory = retCategoryls[idx];
                    retCategorylNames.push(curCategory.name);

                    curCategory.selected = 0;
                    curCategory.scrollIndex = curCategory.itemls.length;
                    curCategory.canLoadMore = 1;

                    if (idx == 0) {
                        $scope.selectedIndex = 0;
                        $scope.info.selectedCategory = curCategory;
                        curCategory.selected = 1;
                    }
                }

                $timeout(function(){
                    $scope.info.category_names = retCategorylNames;
                    $scope.info.categoryls = retCategoryls;
                })

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

        $scope.getItemHeight = function(){
            return 100;
        }

        $scope.refreshAll = function(){
            initData();
        }

        $scope.selectCategory = function ($index) {

            // if in loading more, can't select
            if (inLoadingMore)return;

            $scope.selectedIndex = $index;

            $timeout(function(){

                $scope.info.selectedCategory = $scope.info.categoryls[$scope.selectedIndex];
                $ionicScrollDelegate.resize();
                $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();

            },100);
        }

        $scope.moreDataCanBeLoaded = function () {
            return $scope.info.categoryls &&
                $scope.info.categoryls[$scope.selectedIndex] &&
                $scope.info.categoryls[$scope.selectedIndex].canLoadMore;
        }

        var inLoadingMore = false;

        $scope.addItems = function (idx) {

            var idx = $scope.selectedIndex,
                currentCategory = $scope.info.categoryls[idx],
                cateId = currentCategory.category_id,
                from = currentCategory.scrollIndex,  //$scope.info.currentDisplayCategory.itemls.length,
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
                    currentCategory.canLoadMore = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;

                }

                inLoadingMore = false;

                $timeout(function(){

                    currentCategory.itemls = currentCategory.itemls.concat(dataDetail.itemls);
                    currentCategory.scrollIndex += dataDetail.itemls.length;
                    currentCategory.totalCnt = 0;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });


            }, function (data, status) {
                inLoadingMore = false;
                currentCategory.canLoadMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        $scope.$on('modal.hidden', function () {

        });

        $scope.deleteItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.info.selectedCategory;

            var index = currentCategory.itemls.indexOf(item);
            if (index > -1) {
                $timeout(function(){
                    currentCategory.itemls.splice(index, 1);
                });
            }
        }

        $scope.stickItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.info.selectedCategory;
            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                $timeout(function () {
                    currentCategory.itemls.splice(index, 1);
                    currentCategory.itemls.unshift(item);
                });
            }
        }

        $scope.updateItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.info.selectedCategory;
            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                // do more update
                $timeout(function () {
                    currentCategory.itemls.splice(index, 1,item);
                });
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
