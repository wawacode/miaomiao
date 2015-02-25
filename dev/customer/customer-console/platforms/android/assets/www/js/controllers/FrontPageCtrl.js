;angular.module('miaomiao.console.controllers')
    .controller('FrontPageCtrl', function ($scope, $ionicLoading, $ionicActionSheet, $ionicPopup, $state, $timeout,
                                           localStorageService, $ionicScrollDelegate, httpClient, MMShopService, MMUtils) {

        $scope.info = {};
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
        $scope.shopName = $scope.info.shop.name || "首页";

        $scope.getSummaryInfo = function (success, fail) {

            httpClient.getSummary($scope.info.shop.id, '', '', function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('加载数据失败:' + data.msg);
                    return fail();
                }
                success(dataDetail);

            }, function (data, status) {

                fail();
            });
        };

        $timeout(function () {

            $scope.info.summary = {};
            $ionicScrollDelegate.resize();

            MMUtils.showLoadingIndicator('正在加载,请稍候...', $scope);

            $scope.getSummaryInfo(function (dataDetail) {

                $ionicLoading.hide();
                $scope.info.summary = dataDetail;

            }, function () {
                $ionicLoading.hide();
            })

        });

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        $scope.doRefresh = function () {

            $scope.shopName = $scope.info.shop.name || "首页";

            $scope.getSummaryInfo(function (dataDetail) {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

                $scope.info.summary = dataDetail;

            }, function () {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

            })
        };

        $scope.doShopInfoRefresh = function () {

            $timeout(function () {

                $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
                $scope.shopName = $scope.info.shop.name || "首页";

                MMShopService.switchDefaultShopNotification({});

            })
        };

        $scope.showUserAction = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '更改密码' }
                ],
                destructiveText: '退出登陆',
                cancelText: '取消',
                cancel: function () {

                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        $state.go('changepassword', null, {reload: true});
                    }
                    return true;
                },
                destructiveButtonClicked: function () {

                    $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER');

                    httpClient.logOut($scope.user.phone, function (data, status) {

                        // remove identity feild
                        localStorageService.set('MMCONSOLE_METADATA_USER', {'name': $scope.user.name, 'phone': $scope.user.phone});

                        $state.go('signin', null, {reload: true});
                    }, function (data, status) {
                        $state.go('signin', null, {reload: true});
                    });

                    return true;
                }
            });
        };

        MMShopService.onSwitchDefaultShopNotification($scope, function () {

            $timeout(function () {
                $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
                $scope.doRefresh();
            });
        });
    });