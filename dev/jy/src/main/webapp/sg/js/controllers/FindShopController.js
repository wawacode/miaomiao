angular.module('miaomiao.shop').
    controller('FindShopCtrl', function ($scope, $http, $state, $ionicLoading , localStorageService, httpClient, MMUtils, $timeout) {

        $scope.shop_data = {};
        $scope.shop_items = [];
        $scope.shop_info = {};

        $scope.shop_info.showShopList = false;
        $scope.shop_info.showShopHistory = false;
        $scope.shop_info.showAddressSuggestion = false;

        $scope.shop_info.locationReady = localStorageService.get('MMMETA_location_pos_ready');
        if (!$scope.shop_info.locationReady) {
            $scope.shop_info.locationMessage = "定位失败,您可以搜索你所在的小区"
        } else {
            $scope.shop_info.locationMessage = "定位成功，正在加载地址...";
        }

        $scope.shop_history = localStorageService.get('MMMETA_shop_history') || [];
        if ($scope.shop_history.length) {
            $scope.shop_info.showShopHistory = true;
        }

        $scope.clearSearch = function () {
            $scope.shop_data.searchQuery = '';
            hideSearchSuggestions();
        };

        function showSearchSuggestions(){
            $scope.shop_info.showAddressSuggestion = true;

            $scope.shop_info.showShopList = false;
            $scope.shop_info.showShopHistory = false;
        }

        function hideSearchSuggestions(){

            $scope.shop_info.showAddressSuggestion = false;
            $scope.shop_info.showShopList = true;

            if ($scope.shop_history.length) {
                $scope.shop_info.showShopHistory = true;
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

        // for shop star
        $scope.readonly = true;

        $scope.getSuggestions = function(key, $event){

            $scope.shop_info.isGettingSuggestions = true;

            var options = {
                onSearchComplete: function(results){
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        // 判断状态是否正确
                        var address_suggestions = [];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            address_suggestions.push({'title': results.getPoi(i).title ,'address':results.getPoi(i).address});
                        }
                        $timeout(function(){
                            $scope.shop_info.address_suggestions = address_suggestions;
                        });
                    }
                    $scope.shop_info.isGettingSuggestions = false;
                }
            };

            var local = new BMap.LocalSearch("北京市", options);
            local.search(key);


        };

        $scope.goToSearchAddress = function(item){
            $scope.performSearch(item.title);
        }

        $scope.performSearch = function (key, $event) {

            if($event)$event.target.blur();

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

        $scope.shop_info.locationMessage = localStorageService.get('MMMETA_location_pos_addr') || "切换地址";

        $scope.relocation = function(){

            function showPosition(position) {

                $ionicLoading.hide();

                if (position) {

                    $scope.shop_info.locationMessage = "定位成功";

                    localStorageService.set('MMMETA_location_pos_ready',1);
                    localStorageService.set('MMMETA_location_pos_data',
                        {'lat':position.coords.latitude,'lng':position.coords.longitude});

                    updateUIWhenPositionDataReady();

                } else {
                    $scope.shop_info.locationMessage = "定位失败！";
                }
            }

            function showError(){
                $ionicLoading.hide();
                $timeout(function(){
                    $scope.shop_info.locationMessage = "定位失败！";
                })
            }

            if (navigator.geolocation) {
                var position_option = {
                    timeout: 10000
                };

                $scope.LoadingMessage = '正在重新定位...';
                $ionicLoading.show({
                    templateUrl: '/views/sg/templates/loadingIndicator.html',
                    scope: $scope
                });

                navigator.geolocation.getCurrentPosition(showPosition, showError, position_option);
            }else{
                $scope.shop_info.locationMessage = "浏览器不支持定位";
            }
        }

        function updateRealGEOAddressByGEOData(lat,lng){

            var myGeo = new BMap.Geocoder();
            // 根据坐标得到地址描述
            myGeo.getLocation(new BMap.Point(lat,lng), function (result) {
                if (result) {
                    $scope.shop_info.locationMessage = result.address;
                    localStorageService.set('MMMETA_location_pos_addr',result.address);
                }
            });
        }

        function updateUIWhenPositionDataReady(){

            $scope.shop_info.locationReady = localStorageService.get('MMMETA_location_pos_ready');

            if ($scope.shop_info.locationReady) {

                $scope.shop_info.locationData = localStorageService.get('MMMETA_location_pos_data');

                updateRealGEOAddressByGEOData($scope.shop_info.locationData.lat, $scope.shop_info.locationData.lng);

                httpClient.getNearShopList($scope.shop_info.locationData.lat, $scope.shop_info.locationData.lng, function (data, status) {

                    var code = data.code, dataDetail = data.data;

                    if (code == 0 || !MMUtils.isEmptyObject(dataDetail)) {
                        $scope.shop_items = dataDetail.shops;
                        for (var i = 0; i < $scope.shop_items.length; i++) {
                            $scope.shop_items[i].rate = 5;
                            $scope.shop_items[i].maxRate = 5;
                        }

                        $scope.shop_info.showAddressSuggestion = false;
                        $scope.shop_info.showShopList = true;
                    }

                }, function (data, status) {
                    // still show it and with no item hint
                    $scope.shop_info.showAddressSuggestion = false;
                    $scope.shop_info.showShopList = true;
                });
            }
        }

        $timeout(function () {

            updateUIWhenPositionDataReady();

        });

        $scope.$on("$ionicView.enter", function () {

            $scope.shop_info.showShopList = false;
            $scope.shop_info.showShopHistory = false;
            $scope.shop_info.showAddressSuggestion = false;

            if ($scope.shop_history.length) {
                $scope.shop_info.showShopHistory = true;
            }

            if($scope.shop_items.length){
                $scope.shop_info.showShopList = true;
            }
        });

    });