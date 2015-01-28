angular.module('miaomiao.console.controllers')

    .controller('ProductCtrl', function($scope, $ionicPopup, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate,localStorageService,httpClient) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.info = {};
        $scope.info.pageName = '商品列表';

        $scope.info.shop = localStorageService.get('MMMETA_shop') || {};

        cfpLoadingBar.start();

        httpClient.getProductList($scope.info.shop.id || 1, function (data, status) {

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
            for (var idx = 0; idx < $scope.info.categoryls.length; idx++) {

                $scope.info.categoryls[idx].selected = 0;
                $scope.info.categoryls[idx].canLoadMore = 1;
                if (idx == 0) {
                    $scope.info.categoryls[idx].selected = 1;
                }
            }

            $scope.info.currentDisplayCategory = $scope.info.categoryls.length && $scope.info.categoryls[0];
            $scope.info.currentDisplayItems = $scope.info.currentDisplayCategory && $scope.info.currentDisplayCategory.itemls;

        }, function (data, status) {
            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            return;
        });


        var canLoadMore = true, inLoadingMore = false;

        $scope.selectCategory = function (category) {

            // if in loading more, can't select
            if(inLoadingMore)return;

            for (var idx = 0; idx < $scope.info.categoryls.length; idx++) {
                $scope.info.categoryls[idx].selected = 0;
            }
            category.selected = 1;

            $scope.info.currentDisplayCategory = category;
            $scope.info.currentDisplayItems = category.itemls;

            $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();

        }

        $scope.moreDataCanBeLoaded = function () {
            return $scope.info.currentDisplayCategory.canLoadMore;
        }

        $scope.addItems = function () {

            var cateId = $scope.info.currentDisplayCategory.category_id,
                from = $scope.info.currentDisplayItems.length,
                offset = 20;

            inLoadingMore = true;
            httpClient.getMoreProductList($scope.info.shop.id || 1, cateId, from, offset, function (data, status) {

                /*
                 * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
                 * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

                var code = data.code, dataDetail = data.data;
                if (!code == 0 || dataDetail.items.length == 0) {

                    $scope.info.currentDisplayCategory.canLoadMore = false;
                    inLoadingMore = false;
                    return;

                }

                $scope.info.currentDisplayItems = $scope.info.currentDisplayItems.concat(dataDetail.items);
                $scope.info.currentDisplayCategory.totalCnt = 0;

                inLoadingMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            }, function (data, status) {

                inLoadingMore = false;
                $scope.info.currentDisplayCategory.canLoadMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function(){
            $timeout(function(){
                $scope.posts = [];
                $ionicScrollDelegate.resize();
            },100);
        });


        var percentComplete = 1;
        if(percentComplete >= 1){
            $scope.$broadcast('scroll.refreshComplete');
            cfpLoadingBar.complete();
        }else{
            cfpLoadingBar.set(percentComplete);
        }

        $timeout(function(){
            if($scope.posts.length < 1){
                cfpLoadingBar.complete();
                $scope.timesUp = true;
            }
        },5000);
    })
