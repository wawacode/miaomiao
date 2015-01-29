angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function ($scope, $ionicPopup, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate, httpClient) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.pageName = '订单';
        $scope.info = {};
        $scope.info.orders = [];
        $scope.info.shopid = 1;

        cfpLoadingBar.start();
        cfpLoadingBar.set(0.1);

        function transformOrderData(orders){
            if(!orders) return;
            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                try{
                    order.items = JSON.parse(order.info);
                }catch (e){

                }
            }
        }

        var from = 0, offset = 20;
        var canLoadMore = true;
        httpClient.getMyOrders($scope.info.shopid, from, offset, function (data, status) {

            $scope.$broadcast('scroll.refreshComplete');
            cfpLoadingBar.complete();

            var code = data.code, dataDetail = data.data;
            if (!code == 0) {
                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                canLoadMore = false;
                return;
            }
            $scope.info.orders = dataDetail.orders;
            transformOrderData($scope.info.orders);

        }, function (data, status) {

            $scope.$broadcast('scroll.refreshComplete');
            cfpLoadingBar.complete();

            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            canLoadMore = false;
            return;
        });

        $scope.moreOrderCanBeLoaded = function () {
            return canLoadMore;
        }

        $scope.addOrders = function () {

            $scope.info.orders = $scope.info.orders || [];
            var from = $scope.info.orders.length, offset = 20;

            httpClient.getMoreMyOrders($scope.info.shopid, from, offset, function (data, status) {
                var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败',
                        template: ''
                    });
                    canLoadMore = false;
                    return;
                }

                $scope.info.orders = $scope.info.orders.concat(dataDetail.orders);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            }, function (data, status) {

                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                canLoadMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            });
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {
            $timeout(function () {
                $scope.posts = [];
                $ionicScrollDelegate.resize();
            }, 100);
        });

        $timeout(function () {
            if ($scope.posts.length < 1) {
                cfpLoadingBar.complete();
                $scope.timesUp = true;
            }
        }, 5000);
    })

