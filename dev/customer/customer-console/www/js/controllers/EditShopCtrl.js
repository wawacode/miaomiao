angular.module('miaomiao.console.controllers')
    .controller('EditShopCtrl', ['$scope', '$state', '$filter', '$ionicPopup', '$ionicModal', 'localStorageService',
        '$ionicLoading', 'httpClient', '$ionicScrollDelegate', '$timeout', 'MMShopService', 'MMUtils',

        function ($scope, $state, $filter, $ionicPopup, $ionicModal, localStorageService, $ionicLoading, httpClient, $ionicScrollDelegate, $timeout, MMShopService, MMUtils) {

            $scope.editingShop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP');

            function _reformatHourMinutes(number) {
                return (parseInt(number) < 10 ? '0' : '') + number;
            }

            // prepare data
            function initData() {

                $scope.editingShop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP');

                $scope.allHours = [];
                for (var i = 1; i <= 24; i++) {
                    $scope.allHours.push(i);
                }
                $scope.allMinutes = [];
                for (var i = 0; i < 60; i++) {
                    $scope.allMinutes.push(_reformatHourMinutes(i));
                }

                $scope.editingShop.new_base_price = $scope.editingShop.base_price / 100.0;

                if (!$scope.editingShop.open_time && !$scope.editingShop.close_time) {
                    $scope.editingShop.isFullTimeOpen = true;
                    $scope.editingShop.new_open_time = {'hours': 8, 'minutes': _reformatHourMinutes(0)}; // place holder value
                    $scope.editingShop.new_close_time = {'hours': 22, 'minutes': _reformatHourMinutes(0)};
                } else {
                    // for default display value
                    var date = new Date($scope.editingShop.open_time);
                    $scope.editingShop.new_open_time = {'hours': date.getHours(), 'minutes': _reformatHourMinutes(date.getMinutes())};

                    date = new Date($scope.editingShop.close_time);
                    $scope.editingShop.new_close_time = {'hours': date.getHours(), 'minutes': _reformatHourMinutes(date.getMinutes())};
                }
            }

            $scope.cancelEditShop = function (item) {
                $state.go('tab.front-page', null, {reload: false});
            };

            $scope.saveShop = function (item) {

                var options = {
                    shop_id: $scope.editingShop.id,
                    name: $scope.editingShop.name,
                    tel: $scope.editingShop.tel,
                    shop_address: $scope.editingShop.shop_address,
                    owner_phone: $scope.editingShop.owner_phone,
                    base_price: $scope.editingShop.new_base_price * 100,
                    shopInfo: $scope.editingShop.shop_info,
                    status: $scope.editingShop.status
                }

                if (item.isFullTimeOpen) {
                    options.open_time = null;
                    options.close_time = null;
                } else {
                    if (item.new_open_time) {
                        options.open_time = item.new_open_time.hours + ':' + item.new_open_time.minutes;
                    }
                    if (item.new_close_time) {
                        options.close_time = item.new_close_time.hours + ':' + item.new_close_time.minutes;
                    }
                }

                MMUtils.showLoadingIndicator('正在保存,请稍候...', $scope);

                httpClient.updateShopInfo(options, function (data, status) {
                    $ionicLoading.hide();
                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        MMUtils.showAlert('修改店铺失败:' + data.msg);
                        return;
                    }

                    //success, just
                    $timeout(function () {

                        $ionicScrollDelegate.resize();
                        $ionicScrollDelegate.scrollTop();

                        // update shop list
                        localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP', dataDetail.shop);

                        var shopList = localStorageService.get('MMCONSOLE_METADATA_SHOP_LIST') || [];
                        for (var i = 0; i < shopList.length; i++) {
                            if (shopList[i].id == dataDetail.shop.id) {
                                shopList[i] = dataDetail.shop;  // force update shop info
                            }
                        }
                        localStorageService.set('MMCONSOLE_METADATA_SHOP_LIST', shopList);

                        $state.go('tab.front-page', null, {reload: true});

                        MMShopService.switchDefaultShopNotification({});

                    });
                }, function (data, status) {
                    $ionicLoading.hide();
                    MMUtils.showAlert('修改店铺失败');
                });
            };

            $scope.hasTimePickerPlugin = function () {
                return typeof(datePicker) == 'undefined' ? false : true;
            };

            $scope.showTimePicker = function (item, action) {

                if (action == 'open') {
                    var options = {
                        date: item.open_time ? new Date(item.open_time) : new Date(),
                        mode: 'time'
                    };

                    datePicker.show(options, function (date) {
                        if (!date)return;
                        var res = new Date(date);
                        $timeout(function () {
                            item.new_open_time = {'hours': res.getHours(), 'minutes': _reformatHourMinutes(res.getMinutes())};
                            console.log('get new open time:' + item.new_open_time.hours + ':' + item.new_open_time.minutes);
                        });
                    });
                } else if (action == 'close') {
                    var options = {
                        date: item.close_time ? new Date(item.close_time) : new Date(),
                        mode: 'time'
                    };

                    datePicker.show(options, function (date) {
                        if (!date)return;
                        var res = new Date(date);
                        $timeout(function () {
                            item.new_close_time = {'hours': res.getHours(), 'minutes': _reformatHourMinutes(res.getMinutes())};
                            console.log('get new close time:' + item.new_close_time.hours + ':' + item.new_close_time.minutes);
                        });
                    });
                }
            };

            $scope.updateShopFullTimeOpen = function () {
                $timeout(function () {
                    $ionicScrollDelegate.resize();
                });
            };

            // just kicking the tires
            $scope.$on('$ionicView.afterEnter', function () {
                $timeout(function () {
                    initData();
                })
            });
        }
    ]);