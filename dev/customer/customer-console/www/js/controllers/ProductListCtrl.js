angular.module('miaomiao.console.controllers')

    .controller('ProductListCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state,
                                             cfpLoadingBar, $timeout, $ionicScrollDelegate, localStorageService,
                                             httpClient,MMShopService, Camera,MMProductService) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        var hasData = false;
        // handler change category notification
        MMProductService.onSwitchCategoryNotification($scope,function(message){

            var data = message.data;
            $scope.selectedIndex = data.index;
            $scope.category = MMProductService.getCategoryForIndex($scope.selectedIndex);

            hasData = true;

            $timeout(function(){

                $scope.items = $scope.category.itemls;

                $ionicScrollDelegate.resize();
                $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();

            });

        });

        $scope.moreDataCanBeLoaded = function () {
            if(!hasData)return false;
            return $scope.category && $scope.category.canLoadMore;
        }


        $scope.addItems = function (idx) {

            var idx = $scope.selectedIndex,
                cateId = $scope.category.category_id ,
                from = $scope.category.scrollIndex,  //$scope.info.currentDisplayCategory.itemls.length,
                offset = 20;

            MMProductService.setInLoadingMoreFlag(true);

            httpClient.getMoreProductList($scope.info.shop.id, cateId, from, offset, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (!code == 0 || dataDetail.itemls.length == 0) {
                    // set flags
                    MMProductService.setInLoadingMoreFlag(false);
                    MMProductService.setCanLoadMoreFlagForIndex(idx,false);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }

                MMProductService.setInLoadingMoreFlag(false);

                MMProductService.addMoreItemsForCategoryId(cateId,dataDetail.itemls);

                $scope.category = MMProductService.getCategoryForIndex(idx);

                $timeout(function(){

                    $scope.items = $scope.category.itemls;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $ionicScrollDelegate.resize();
                });


            }, function (data, status) {

                MMProductService.setInLoadingMoreFlag(false);
                MMProductService.setCanLoadMoreFlagForIndex(idx,false);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        $scope.deleteItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;

            var index = currentCategory.itemls.indexOf(item);
            if (index > -1) {
                $timeout(function(){
                    currentCategory.itemls.splice(index, 1);
                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);
                });
            }
        }

        $scope.stickItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;

            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                $timeout(function () {
                    currentCategory.itemls.splice(index, 1);
                    currentCategory.itemls.unshift(item);
                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);
                });
            }
        }

        $scope.updateItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;

            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                // do more update
                $timeout(function () {

                    // update pic if success, which means item has new pic
                    if(item.new_pic_url && item.new_pic_url != item.pic_url){
                        item.pic_url = item.new_pic_url;
                    }

                    currentCategory.itemls.splice(index, 1,item);

                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);
                });
            }
        }

//        MMProductService.onAddProductToCategoryNotification($scope,function(message){
//
//            var item = message.item;
//            var cateId = message.cateId;
//            if($scope.category.category_id == cateId){
//                $scope.items.push(item);
//            }
//        })
    })
