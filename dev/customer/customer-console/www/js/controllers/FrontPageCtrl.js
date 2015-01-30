angular.module('miaomiao.console.controllers')

    .controller('FrontPageCtrl', function ($scope, $ionicActionSheet,$ionicPopup, $state, cfpLoadingBar, $timeout,localStorageService, $ionicScrollDelegate,httpClient) {

        $scope.info = {};

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};
        $scope.info.shopName = $scope.info.shop.name || "首页";

        cfpLoadingBar.start();
        cfpLoadingBar.set(0.1);


        $scope.getSummaryInfo = function(success, fail){

            httpClient.getSummary($scope.info.shop.id, '', '', function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败:' + data.msg,
                        template: ''
                    });
                    return;
                }
                success(dataDetail);

            }, function (data, status) {

                fail();
            });
        }

        $timeout(function () {

            $scope.info.summary = {};
            $ionicScrollDelegate.resize();

            $scope.getSummaryInfo(function(dataDetail){

                $scope.$broadcast('scroll.refreshComplete');
                cfpLoadingBar.complete();

                $scope.info.summary = dataDetail;

            },function(){
                $scope.$broadcast('scroll.refreshComplete');
                cfpLoadingBar.complete();
            })

        });

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        $scope.doRefresh = function(){

            $scope.info.summary = {};

            $scope.getSummaryInfo(function(dataDetail){

                $scope.$broadcast('scroll.refreshComplete');

                $scope.info.summary = dataDetail;

            },function(){
                $scope.$broadcast('scroll.refreshComplete');
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
                    $state.go('signin',null,{reload: true});
                    return true;
                }
            });
        }

    });