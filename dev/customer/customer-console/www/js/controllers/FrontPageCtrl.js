angular.module('miaomiao.console.controllers')

    .controller('FrontPageCtrl', function ($scope, $ionicActionSheet, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate) {
        $scope.pageName = '首页';
        $scope.info = {};

        $scope.info.shopName = "首页";

        cfpLoadingBar.start();

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {
            $timeout(function () {
                $scope.posts = [];
                $ionicScrollDelegate.resize();
            }, 100);
        });

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

        var percentComplete = 1;
        if (percentComplete >= 1) {
            $scope.$broadcast('scroll.refreshComplete');
            cfpLoadingBar.complete();
        } else {
            cfpLoadingBar.set(percentComplete);
        }

        $timeout(function () {
            if ($scope.posts.length < 1) {
                cfpLoadingBar.complete();
                $scope.timesUp = true;
            }
        }, 5000);

    });