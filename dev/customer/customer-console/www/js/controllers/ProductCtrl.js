;angular.module('miaomiao.console.controllers')
    .controller('ProductCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state, $timeout,
                                         $ionicScrollDelegate, localStorageService, httpClient, MMShopService,
                                         Camera, MMProductService, MMUtils) {
        $scope.info = {};
        $scope.pageName = '商品';
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};

        function initData() {

            MMUtils.showLoadingIndicator('正在加载,请稍候...', $scope);

            httpClient.getProductList($scope.info.shop.id, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    MMUtils.showAlert('加载数据失败');
                    return;
                }

                // init data
                MMProductService.initCategorysWithData(dataDetail.categoryls);

                // prepare category names
                $scope.info.categorySummary = MMProductService.getCategorySummary();

                // set default category
                var initIndex = 0;
                $scope.selectedIndex = initIndex;

                $scope.selectCategory(initIndex);

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('加载数据失败');
            });
        }

        initData();

        // listeners
        $scope.info.refreshAll  = $scope.refreshAll = function () {
            initData();
        };

        $scope.selectCategory = function ($index, timeout) {

            // if in loading more, can't select
            if (MMProductService.getInLoadingMoreFlag() == true)return;

            $scope.selectedIndex = $index;

            // wait for category name class to change then send notification
            $timeout(function () {
                MMProductService.switchCategoryNotification({index: $scope.selectedIndex});
            }, timeout || 100);
        };

        $scope.refreshCurrentCategory = function () {
            $scope.selectCategory($scope.selectedIndex);
        };

        $scope.addProductForCategory = function (cateId, item) {

            $timeout(function () {

                MMProductService.addProductItemToCategory(cateId, item);

                for (var idx = 0; idx < $scope.info.categorySummary.length; idx++) {
                    if (cateId == $scope.info.categorySummary[idx].category_id) {
                        $scope.selectCategory(idx);
                        break;
                    }
                }

            })
        };

        // listeners for switch shop
        MMShopService.onSwitchDefaultShopNotification($scope, function () {
            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
            initData();
        });

    });
