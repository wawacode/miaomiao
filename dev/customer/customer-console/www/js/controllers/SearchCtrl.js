angular.module('miaomiao.console.controllers')
    .controller('SearchCtrl', function ($scope, $ionicLoading, $state, $timeout, httpClient, localStorageService,
                                        MMUtils, MMProductService) {

        $scope.pageName = '搜索商品';
        $scope.focused = 'centered';
        $scope.searchTerm = '';

        $scope.info = {};
        $scope.info.hasNoResults = false;
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};

        $scope.performSearch = function (key, $event) {

            $event.target.blur();

            var KEY = key || $scope.info.key;

            MMUtils.showLoadingIndicator('正在搜索...', $scope);

            httpClient.getSearchResults($scope.info.shop.id, KEY, function (data, status) {

                /*
                 * {"code":0,"data":[{"category_id":15,"count":956,"id":28062,"name":"哈哈镜鸭爪买一赠一","pic_url":
                 * "http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 * "score":99999,"shop_id":1},{"category_id":15,"count":921,"id":28063,"name":"哈哈镜鸭翅买一赠*/

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (!code == 0 || dataDetail.itemls.length == 0) {
                    $scope.info.searchResultsItems = [];
                    $scope.info.hasNoResults = true;
                    return;
                }

                $scope.info.hasNoResults = false;
                $scope.info.searchResultsItems = dataDetail.itemls;

                MMProductService.renderDataNotification($scope.info.searchResultsItems);

            }, function (data, status) {
                $ionicLoading.hide();
                $scope.info.hasNoResults = true;
            });
        };

        $scope.clearSearch = function () {
            $scope.info.key = '';
        }
    });