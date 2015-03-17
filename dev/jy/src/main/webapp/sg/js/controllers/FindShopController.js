;angular.module('miaomiao.shop').
    controller('FindShopCtrl', function ($scope, $http, $state,$location, $ionicLoading,$ionicScrollDelegate, localStorageService, httpClient,ShopService, MMUtils, $timeout) {

        $scope.shop_data = {};
        $scope.shop_items = [];
        $scope.shop_info = {};

        $scope.shop_info.locationReady = localStorageService.get('MMMETA_location_pos_ready');
        if (!$scope.shop_info.locationReady) {
            $scope.shop_info.locationMessage = "定位失败,您可以搜索所在的小区"
        } else {
            $scope.shop_info.locationMessage = "定位成功，正在加载地址...";
        }

        $scope.shop_history = localStorageService.get('MMMETA_shop_history') || [];

        $scope.clearSearch = function () {
            $scope.shop_data.searchQuery = '';
            hideSearchSuggestions();
        };

        function showSearchSuggestions() {
            $scope.shop_info.showAddressSuggestion = true;
        }

        function hideSearchSuggestions() {
            $scope.shop_info.showAddressSuggestion = false;
        }

        $scope.startSearch = function () {
            showSearchSuggestions();
        };

        $scope.goToShop = function (shop) {

            //TODO: check shop status
            if (shop.status != undefined && shop.status != 0) {
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
            ShopService.setDefaultShopAndSync(shop);

            if ($scope.modal) {
                $scope.modal.hide();
            } else {
                $state.go('productList',null,{reload: true});
            }
        };

        $scope.clickAddressSuggestions = function($event){

            $event.stopPropagation();

            resetFindShopView();

        };

        $scope.clickCommunity = function(community,$event){

            $event.stopPropagation();

            if(!community.shops || community.shops.length == 0){

                community.showShopNotReadyMessage = true;
                $timeout(function(){
                    community.showShopNotReadyMessage = false;
                },1000);

                return;

            }

            if(community.shops && community.shops.length == 1){
                $scope.goToShop(community.shops[0]);
                return;
            }

            if(community.shops && community.shops.length > 1){
                community.showShopsInCommunity = !community.showShopsInCommunity;
                return;
            }
        };

        $scope.toggleShopsInCommunity = function($event,item){
            $event.stopPropagation();
        };

        // for shop star
        $scope.readonly = true;

        $scope.getSuggestions = function (key, $event) {

            // get suggestion from server
            httpClient.getCommunitySuggestions(key,function(data, status){

                var code = data.code, dataDetail = data.data;

                if (code == 0 &&
                    !MMUtils.isEmptyObject(dataDetail) &&
                    dataDetail.communitys &&
                    dataDetail.communitys.length) {

                    $timeout(function () {
                        $scope.shop_info.address_suggestions = dataDetail.communitys;
                    });

                }else{
                    $scope.shop_info.address_suggestions = [];
                }
            },function(data, status){
            })

        };

        $scope.performSearch = function (key, $event) {

            if ($event)$event.target.blur();

            var KEY = key || $scope.shop_data.searchQuery;

            $timeout(function () {
                $scope.shop_info.locationMessage = KEY;
            });

            MMUtils.showLoadingIndicator('正在搜索' + KEY + '...',$scope);

            // search by keywords
            httpClient.getCommunityByName(key, function (data, status) {

                $ionicLoading.hide();

//                var code = data.code, dataDetail = data.data;
//
//                if (code == 0 && !MMUtils.isEmptyObject(dataDetail)) {
//                    $scope.community_items = dataDetail.communitys;
//                }else{
//                    $scope.community_items = [];
//                }

                $scope.community_items = [
                    {id: 100, name:'一个测试的小区',city:'北京市',district:'海淀区',address:'上地街道可是大厦B座',distinct:100,
                        shops:[
                            {id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5},
                            {id:2,name:'测试昂铺222','shop_address':'上地街道嘉华大厦',rate:5,maxRate:5}
                        ]
                    },
                    {id: 101, name:'上地街道可是大厦010101',city:'北京市',district:'海淀区',address:'上地街道可是大厦B座',distinct:500,
                        shops:[
                            {id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5}
                        ]},
                    {id: 102, name:'清河破地方小区',city:'北京市',district:'海淀区',address:'上地街道可是大厦B座'},
                    {id: 103, name:'中关村高档小区',city:'北京市',district:'海淀区',address:'上地街道可是大厦010101'},
                    {id: 104, name:'望京西小区',city:'北京市',district:'海淀区',address:'上地街道可是大厦010101'}
                ];

                $scope.shop_info.commmunityListTitle = "为您找到的小区";

                hideSearchSuggestions();

            }, function (data, status) {

                $ionicLoading.hide();
                $scope.community_items = [];
                $scope.shop_info.commmunityListTitle = "为您找到的小区";

                hideSearchSuggestions();
            });
        };


        // $scope.shop_info.locationMessage = localStorageService.get('MMMETA_location_pos_addr') || "切换地址";

        $scope.relocation = function () {

            function showPosition(position) {

                $ionicLoading.hide();

                if (position) {

                    $timeout(function () {
                        $scope.shop_info.locationReady = true;
                        $scope.shop_info.locationMessage = "定位成功,正在获取地址...";
                    });

                    localStorageService.set('MMMETA_location_pos_ready', 1);
                    localStorageService.set('MMMETA_location_pos_data',
                        {'lat': position.coords.latitude, 'lng': position.coords.longitude});

                    updateUIWhenPositionDataReady();

                } else {
                    $timeout(function () {
                        $scope.shop_info.locationReady = false;
                        $scope.shop_info.locationMessage = "定位失败！";
                    });
                }
            }

            function showError() {
                $ionicLoading.hide();
                $timeout(function () {
                    $scope.shop_info.locationMessage = "定位失败！";
                });
            }

            if (navigator.geolocation) {
                var position_option = {
                    enableHighAccuracy: true,
                    timeout: 10000
                };

                MMUtils.showLoadingIndicator('正在重新定位',$scope);

                navigator.geolocation.getCurrentPosition(showPosition, showError, position_option);
            } else {
                $scope.shop_info.locationMessage = "浏览器不支持定位";
            }
        };

        function updateRealGEOAddressByGEOData(lng, lat) {

            var gpsPoint = new BMap.Point(lng, lat);

            BMap.Convertor.translate(gpsPoint, 0, function(point){ //百度官方发布的接口
                var myGeo = new BMap.Geocoder();
                // 根据坐标得到地址描述
                myGeo.getLocation(point, function (result) {
                    if (result) {
                        localStorageService.set('MMMETA_location_pos_addr', result.address);
                        $timeout(function () {
                            $scope.shop_info.locationMessage = result.address;
                        });
                    }
                });
            });
        }

        function updateUIWhenPositionDataReady() {

            $scope.shop_info.locationReady = localStorageService.get('MMMETA_location_pos_ready');

            if ($scope.shop_info.locationReady) {

                $scope.shop_info.locationData = localStorageService.get('MMMETA_location_pos_data');

                updateRealGEOAddressByGEOData($scope.shop_info.locationData.lng, $scope.shop_info.locationData.lat);

                httpClient.getNearCommunityList($scope.shop_info.locationData.lat, $scope.shop_info.locationData.lng, function (data, status) {

                    var code = data.code, dataDetail = data.data;

                    if (code == 0 || !MMUtils.isEmptyObject(dataDetail)) {

                        $timeout(function () {
                            $scope.community_items = dataDetail.communitys;
                            $scope.shop_info.commmunityListTitle = "附近的小区";
                        });
                    }else{
                        $scope.community_items = [];
                    }

                }, function (data, status) {
                    // still show it and with no item hint
                    $timeout(function () {
                        $scope.community_items = [];
                        $scope.shop_info.commmunityListTitle = "附近的小区";
                    });
                });
            }
        }

        $timeout(function () {
            updateUIWhenPositionDataReady();
        });

        function resetFindShopView(){
            $scope.shop_info.showAddressSuggestion = false;
            $scope.shop_info.commmunityListTitle = "附近的小区";
        }

        $scope.$on("$ionicView.enter", function () {

            $scope.shop_info.commmunityListTitle = "附近的小区";

        });
    });