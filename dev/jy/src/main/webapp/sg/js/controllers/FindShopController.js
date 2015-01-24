angular.module('miaomiao.shop').
    controller('FindShopCtrl', function ($scope, $http, $state, $ionicLoading , localStorageService, httpClient, MMUtils, $timeout) {

        $scope.shop_data = {};
        $scope.shop_items = [];
        $scope.info = {};

        $scope.info.showShopList = false;
        $scope.info.showShopHistory = false;
        $scope.info.showAddressSuggestion = false;

        $scope.info.locationReady = localStorageService.get('MMMETA_location_pos_ready');
        if (!$scope.info.locationReady) {
            $scope.info.locationMessage = "定位失败,您可以从下面选择或搜索你所在的小区"
        } else {
            $scope.info.locationMessage = "定位成功，正在加载地址...";
        }

        $scope.shop_history = localStorageService.get('MMMETA_shop_history') || [];
        if ($scope.shop_history.length) {
            $scope.info.showShopHistory = true;
        }

        $scope.clearSearch = function () {
            $scope.shop_data.searchQuery = '';
            hideSearchSuggestions();
        };

        function showSearchSuggestions(){
            $scope.info.showAddressSuggestion = true;

            $scope.info.showShopList = false;
            $scope.info.showShopHistory = false;
        }

        function hideSearchSuggestions(){

            $scope.info.showAddressSuggestion = false;
            $scope.info.showShopList = true;

            if ($scope.shop_history.length) {
                $scope.info.showShopHistory = true;
            }
        }

        $scope.startSearch = function () {
            showSearchSuggestions();
        };

        $scope.goToShop = function (shop) {

            //TODO: check shop status
            if (shop.status != undefined && shop.status != 1) {
                return;
            }

            var shopExist = false;
            for (var i = 0; i < $scope.shop_history.length; i++) {
                if (shop.id == $scope.shop_history[i].id) {
                    shopExist = true;
                    break;
                }
            }
            if (!shopExist) {
                $scope.shop_history.push(shop);
            }

            localStorageService.set('MMMETA_shop_history', $scope.shop_history);
            localStorageService.set('MMMETA_shop', shop);

            if ($scope.modal) {
                $scope.modal.hide();
            } else {
                $state.go('productList');
            }
        };

        $scope.performSearch = function (key, $event) {

            $event.target.blur();

            var KEY = key || $scope.shop_data.searchQuery;

            $scope.LoadingMessage = '正在搜索' + KEY + '附近的店...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(KEY, function(point){
                if (point) {

                    httpClient.getNearShopList(point.lat, point.lng, function (data, status) {

                        $ionicLoading.hide();
                        var code = data.code, dataDetail = data.data;

                        if (code == 0 || !MMUtils.isEmptyObject(dataDetail)) {
                            $scope.shop_items = dataDetail.shops;
                            for (var i = 0; i < $scope.shop_items.length; i++) {
                                $scope.shop_items[i].rate = 5;
                                $scope.shop_items[i].maxRate = 5;
                            }
                        }

                        hideSearchSuggestions();

                    }, function (data, status) {

                        $ionicLoading.hide();

                        hideSearchSuggestions();
                    });

                }else{

                    $ionicLoading.hide();
                    hideSearchSuggestions();

                }
            }, "北京市");
        };

        $timeout(function () {

            $scope.info.locationReady = localStorageService.get('MMMETA_location_pos_ready');
            if ($scope.info.locationReady) {

                $scope.info.locationData = localStorageService.get('MMMETA_location_pos_data');

                var myGeo = new BMap.Geocoder();
                // 根据坐标得到地址描述
                myGeo.getLocation(new BMap.Point($scope.info.locationData.lat, $scope.info.locationData.lng), function (result) {
                    if (result) {
                        alert(result.address);
                        $scope.info.locationMessage = result.address;
                    }
                });

                httpClient.getNearShopList($scope.info.locationData.lat, $scope.info.locationData.lng, function (data, status) {

                    var code = data.code, dataDetail = data.data;

                    if (code == 0 || !MMUtils.isEmptyObject(dataDetail)) {
                        $scope.shop_items = dataDetail.shops;
                        for (var i = 0; i < $scope.shop_items.length; i++) {
                            $scope.shop_items[i].rate = 5;
                            $scope.shop_items[i].maxRate = 5;
                        }
                    }

                }, function (data, status) {

                });
            }
        });

        $scope.$on("$ionicView.enter", function () {

            $scope.info.showShopList = false;
            $scope.info.showShopHistory = false;
            $scope.info.showAddressSuggestion = false;

            if ($scope.shop_history.length) {
                $scope.info.showShopHistory = true;
            }

            if($scope.shop_items.length){
                $scope.info.showShopList = true;
            }
        });

    });