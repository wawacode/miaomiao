angular.module('miaomiao.console.controllers')

    .controller('FrontPageCtrl', function ($scope, $ionicLoading, $ionicActionSheet,$ionicPopup, $state, cfpLoadingBar, $timeout,localStorageService, $ionicScrollDelegate,httpClient) {

        $scope.info = {};

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
        $scope.info.shopName = $scope.info.shop.name || "首页";

        $scope.getSummaryInfo = function(success, fail){

            httpClient.getSummary($scope.info.shop.id, '', '', function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败:' + data.msg,
                        template: ''
                    });
                    return fail();
                }
                success(dataDetail);

            }, function (data, status) {

                fail();
            });
        }

        $timeout(function () {

            $scope.info.summary = {};
            $ionicScrollDelegate.resize();

            $scope.LoadingMessage = '正在加载,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            $scope.getSummaryInfo(function(dataDetail){

                $ionicLoading.hide();
                $scope.info.summary = dataDetail;

            },function(){
                $ionicLoading.hide();
            })

        });

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        $scope.doRefresh = function(){

            $scope.getSummaryInfo(function(dataDetail){

                $scope.$broadcast('scroll.refreshComplete');

                $scope.info.summary = dataDetail;

            },function(){

                $scope.$broadcast('scroll.refreshComplete');

            })
        }

        $scope.doShopInfoRefresh = function(){

            $timeout(function(){
                $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
                $scope.info.shopName = $scope.info.shop.name || "首页";
            })
        }

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
                        //TODO goto change pass page

                    }
                    return true;
                },
                destructiveButtonClicked: function () {

                    $scope.user = localStorageService.get('MMCONSOLE_METADATA_USER');

                    httpClient.logOut( $scope.user.phone ,function (data, status) {

                    }, function (data, status) {
                    });
                    $state.go('signin',null,{reload: true});
                    return true;
                }
            });
        }

    });