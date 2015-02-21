angular.module('miaomiao.console.controllers')

    .controller('ProductCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state, $timeout,
                                         $ionicScrollDelegate, localStorageService, httpClient,MMShopService, Camera,MMProductService) {
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

                // init data
                MMProductService.initCategorysWithData(dataDetail.categoryls);

                // prepare category names
                $scope.info.categorySummary = MMProductService.getCategorySummary();

                // set default category
                var initIndex = 0;
                $scope.selectedIndex = initIndex;

                MMProductService.switchCategoryNotification({index:initIndex});

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

        // listeners
        $scope.refreshAll = function(){
            initData();
        }

        $scope.selectCategory = function ($index, timeout) {

            // if in loading more, can't select
            if (MMProductService.getInLoadingMoreFlag() == true)return;

            $scope.selectedIndex = $index;

            // wait for category name class to change then send notification
            $timeout(function(){
                MMProductService.switchCategoryNotification({index:$scope.selectedIndex});
            }, timeout || 100);
        }

        $scope.addProductForCategory = function (cateId,item) {
            MMProductService.addProductItemToCategory(cateId,item);
            $timeout(function(){
                for (var idx = 0; idx < $scope.info.categorySummary.length; idx++) {
                    if (cateId == $scope.info.categorySummary[idx].category_id) {
                        $scope.selectCategory(idx);
                        break;
                    }
                }
            })
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        // listeners for switch shop
        MMShopService.onSwitchDefaultShopNotification($scope,function(){
            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
            initData();
        });

    })
