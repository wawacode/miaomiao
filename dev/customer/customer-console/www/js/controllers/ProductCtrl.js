angular.module('miaomiao.console.controllers')

    .controller('ProductCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state, cfpLoadingBar, $timeout,
                                         $ionicScrollDelegate, localStorageService, httpClient,MMShopService, Camera,MMProductService) {
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

                MMProductService.initCategorysWithData(dataDetail.categoryls);
                $scope.info.category_names = MMProductService.getCategoryNames();

                var initIndex = 0;

                $scope.selectedIndex = initIndex;
                $scope.selectCategory(initIndex);

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
            if (MMProductService.getInLoadingMoreFlag())return;

            $scope.selectedIndex = $index;

            // wait for category name class to change
            $timeout(function(){
                MMProductService.switchCategoryNotification( {index:$scope.selectedIndex});

            },10);
        }

        $scope.$on('modal.hidden', function () {

        });

        $scope.addProducteForCurrentCategory = function (cateId,item) {

            MMProductService.addProducteForCurrentCategory(cateId.item);
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        MMShopService.onSwitchDefaultShopNotification($scope,function(){

            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
            initData();

        });

    })
